# homeeToMqtt
Bidirectional Interface between homee and MQTT, which allows you to read and set states of device types managed in the Smart Home Gateway "homee" (https://hom.ee). 

## Info
This tool is still in alpha state.
The source is based on parts from following github projects:

* stfnhmplr/homebridge-homee
* stfnhmplr/node-red-contrib-homee

## Disclaimer
This tool uses a non official API from Codeatelier GmbH for the Smart Home Gateway "homee", which is subject to change at all times.

## Idea
This tool publish state changes of homee to MQTT and subcribes topics to change state of OnOff switches via MQTT.

MQTT messages are easily to subscribe in Node-Red, Homebridge, Hass.io or other gateways with MQTT clients.

## Installation
Just clone the repository (via git clone URL of this project) and change to the directory of the cloned repository.
Install all dependencies with:

    npm i

and run with:

    node app.js
    
You can optionally use the install scripts in the "rasperry" directory to either install homeeToMQTT and/or install the needed MQTT broker/server (Mosquito) on a RaspBerry PI. Adapt the UserNames and the hostnames in the file itself or change later on in the config.json described below.

## config.json
homeeToMqtt looks for config.json in following order:
 - actual directory
 - /etc/homeeToMqtt
 - installed directory

Create a config.json in the desired folder as the app and adjust it to your needs

    {
        "homeeUserName": "mqtt",
        "homeePassword": "mqtt",
        "homeeServer": "homee.fritz.box",
        "mqttServer": "matt.fritz.box",
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
        "homeeStatusRepeat": true,
        "statusTimer": 180
    }

### Parameter description
- "homeeUserName": use your username (adding an own user for MQTT is a good idea)
- "homeePassword": use the password of the above user
- "homeeServer": use the hostname or IP of your homee here, ensure it has a static IP oif IP-adress is used
- "mqttServer": use the hostname or IP of your MQTT server/broker here (might also be localhost if on the same machine)
- "mqttUserName": use the defined user name for the MQTT server in use (might be left blank "" if no username is set)
- "mqttPassword": use the password for the defined user for the MQTT server in use (leave blank "" if no username/pw is set)
- "publish" publish homee states to mqtt as json
- "publishHuman": publish homee states to mqtt in a human readable fashion
- "publishInt" publish homee states to mqtt as single int value
- "publishBool": publish homee states to mqtt as boolen string value (True,False)
- "subscribe": subscribe to mqtt topics
- "subscribeHuman": subscribe to mqtt human fashion mqtt topics
- "identifier": path after homee for this mode
- "identifierHuman": path after homee for this mode
- "identifierInt": path after homee for this mode
- "identifierBool": path after homee for this mode
- "homeeStatusRepeat": request full homee states every status timer seconds
- "statusTimer": time in seconds to send homee full stattus

## MQTT
### published topics from homeeToMqtt
technical mode:

    homee/devices/status/[DeviceId]/attributes/[AttributeId]
or for human mode:

    homee/human/[AttributeName](DeviceId])/[AttributeType]([AttributeId])
or for int mode:

    homee/devices/int/[DeviceId]/bool/[AttributeId] 1
or for bool mode:

    homee/devices/bool/[DeviceId]/attributes/[AttributeId] True
    

##### Example Topic
    homee/devices/status/200/attributes/1051
    homee/human/Ambylight(187)/Brightness(967)

##### Example Topic
technical mode:

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
        "typeString":"OnOff",
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
technical mode:

    homee/devices/set/[DeviceId]/attributes/[AttributeId]
human mode:

    homee/human/[AttributeName](DeviceId])/[AttributeType]([AttributeId])

##### Example Topic
    homee/devices/set/200/attributes/1051
    homee/human/Ambylight(187)/Brightness(967)

