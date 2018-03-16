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
  "publishInt": false,
  "publishBool": true,
  "subscribe": true,
  "homeeStatusRepeat": true,
  "statusTimer": 180
}
*/

var fs = require('fs')

// config
var config
var path

path = process.cwd() + '/config.json'
console.log('look for config ' + path)
if (fs.existsSync(path)) {
    config = require('config.json')(path)
} else {
    path = '/etc/homeeToMqtt' + '/config.json'
    console.log('look for config ' + path)
    if (fs.existsSync(path)) {
        config = require('config.json')(path)
    } else {
        path = __dirname + '/config.json'
        console.log('look for config ' + path)
        if (fs.existsSync(path)) {
            config = require('config.json')(path)
        } else {
            console.log('no config.json found --> use defaults')
            config = {}
        }
    }
}

if (config.homeeUserName == null) config.homeeUserName = 'mqtt'
if (config.homeePassword == null) config.homeePassword = 'mqtt'
if (config.homeeServer == null) config.homeeServer = 'homee'
if (config.mqttServer == null) config.mqttServer = 'mqtt'
if (config.mqttUserName == null) config.mqttUserName = 'mqtt'
if (config.mqttPassword == null) config.mqttPassword = 'mqtt'
if (config.subscribe == null) config.subscribe = true
if (config.publish == null) config.publish = true
if (config.publishInt == null) config.publishInt = false
if (config.publishBool == null) config.publishBool = true
if (config.homeeStatusRepeat == null) config.homeeStatusRepeat = true
if (config.statusTimer == null) config.statusTimer = 180

console.log('Config:')
console.log(JSON.stringify(config, null, 4))

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
var mqttAvailable = false
var mqttConnection = null
var homeeAvailable = false
var homeeSocket = null
var terminating = false

//node nodes
var nodes = []

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

