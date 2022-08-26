// sample config.json
/*
{
  "homeeUserName": "mqtt",
  "homeePassword": "mqtt",
  "homeeServer": "homee.fritz.box",
  "mqttServer": "mqtt.fritz.box",
  "mqttUserName": "mqtt",
  "mqttPassword": "mqtt",
  "publish": true,
  "publishHuman": true,
  "publishInt": false,
  "publishBool": true,
  "subscribe": true,
  "subscribeHuman": true,
  "identifier": "devices/status/",
  "identifierHuman": "human/",
  "identifierInt": "devices/int/",
  "identifierBool": "devices/bool/",
  "filterEchoedMQTTMessages": false,
  "homeeStatusRepeat": true,
  "statusTimer": 180,
}
*/

const fs = require('fs')
// Start Winston Logger
const winston = require('winston');
const env = process.env.NODE_ENV || 'info';
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: env === 'development' ? 'debug' : 'info'
        }),
        new (winston.transports.File)({
            filename: `${logDir}/app.log`,
            timestamp: tsFormat,
            json: false,
            level: env === 'development' ? 'debug' : 'info'
        })
    ]
});

// config
let config
let path

config = {}

paths = [
    __dirname + '/config.json',
    '/etc/homeeToMqtt' + '/config.json',
    process.cwd() + '/config.json'
]

for (i = 0; i < paths.length; i++) {
    path = paths[i]
    if (fs.existsSync(path)) {
        loaded = require('config.json')(path)
        config = {...config, ...loaded}
    }
}

if (config.homeeUserName == null) config.homeeUserName = 'mqtt'
if (config.homeePassword == null) config.homeePassword = 'mqtt'
if (config.homeeServer == null) config.homeeServer = 'homee'
if (config.mqttServer == null) config.mqttServer = 'mqtt'
if (config.mqttUserName == null) config.mqttUserName = 'mqtt'
if (config.mqttPassword == null) config.mqttPassword = 'mqtt'
if (config.publish == null) config.publish = true
if (config.publishHuman == null) config.publishHuman = true
if (config.publishInt == null) config.publishInt = false
if (config.publishBool == null) config.publishBool = true
if (config.subscribe == null) config.subscribe = true
if (config.subscribeHuman == null) config.subscribeHuman = true
if (config.filterEchoedMQTTMessages == null) config.filterEchoedMQTTMessages = false
if (config.homeeStatusRepeat == null) config.homeeStatusRepeat = true
if (config.statusTimer == null) config.statusTimer = 180
if (config.identifier == null) config.identifier = 'devices/status/'
if (config.identifierHuman == null) config.identifierHuman = 'human/'
if (config.identifierInt == null) config.identifierInt = 'devices/int/'
if (config.identifierBool == null) config.identifierBool = 'devices/bool/'

logger.info('Using config ' + path)
logger.info(JSON.stringify(config, null, 4))

//libs
const fetch = require('node-fetch')
const WebSocket = require('ws')
const querystring = require('querystring')
const homee = require('./lib/homee.js')
const sha512 = require('js-sha512')
const mqtt = require('mqtt')

//const
//const token_expires = 0
const homeeUser = querystring.escape(config.homeeUserName)
const homeePassword = sha512(config.homeePassword)

//vars
let mqttAvailable = false
let mqttConnection = null
let homeeAvailable = false
let homeeSocket = null
let terminating = false

//node nodes
let nodes = []

//emulate btoa
global.Buffer = global.Buffer || require('buffer').Buffer
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64')
    }
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString()
    }
}

