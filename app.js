// sample config.json
/*
{
  "homeeUserName": "mqtt",
  "homeePassword": "mqtt",
  "homeeServer": "homee.fritz.box",
  "mqttServer": "matt.fritz.box",
  "mqttUserName": "mqtt",
  "mqttPassword": "mqtt",
  "publish": true,
  "subscribe": true
}
*/

// config
var config = require('config.json')('./config.json')

if (config.homeeUserName == null) config.homeeUserName = 'mqtt'
if (config.homeePassword == null) config.homeePassword = 'mqtt'
if (config.homeeServer == null) config.homeeServer = 'homee'
if (config.mqttServer == null) config.mqttServer = 'mqtt'
if (config.mqttUserName == null) config.mqttUserName = 'mqtt'
if (config.mqttPassword == null) config.mqttPassword = 'mqtt'
if (config.subscribe == null) config.subscribe = true
if (config.publish == null) config.publish = true

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
const token_expires = 0
const homeeUser = querystring.escape(config.homeeUserName)
const homeePassword = sha512(config.homeePassword) //'8b6717d4a69717640022f88307d828d95ce99bce944f418e58445d1c65cd5fe00f5cb774d8f26fd7c56dd95942b3e29463f880be78514fc8dfd78807d3b20dbc'

//vars
var mqttAvailable = false
var mySocket = null

//node nodes
nodes = []

//emulate btoa
global.Buffer = global.Buffer || require('buffer').Buffer
if (typeof btoa === 'undefined') {
  global.btoa = function(str) {
    return new Buffer(str).toString('base64')
  }
}

if (typeof atob === 'undefined') {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString()
  }
}

//the real stuff
function generateAttributeInfo(nodeId, attribute) {
  var changed = true
  if (nodes[nodeId] != null) {
    var type = homee.getHAPTypeByAttributeType(attribute.type)
    var id = attribute.id
    var unit = querystring.unescape(attribute.unit)
    var data = ''

    if (unit == 'text') {
      data = decodeURIComponent(attribute.data)
    } else {
      data = attribute.current_value
    }

    if (nodes[nodeId].attributes[id] == null) {
      nodes[nodeId].attributes[id] = {}
    }

    nodes[nodeId].attributes[id].type = type
    nodes[nodeId].attributes[id].unit = unit
    if (nodes[nodeId].attributes[id].data == data) {
      changed = false
    }
    nodes[nodeId].attributes[id].data = data

    if (changed) {
      console.log(
        '(' + nodeId + ')' + '"' + nodes[nodeId].name + '", ',
        '(' + id + ')' + type + ', ',
        data + unit
      )
      //console.log(JSON.stringify(attribute,null,4))
      if (mqttAvailable) {
        var mqttJson = Object.assign(attribute)
        mqttJson.cubeType = nodes[nodeId].cubeType
        mqttJson.name = nodes[nodeId].name
        mqttJson.note = nodes[nodeId].note
        mqttJson.unit = unit
        mqttJson.data = data
        //console.log('homee/devices/' + nodeId.toString() + '/attributes/' + id.toString(), JSON.stringify(mqttJson, null, 4))
        if (config.publish) {
          client.publish(
            'homee/devices/' +
              nodeId.toString() +
              '/attributes/' +
              id.toString(),
            JSON.stringify(mqttJson)
          )
        }
        if (config.subscribe) {
          if (
            type == 'OnOff' ||
            type == 'Brightness' ||
            type == 'TargetTemperature'
          ) {
            console.log(
              '\tsubscribe: ',
              'homee/devices/' +
                nodeId.toString() +
                '/set/attributes/' +
                id.toString()
            )
            client.subscribe(
              'homee/devices/' +
                nodeId.toString() +
                '/set/attributes/' +
                id.toString()
            )
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

  var nodeType = homee.getAccessoryTypeByNodeProfile(node.profile)

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
  Authorization: 'Basic ' + btoa(homeeUser + ':' + homeePassword)
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

const urlData = Object.keys(data)
  .map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  })
  .join('&')
//console.log('data: ' + urlData)

var url = 'http://' + config.homeeServer + ':7681/access_token'
//console.log('url: ' + url)

const client = mqtt.connect('mqtt://' + config.mqttServer, {
  username: config.mqttUserName,
  password: config.mqttPassword
})
client.on('connect', function() {
  mqttAvailable = true
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: urlData
  })
    .then(function(response) {
      return response.text()
    })
    .then(function(data) {
      console.log(data)
      var token = data.match(/access_token=([^&]*)/)
      console.log('token=' + token[1])
      var connection =
        'ws://' +
        config.homeeServer +
        ':7681/connection?access_token=' +
        token[1]
      //Create new WebSocket
      mySocket = new WebSocket(connection, ['v2'])
      console.log(mySocket)
      // Attach listeners
      mySocket.onmessage = function(event) {
        var j = JSON.parse(event.data)
        muxCommand(j)
        //console.log(JSON.stringify(j, null, 4))
      }
      mySocket.onopen = function(event) {
        console.log('open')
        mySocket.send('GET:all')
      }
      mySocket.onclose = function(event) {
        console.log('close')
      }
      mySocket.onerror = function(event) {
        console.log('error')
      }
    })
})

client.on('message', function(topic, message) {
  // message is Buffer
  console.log(topic, message.toString())
  var parts = topic.split('/')
  //[ 'homee', 'devices', '200', 'set', 'attributes', '1051' ]
  if (
    parts[0] == 'homee' &&
    parts[1] == 'devices' &&
    parts[3] == 'set' &&
    parts[4] == 'attributes'
  ) {
    var device = parts[2]
    var attribute = parts[5]
    if (mySocket != null) {
      console.log(
        'PUT:/nodes/' +
          device +
          '/attributes/' +
          attribute +
          '?target_value=' +
          message
      )
      mySocket.send(
        'PUT:/nodes/' +
          device +
          '/attributes/' +
          attribute +
          '?target_value=' +
          message
      )
    }
  }
  //client.end()
})

var state = 2
function doStuff() {
  // code to run
  // or just nothing
  if (false && mySocket != null) {
    console.log(
      'PUT:/nodes/' +
        '200' +
        '/attributes/' +
        '1051' +
        '?target_value=' +
        state % 2
    )
    mySocket.send(
      'PUT:/nodes/' +
        '200' +
        '/attributes/' +
        '1051' +
        '?target_value=' +
        state % 2
    )
    state++
  }
}

function run() {
  setInterval(doStuff, 30000)
}

run()
