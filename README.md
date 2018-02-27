# homeeToMqtt
Bidirectional Interface between homee and MQTT

## Info
This tool is in alpha state.
The source based on parts from following github projects:

* stfnhmplr/homebridge-homee
* stfnhmplr/node-red-contrib-homee

## Disclaimer
This tool uses a non official API from Codeatelier GmbH for homee and subject to change.

## Idea
This tool publish state changes to MQTT and subcribes topics to change state of OnOff switches via MQTT.

MQTT messages are easily to subscribe in Node-Red, Homebridge or Hass.io

## config.json
Create a config.json in same folder ad the app and adjust it to your needs

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

## MQTT
### published topics from homeeToMqtt
    homee/devices/status/[DeviceId]/attributes/[AttributeId]

##### Example Topic
    homee/devices/status/200/attributes/1051

##### Example Topic
    Payload:
    {
        "id":1051,
        "node_id":200,
        "instance":0,
        "minimum":0,
        "maximum":1,
        "current_value":1,
        "target_value":1,
        "last_value":1,
        "unit":"n/a",
        "step_value":1,
        "editable":1,
        "type":1,
        "state":1,
        "last_changed":1519675682,
        "changed_by":1,
        "changed_by_id":0,
        "based_on":1,
        "data":1,
        "options":[],
        "cubeType":"Zigbee",
        "name":"Büro Panel Gang",
        "note":"# IKEA FLOALT LED light panel"
    }

#### MQTT subscribed topics from homeeToMqtt
    homee/devices/set/[DeviceId]/attributes/[AttributeId]

##### Example Topic
    homee/devices/set/200/attributes/1051

##### Example Topic
    1