///////////////////////////////////////////////////////////////////////////////
//Homee to MQTT Stuff
///////////////////////////////////////////////////////////////////////////////
function generateAttributeInfo(nodeId, attribute) {
    let changed = true
    if (nodes[nodeId] != null) {
        let type = homee.getHAPTypeByAttributeType(attribute.type)
        let typeString = homee.getAttributeString(attribute.type)
        let id = attribute.id
        let unit = querystring.unescape(attribute.unit)
        let data = ''

        if (type === '') {
            type = typeString
        }

        if (unit === 'text') {
            data = decodeURIComponent(attribute.data)
        } else {
            if (typeof attribute.current_value === 'number' && (unit === '°C' || unit === 'W')) {
                data = attribute.current_value.toFixed(2)
            } else {
                data = attribute.current_value
            }
        }
        if (unit == 'n/a' || unit == 'text' || unit == 'unixtimestamp') {
            unit = ''
        }

        if (nodes[nodeId].attributes[id] == null) {
            nodes[nodeId].attributes[id] = {}
        }

        nodes[nodeId].attributes[id].type = type
        nodes[nodeId].attributes[id].typeString = typeString
        nodes[nodeId].attributes[id].unit = unit
        if (nodes[nodeId].attributes[id].data === data) {
            changed = false
        }
        nodes[nodeId].attributes[id].data = data

        if (changed) {
            logger.debug('(' + nodeId + ') ' + '"' + nodes[nodeId].name + '", ', '(' + id + '/' + typeString + '=' + attribute.type + ') ' + type + ', ', data + unit)
            //console.log(JSON.stringify(attribute, null, 4))
            if (mqttAvailable) {
                let mqttJson = Object.assign(attribute)
                mqttJson.typeString = typeString
                mqttJson.cubeType = nodes[nodeId].cubeType
                mqttJson.name = nodes[nodeId].name
                mqttJson.note = nodes[nodeId].note
                mqttJson.unit = unit
                mqttJson.data = data
                mqttJson.boolData = data.toString().toLowerCase()
                if (mqttJson.boolData === '0' || mqttJson.boolData === 'false' || mqttJson.boolData === 'off') {
                    mqttJson.boolData = 'False'
                } else {
                    mqttJson.boolData = 'True'
                }
                if (config.publish) {
                    let publishString = 'homee/' + config.identifier + nodeId.toString() + '/attributes/' + id.toString()
                    logger.debug(publishString, JSON.stringify(mqttJson, null, 4))
                    logger.info("publish:", publishString, "JSON")
                    mqttConnection.publish(publishString, JSON.stringify(mqttJson))
                }
                if (config.publishHuman) {
                    let publishString = 'homee/' + config.identifierHuman + nodes[nodeId].name + '(' + nodeId.toString() + ')/' + type.toString() + '(' + id.toString() + ')'
                    logger.info("publish:", publishString, data)
                    if (config.filterEchoedMQTTMessages) {
                        nodes[nodeId].attributes[id].ignoreNextHuman = true
                    }
                    mqttConnection.publish(publishString, data.toString())
                }
                if (config.publishInt) {
                    let publishString = 'homee/' + config.identifierInt + nodeId.toString() + '/attributes/' + id.toString()
                    logger.info("publish:", publishString, data)
                    mqttConnection.publish(publishString, mqttJson.data)
                }
                if (config.publishBool) {
                    let publishString = 'homee/' + config.identifierBool + nodeId.toString() + '/attributes/' + id.toString()
                    logger.info("publish:", publishString, mqttJson.boolData)
                    mqttConnection.publish(publishString, mqttJson.boolData)
                }

                // subscribe some types
                if (
                    type === 'OnOff' ||
                    type === 'Brightness' ||
                    type === 'TargetTemperature' ||
                    type === 'CurrentPosition' ||
                    type === 'ColorTemperature' ||
                    type === 'HomeeMode' ||
                    type === 'HeatingMode'
                ) {
                    if (config.subscribe) {
                        if (nodes[nodeId].attributes[id].subscribed != true) {
                            let subscribeString = 'homee/devices/' + 'set/' + nodeId.toString() + '/attributes/' + id.toString()
                            mqttConnection.subscribe(subscribeString, null, function (err) {
                                if (err) {
                                    logger.error(err, '(' + nodeId + ') "' + nodes[nodeId].name + '" subscribe: "' + subscribeString + '"')
                                } else {
                                    logger.debug('(' + nodeId + ') "' + nodes[nodeId].name + '" subscribe: "' + subscribeString + '"')
                                    logger.info('subscribe to (' + nodeId + ') "' + nodes[nodeId].name + '" ' + subscribeString)
                                    nodes[nodeId].attributes[id].subscribed = true
                                }
                            })
                        }
                    }
                    if (config.subscribeHuman) {
                        if (nodes[nodeId].attributes[id].subscribedHuman != true) {
                            let subscribeString = 'homee/' + config.identifierHuman + nodes[nodeId].name + '(' + nodeId.toString() + ')/' + type.toString() + '(' + id.toString() + ')'
                            mqttConnection.subscribe(subscribeString, null, function (err) {
                                if (err) {
                                    logger.error(err, '(' + nodeId + ') "' + nodes[nodeId].name + '" subscribe: "' + subscribeString + '"')
                                } else {
                                    logger.debug('(' + nodeId + ') "' + nodes[nodeId].name + '" subscribe: "' + subscribeString + '"')
                                    logger.info('subscribe to (' + nodeId + ') "' + nodes[nodeId].name + '" ' + subscribeString)
                                    nodes[nodeId].attributes[id].subscribedHuman = true
                                }
                            })
                        }
                    }
                }
            }
        }
    }

    return changed
}