//the real stuff
function generateAttributeInfo(nodeId, attribute) {
    var changed = true
    if (nodes[nodeId] != null) {
        var type = homee.getHAPTypeByAttributeType(attribute.type)
        var typeString = homee.getAttributeString(attribute.type)
        var id = attribute.id
        var unit = querystring.unescape(attribute.unit)
        var data = ''

        if (unit === 'text') {
            data = decodeURIComponent(attribute.data)
        } else {
            data = attribute.current_value
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
            console.log('(' + nodeId + ') ' + '"' + nodes[nodeId].name + '", ', '(' + id + '/' + typeString + '=' + attribute.type + ') ' + type + ', ', data + unit)
            //console.log(JSON.stringify(attribute,null,4))
            if (mqttAvailable) {
                var mqttJson = Object.assign(attribute)
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
                    var publishString = 'homee/devices/status/' + nodeId.toString() + '/attributes/' + id.toString()
                    //console.log(publishString, JSON.stringify(mqttJson, null, 4))
                    mqttConnection.publish(publishString, JSON.stringify(mqttJson))
                }
                if (config.publishInt) {
                    var publishString = 'homee/devices/int/' + nodeId.toString() + '/attributes/' + id.toString()
                    mqttConnection.publish(publishString, mqttJson.data)
                }
                if (config.publishBool) {
                    publishString = 'homee/devices/bool/' + nodeId.toString() + '/attributes/' + id.toString()
                    //console.log(publishString, mqttJson.boolData)
                    mqttConnection.publish(publishString, mqttJson.boolData)
                }
                if (config.subscribe) {
                    if (
                        type === 'OnOff' ||
                        type === 'Brightness' ||
                        type === 'TargetTemperature' ||
                        type === 'CurrentPosition' ||
                        type === 'ColorTemperature'
                    ) {
                        if (nodes[nodeId].attributes[id].subscribed != true) {
                            var subscribeString = 'homee/devices/set/' + nodeId.toString() + '/attributes/' + id.toString()
                            mqttConnection.subscribe(subscribeString, null, function (err) {
                                if (!err) {
                                    console.log('(' + nodeId + ') "' + nodes[nodeId].name + '" subscribe: "' + subscribeString + '"')
                                } else {
                                    nodes[nodeId].attributes[id].subscribed = true
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

    var cubeType
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

    console.log(node.id)
    console.log(cubeType)
    console.log(querystring.unescape(node.name))
    console.log(querystring.unescape(node.note))
    //console.log(JSON.stringify(node, censor, 4))

    nodes[node.id] = {}
    nodes[node.id].cubeType = cubeType
    nodes[node.id].name = querystring.unescape(node.name)
    nodes[node.id].note = querystring.unescape(node.note)
    nodes[node.id].attributes = []

    for (var key in node.attributes) {
        generateAttributeInfo(node.id, node.attributes[key])
    }
    console.log('----------------------------------------')
}

function handleNodes(nodes) {
    if (nodes != null) {
        for (var i in nodes) {
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

var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + global.btoa(homeeUser + ':' + homeePassword)
}
//console.log('headers: ' + JSON.stringify(headers, null, 4))

var data = {
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

    var url = 'http://' + config.homeeServer + ':7681/access_token'
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
            var token = data.match(/access_token=([^&]*)/)
            //console.log('token=' + token[1])
            var connection = 'ws://' + config.homeeServer + ':7681/connection?access_token=' + token[1]
            //Create new WebSocket
            homeeSocket = new WebSocket(connection, ['v2'])
            //console.log(homeeSocket)
            // Attach listeners
            homeeSocket.onmessage = function (event) {
                var j = JSON.parse(event.data)
                muxCommand(j)
                //console.log(JSON.stringify(j, null, 4))
            }
            homeeSocket.onopen = function () {
                homeeAvailable = true
                console.log('websocket: open')
                console.log('----------------------------------------')
                homeeSocket.send('GET:all')
            }
            homeeSocket.onclose = function () {
                homeeAvailable = false
                console.log('websocket: close')
                if (!terminating) {
                    setTimeout(homeeConnect, 10000)
                }
            }
            homeeSocket.onerror = function () {
                homeeAvailable = false
                console.log('websocket: error')
            }
        })
}

function mqttConnect() {
    if (config.mqttUserName) {
        mqttConnection = mqtt.connect('mqtt://' + config.mqttServer, {
            username: config.mqttUserName,
            password: config.mqttPassword
        })
    } else {
        mqttConnection = mqtt.connect('mqtt://' + config.mqttServer, {})
    }

    mqttConnection.on('connect', function () {
        mqttAvailable = true
        homeeConnect()
    })

    mqttConnection.on('message', function (topic, message) {
        //console.log(topic, message.toString())
        var parts = topic.split('/')
        //[ 'homee', 'devices', 'set', '200', 'attributes', '1051' ]
        if (
            parts[0] === 'homee' &&
            parts[1] === 'devices' &&
            parts[2] === 'set' &&
            parts[4] === 'attributes'
        ) {
            var device = parts[3]
            var attribute = parts[5]
            var messageString = message.toString().toLowerCase()
            if (messageString === 'true') {
                message = 1
            }
            if (messageString === 'false') {
                message = 0
            }

            if (homeeSocket != null) {
                var putMessage = 'PUT:/nodes/' + device + '/attributes/' + attribute + '?target_value=' + message
                console.log(putMessage)
                homeeSocket.send(putMessage)
            }
        }
    })
}

function doStuff() {
    if (homeeAvailable == true && config.homeeStatusRepeat) {
        homeeSocket.send('GET:all')
    }
}

function killProcess() {
    terminating = true

    if (process.exitTimeoutId) {
        return
    }

    process.exitTimeoutId = setTimeout(process.exit, 1000)
    console.log('\nprocess will exit in 1 second')

    mqttConnection.end()
    if (homeeAvailable == true) {
        homeeSocket.terminate()
    }
}

function run() {
    process.on('SIGTERM', killProcess)
    process.on('SIGINT', killProcess)
    process.on('uncaughtException', function (e) {
        killProcess()
    })

    mqttConnect()

    setInterval(doStuff, config.statusTimer * 1000)
}

run()