function generateNodeInfo(node) {
    //console.log('-----------')
    //console.log(JSON.stringify(node,null,4))

    let cubeType
    switch (node.cube_type) {
        case 1:
            cubeType = 'Zwave'
            break
        case 2:
            cubeType = 'Zigbee'
            break
        case 3:
            cubeType = 'EnOcean'
            break
        case 8:
            cubeType = 'Wlan'
            break
        default:
            cubeType = 'Unknown'
            break
    }

    logger.info('added ' + '(' + node.id + ') - ' + querystring.unescape(node.name) + '(' + querystring.unescape(node.note) + ')' + ' Type:' + cubeType)
    //console.log(cubeType)
    //console.log(querystring.unescape(node.name))
    //console.log(querystring.unescape(node.note))
    logger.debug(JSON.stringify(node, null, 4))

    nodes[node.id] = {}
    nodes[node.id].cubeType = cubeType
    nodes[node.id].name = querystring.unescape(node.name)
    nodes[node.id].note = querystring.unescape(node.note)
    nodes[node.id].attributes = []

    for (let key in node.attributes) {
        generateAttributeInfo(node.id, node.attributes[key])
    }

    if (config.publishHuman) {
        let publishString = 'homee/' + config.identifierHuman + nodes[node.id].name + '(' + node.id.toString() + ')/' + 'CubeType' + '(' + '0' + ')'
        mqttConnection.publish(publishString, cubeType)
    }

    logger.info('----------------------------------------')
}

function handleNodes(nodes) {
    if (nodes != null) {
        for (let i in nodes) {
            generateNodeInfo(nodes[i])
        }
    }
}

function handleAttribute(attribute) {
    //console.log("handle Attribute:")
    //console.log(JSON.stringify(attribute, null, 4))
    generateAttributeInfo(attribute.node_id, attribute)
}

function muxCommand(command) {
    if (command.nodes != null) {
        handleNodes(command.nodes)
    } else if (command.all != null && command.all.nodes != null) {
        handleNodes(command.all.nodes)
    } else if (command.attribute != null) {
        handleAttribute(command.attribute)
    }
}

///////////////////////////////////////////////////////////////////////////////
//Homee Stuff
///////////////////////////////////////////////////////////////////////////////
let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + global.btoa(homeeUser + ':' + homeePassword)
}
//console.log('headers: ' + JSON.stringify(headers, null, 4))

let data = {
    device_name: 'homeeToMqtt',
    device_hardware_id: 'homeeToMqtt',
    device_os: 5,
    device_type: 3,
    device_app: 1
}
//console.log('data: ' + JSON.stringify(data, null, 4))

function homeeConnect() {
    const urlData = Object.keys(data)
        .map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        })
        .join('&')
    //console.log('data: ' + urlData)

    let url = 'http://' + config.homeeServer + ':7681/access_token'
    //console.log('url: ' + url)

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: urlData
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (data) {
            //console.log(data)
            let token = data.match(/access_token=([^&]*)/)
            //console.log('token=' + token[1])
            let connection = 'ws://' + config.homeeServer + ':7681/connection?access_token=' + token[1]
            //Create new WebSocket
            homeeSocket = new WebSocket(connection, ['v2'])
            //console.log(homeeSocket)
            // Attach listeners
            homeeSocket.onmessage = function (event) {
                let j = JSON.parse(event.data)
                muxCommand(j)
                //console.log(JSON.stringify(j, null, 4))
            }
            homeeSocket.onopen = function () {
                homeeAvailable = true
                logger.info('Connection to homee @ ' + config.homeeServer + ' successfull')
                //console.log('websocket: open')
                //console.log('----------------------------------------')
                homeeSocket.send('GET:all')
            }
            homeeSocket.onclose = function () {
                homeeAvailable = false
                logger.info('Connection to homee closed')
                if (!terminating) {
                    setTimeout(homeeConnect, 10000)
                }
            }
            homeeSocket.onerror = function () {
                homeeAvailable = false
                logger.error('Connection to homee @ ' + config.homeeServer + ' failed')
                killProcess(1)
            }
        })
        .catch(function (err) {
            logger.error("error in fetch:" + err)
            if (!terminating) {
                setTimeout(homeeConnect, 10000)
            }
            return err;
        });
}

///////////////////////////////////////////////////////////////////////////////
//MQTT Stuff
///////////////////////////////////////////////////////////////////////////////

function splitHumanTopic(topic) {
    let matchString = 'homee/' + config.identifierHuman
    if (topic.startsWith(matchString)) {
        let restTopic = topic.slice(matchString.length)
        let parts = restTopic.split('/')

        if (parts.length >= 2) {
            let braceIndex = parts[0].lastIndexOf('(')
            if (braceIndex >= 0) {
                let deviceId = parseInt(parts[0].slice(braceIndex + 1), 10)

                braceIndex = parts[1].lastIndexOf('(')
                if (braceIndex >= 0) {
                    let attributeId = parseInt(parts[1].slice(braceIndex + 1), 10)
                    return {
                        device: deviceId,
                        attribute: attributeId
                    }
                }
            }
        }
    }
    return null
}

function handleIncommingSubscribedMqttMessage(topic, message) {
    logger.debug(topic)
    logger.debug(message.toString())
    //[ 'homee', 'devices', 'set', '200', 'attributes', '1051' ]
    if (config.subscribe) {
        let parts = topic.split('/')
        if (
            parts[0] === 'homee' &&
            parts[1] === 'devices' &&
            parts[2] === 'set' &&
            parts[4] === 'attributes'
        ) {
            let device = parts[3]
            let attribute = parts[5]
            let messageString = message.toString().toLowerCase()
            if (messageString === 'true') {
                message = 1
            }
            if (messageString === 'false') {
                message = 0
            }

            if (homeeSocket != null) {
                let putMessage = 'PUT:/nodes/' + device + '/attributes/' + attribute + '?target_value=' + message
                logger.info(putMessage)
                homeeSocket.send(putMessage)
            }
        }
    }
    if (config.subscribeHuman) {
        let found = splitHumanTopic(topic)
        if (found != null) {
            if (nodes[found.device] && nodes[found.device].attributes && nodes[found.device].attributes[found.attribute]) {
                if (nodes[found.device].attributes[found.attribute].ignoreNextHuman) {
                    nodes[found.device].attributes[found.attribute].ignoreNextHuman = false
                } else {
                    let messageString = message.toString().toLowerCase()
                    logger.debug('MESSAGE STRING:', message.toString())
                    if (messageString === '' || messageString === 'null') {
                        logger.debug('MQTT Send: Ignored')
                    } else {
                        if (messageString === 'true') {
                            message = 1
                        }
                        if (messageString === 'false') {
                            message = 0
                        }
                        if (homeeSocket != null) {
                            let putMessage = 'PUT:/nodes/' + found.device + '/attributes/' + found.attribute + '?target_value=' + message
                            logger.info(putMessage)
                            homeeSocket.send(putMessage)
                        }
                    }
                }
            }
        }
    }
}

function mqttConnect() {
    logger.info("Connecting to mqtt")
    if (config.mqttUserName) {
        mqttConnection = mqtt.connect('mqtt://' + config.mqttServer, {
            username: config.mqttUserName,
            password: config.mqttPassword
        })
    } else {
        mqttConnection = mqtt.connect('mqtt://' + config.mqttServer, {})
    }

    mqttConnection.on('connect', function () {
        logger.info("mqtt available")
        mqttAvailable=true
        if (homeeAvailable === false && !terminating) {
            homeeConnect()
        }
    })
    mqttConnection.on('message', function (topic, message) {
        logger.info("mqtt message received:", topic, message.toString())
        handleIncommingSubscribedMqttMessage(topic, message)
    })
}

///////////////////////////////////////////////////////////////////////////////
//Application Stuff
///////////////////////////////////////////////////////////////////////////////
function doStuff() {
    if (homeeAvailable == true && config.homeeStatusRepeat) {
        logger.info("Reconciling all homee status")
        homeeSocket.send('GET:all')
    }
}

function killProcess(rc) {
    terminating = true

    if (process.exitTimeoutId) {
        return
    }

    process.exitTimeoutId = setTimeout(function () {
        process.exit(rc)
    }, 1000)
    logger.info('process will exit in 1 second')

    mqttConnection.end()
    if (homeeAvailable == true) {
        homeeSocket.terminate()
    }
}

function run() {
    process.on('SIGTERM', killProcess)
    process.on('SIGINT', killProcess)
    process.on('uncaughtException', function (e) {
        killProcess(1)
    })

    mqttConnect()

    setInterval(doStuff, config.statusTimer * 1000)
}

run()
