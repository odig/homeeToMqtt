const homeeEnums = {
    CANodeProfile: {
        CANodeProfileNone: 0,
        CANodeProfileHomee: 1,
        CANodeProfileOnOffPlug: 10,
        CANodeProfileDimmableMeteringSwitch: 11,
        CANodeProfileMeteringSwitch: 12,
        CANodeProfileMeteringPlug: 13,
        CANodeProfileDimmablePlug: 14,
        CANodeProfileDimmableSwitch: 15,
        CANodeProfileOnOffSwitch: 16,
        CANodeProfileDoubleOnOffSwitch: 18,
        CANodeProfileDimmableMeteringPlug: 19,
        CANodeProfileOneButtonRemote: 20,
        CANodeProfileBinaryInput: 21,
        CANodeProfileDimmableColorMeteringPlug: 22,
        CANodeProfileDoubleBinaryInput: 23,
        CANodeProfileTwoButtonRemote: 24,
        CANodeProfileThreeButtonRemote: 25,
        CANodeProfileFourButtonRemote: 26,
        CANodeProfileAlarmSensor: 27,
        CANodeProfileDoubleOnOffPlug: 28,
        CANodeProfileOnOffSwitchWithBinaryInput: 29,
        CANodeProfileWatchDogWithPressureAndTemperatures: 30,
        CANodeProfileFibaroButton: 31,
        CANodeProfileEnergyMeter: 32,
        CANodeProfileDoubleMeteringSwitch: 33,
        CANodeProfileFibaroSwipe: 34,
        CANodeProfileBrightnessSensor: 1e3,
        CANodeProfileDimmableColorLight: 1001,
        CANodeProfileDimmableExtendedColorLight: 1002,
        CANodeProfileDimmableColorTemperatureLight: 1003,
        CANodeProfileDimmableLight: 1004,
        CANodeProfileDimmableLightWithBrightnessSensor: 1005,
        CANodeProfileDimmableLightWithBrightnessAndPresenceSensor: 1006,
        CANodeProfileDimmableLightWithPresenceSensor: 1007,
        CANodeProfileDimmableRGBWLight: 1008,
        CANodeProfileOpenCloseSensor: 2e3,
        CANodeProfileWindowHandle: 2001,
        CANodeProfileShutterPositionSwitch: 2002,
        CANodeProfileOpenCloseAndTemperatureSensor: 2003,
        CANodeProfileElectricMotorMeteringSwitch: 2004,
        CANodeProfileOpenCloseWithTemperatureAndBrightnessSensor: 2005,
        CANodeProfileElectricMotorMeteringSwitchWithoutSlatPosition: 2006,
        CANodeProfileLock: 2007,
        CANodeProfileWindowHandleWithButtons: 2008,
        CANodeProfileWindowHandleWithButtonsAndTemperatureAndHumiditySensor: 2009,
        CANodeProfileTemperatureAndHumiditySensor: 3001,
        CANodeProfileCO2Sensor: 3002,
        CANodeProfileRoomThermostat: 3003,
        CANodeProfileRoomThermostatWithHumiditySensor: 3004,
        CANodeProfileBinaryInputWithTemperatureSensor: 3005,
        CANodeProfileRadiatorThermostat: 3006,
        CANodeProfileTemperatureSensor: 3009,
        CANodeProfileHumiditySensor: 3010,
        CANodeProfileWaterValve: 3011,
        CANodeProfileWaterMeter: 3012,
        CANodeProfileWeatherStation: 3013,
        CANodeProfileNetatmoMainModule: 3014,
        CANodeProfileNetatmoOutdoorModule: 3015,
        CANodeProfileNetatmoIndoorModule: 3016,
        CANodeProfileNetatmoRainModule: 3017,
        CANodeProfileCosiThermChannel: 3018,
        CANodeProfileNestThermostatWithCooling: 3020,
        CANodeProfileNestThermostatWithHeating: 3021,
        CANodeProfileNestThermostatWithHeatingAndCooling: 3022,
        CANodeProfileNetatmoWindModule: 3023,
        CANodeProfileElectricalHeating: 3024,
        CANodeProfileValveDrive: 3025,
        CANodeProfileCamera: 3026,
        CANodeProfileCameraWithFloodlight: 3027,
        CANodeProfileNetatmoTags: 3028,
        CANodeProfileMotionDetectorWithTemperatureBrightnessAndHumiditySensor: 4010,
        CANodeProfileMotionDetector: 4011,
        CANodeProfileSmokeDetector: 4012,
        CANodeProfileFloodDetector: 4013,
        CANodeProfilePresenceDetector: 4014,
        CANodeProfileMotionDetectorWithTemperatureAndBrightnessSensor: 4015,
        CANodeProfileSmokeDetectorWithTemperatureSensor: 4016,
        CANodeProfileFloodDetectorWithTemperatureSensor: 4017,
        CANodeProfileWatchDogDevice: 4018,
        CANodeProfileLAG: 4019,
        CANodeProfileOWU: 4020,
        CANodeProfileEurovac: 4021,
        CANodeProfileOWWG3: 4022,
        CANodeProfileEuropress: 4023,
        CANodeProfileMinimumDetector: 4024,
        CANodeProfileMaximumDetector: 4025,
        CANodeProfileSmokeDetectorAndCODetector: 4026,
        CANodeProfileSiren: 4027,
        CANodeProfileMotionDetectorWithOpenCloseTemperatureAndBrightnessSensor: 4028,
        CANodeProfileMotionDetectorWithBrightness: 4029,
        CANodeProfileDoorbell: 4030,
        CANodeProfileSmokeDetectorAndSiren: 4031,
        CANodeProfileFloodDetectorWithTemperatureAndHumiditySensor: 4032,
        CANodeProfileMinimumDetectorWithTemperatureSensor: 4033,
        CANodeProfileMaximumDetectorWithTemperatureSensor: 4034,
        CANodeProfilePresenceDetectorWithTemperatureAndBrightnessSensor: 4035,
        CANodeProfileCODetector: 4036,
        CANodeProfileInovaAlarmSystem: 5e3,
        CANodeProfileInovaDetector: 5001,
        CANodeProfileInovaSiren: 5002,
        CANodeProfileInovaCommand: 5003,
        CANodeProfileInovaTransmitter: 5004,
        CANodeProfileInovaReciever: 5005,
        CANodeProfileInovaKoala: 5006,
        CANodeProfileInovaInternalTransmitter: 5007,
        CANodeProfileInovaControlPanel: 5008,
        CANodeProfileInovaInputOutputExtension: 5009,
        CANodeProfileInovaMotionDetectorWithVOD: 5010,
        CANodeProfileInovaMotionDetector: 5011,
        CANodeProfileWashingMachine: 6e3,
        CANodeProfileTumbleDryer: 6001,
        CANodeProfileDishwasher: 6002
    },
    CANodeProtocol: {
        CANodeProtocolNone: 0,
        CANodeProtocolZWave: 1,
        CANodeProtocolZigBee: 2,
        CANodeProtocolEnOcean: 3,
        CANodeProtocolWMBus: 4,
        CANodeProtocolHomematic: 5,
        CANodeProtocolKNXRF: 6,
        CANodeProtocolInova: 7,
        CANodeProtocolHTTPAVM: 8,
        CANodeProtocolHTTPNetatmo: 9,
        CANodeProtocolHTTPKoubachi: 10,
        CANodeProtocolHTTPNest: 11,
        CANodeProtocolIOCube: 12,
        CANodeProtocolHTTPCCU2: 13,
        CANodeProtocolHTTPUPnP: 14,
        CANodeProtocolHTTPNuki: 15,
        CANodeProtocolAll: 100
    },
    CANodeState: {
        CANodeStateNone: 0,
        CANodeStateAvailable: 1,
        CANodeStateUnavailable: 2,
        CANodeStateUpdateInProgress: 3,
        CANodeStateWaitingForAttributes: 4,
        CANodeStateInitializing: 5,
        CANodeStateUserInteractionRequired: 6,
        CANodeStatePasswordRequired: 7,
        CANodeStateHostUnavailable: 8,
        CANodeStateDeleteInProgress: 9,
        CANodeStateCosiConnected: 10,
        CANodeStateBlocked: 11,
        CANodeStateWaitingForWakeup: 12
    },
    CAAttributeType: {
        CAAttributeTypeNone: 0,
        CAAttributeTypeOnOff: 1,
        CAAttributeTypeDimmingLevel: 2,
        CAAttributeTypeCurrentEnergyUse: 3,
        CAAttributeTypeAccumulatedEnergyUse: 4,
        CAAttributeTypeTemperature: 5,
        CAAttributeTypeTargetTemperature: 6,
        CAAttributeTypeRelativeHumidity: 7,
        CAAttributeTypeBatteryLevel: 8,
        CAAttributeTypeStatusLED: 9,
        CAAttributeTypeWindowPosition: 10,
        CAAttributeTypeBrightness: 11,
        CAAttributeTypeFloodAlarm: 12,
        CAAttributeTypeSiren: 13,
        CAAttributeTypeOpenClose: 14,
        CAAttributeTypePosition: 15,
        CAAttributeTypeSmokeAlarm: 16,
        CAAttributeTypeBlackoutAlarm: 17,
        CAAttributeTypeCurrentValvePosition: 18,
        CAAttributeTypeBinaryInput: 19,
        CAAttributeTypeCO2Level: 20,
        CAAttributeTypePressure: 21,
        CAAttributeTypeColor: 23,
        CAAttributeTypeSaturation: 24,
        CAAttributeTypeMotionAlarm: 25,
        CAAttributeTypeMotionSensitivity: 26,
        CAAttributeTypeMotionInsensitivity: 27,
        CAAttributeTypeMotionAlarmCancelationDelay: 28,
        CAAttributeTypeWakeUpInterval: 29,
        CAAttributeTypeTamperAlarm: 30,
        CAAttributeTypeLinkQuality: 33,
        CAAttributeTypeInovaAlarmSystemState: 34,
        CAAttributeTypeInovaAlarmGroupState: 35,
        CAAttributeTypeInovaAlarmIntrusionState: 36,
        CAAttributeTypeInovaAlarmErrorState: 37,
        CAAttributeTypeInovaAlarmDoorState: 38,
        CAAttributeTypeInovaAlarmExternalSensor: 39,
        CAAttributeTypeButtonState: 40,
        CAAttributeTypeHue: 41,
        CAAttributeTypeColorTemperature: 42,
        CAAttributeTypeHardwareRevision: 43,
        CAAttributeTypeFirmwareRevision: 44,
        CAAttributeTypeSoftwareRevision: 45,
        CAAttributeTypeLEDState: 46,
        CAAttributeTypeLEDStateWhenOn: 47,
        CAAttributeTypeLEDStateWhenOff: 48,
        CAAttributeTypeHighTemperatureAlarm: 52,
        CAAttributeTypeHighTemperatureAlarmTreshold: 53,
        CAAttributeTypeLowTemperatureAlarm: 54,
        CAAttributeTypeLowTemperatureAlarmTreshold: 55,
        CAAttributeTypeTamperSensitivity: 56,
        CAAttributeTypeTamperAlarmCancelationDelay: 57,
        CAAttributeTypeBrightnessReportInterval: 58,
        CAAttributeTypeTemperatureReportInterval: 59,
        CAAttributeTypeMotionAlarmIndicationMode: 60,
        CAAttributeTypeLEDBrightness: 61,
        CAAttributeTypeTamperAlarmIndicationMode: 62,
        CAAttributeTypeSwitchType: 63,
        CAAttributeTypeTemperatureOffset: 64,
        CAAttributeTypeAccumulatedWaterUse: 65,
        CAAttributeTypeAccumulatedWaterUseLastMonth: 66,
        CAAttributeTypeCurrentDate: 67,
        CAAttributeTypeLeakAlarm: 68,
        CAAttributeTypeBatteryLowAlarm: 69,
        CAAttributeTypeMalfunctionAlarm: 70,
        CAAttributeTypeLinkQualityAlarm: 71,
        CAAttributeTypeMode: 72,
        CAAttributeTypeCalibration: 75,
        CAAttributeTypePresenceAlarm: 76,
        CAAttributeTypeMinimumAlarm: 77,
        CAAttributeTypeMaximumAlarm: 78,
        CAAttributeTypeOilAlarm: 79,
        CAAttributeTypeWaterAlarm: 80,
        CAAttributeTypeInovaAlarmInhibition: 81,
        CAAttributeTypeInovaAlarmEjection: 82,
        CAAttributeTypeInovaAlarmCommercialRef: 83,
        CAAttributeTypeInovaAlarmSerialNumber: 84,
        CAAttributeTypeRadiatorThermostatSummerMode: 85,
        CAAttributeTypeInovaAlarmOperationMode: 86,
        CAAttributeTypeAutomaticMode: 87,
        CAAttributeTypePollingInterval: 88,
        CAAttributeTypeFeedTemperature: 89,
        CAAttributeTypeDisplayOrientation: 90,
        CAAttributeTypeManualOperation: 91,
        CAAttributeTypeDeviceTemperature: 92,
        CAAttributeTypeSonometer: 93,
        CAAttributeTypeAirPressure: 94,
        CAAttributeTypeInovaAlarmAntimask: 99,
        CAAttributeTypeInovaAlarmBackupSupply: 100,
        CAAttributeTypeRainFall: 101,
        CAAttributeTypeInovaAlarmGeneralHomeCommand: 103,
        CAAttributeTypeInovaAlarmAlert: 104,
        CAAttributeTypeInovaAlarmSilentAlert: 105,
        CAAttributeTypeInovaAlarmPreAlarm: 106,
        CAAttributeTypeInovaAlarmDeterrenceAlarm: 107,
        CAAttributeTypeInovaAlarmWarning: 108,
        CAAttributeTypeInovaAlarmFireAlarm: 109,
        CAAttributeTypeUpTime: 110,
        CAAttributeTypeDownTime: 111,
        CAAttributeTypeShutterBlindMode: 112,
        CAAttributeTypeShutterSlatPosition: 113,
        CAAttributeTypeShutterSlatTime: 114,
        CAAttributeTypeRestartDevice: 115,
        CAAttributeTypeSoilMoisture: 116,
        CAAttributeTypeWaterPlantAlarm: 117,
        CAAttributeTypeMistPlantAlarm: 118,
        CAAttributeTypeFertilizePlantAlarm: 119,
        CAAttributeTypeCoolPlantAlarm: 120,
        CAAttributeTypeHeatPlantAlarm: 121,
        CAAttributeTypePutPlantIntoLightAlarm: 122,
        CAAttributeTypePutPlantIntoShadeAlarm: 123,
        CAAttributeTypeColorMode: 124,
        CAAttributeTypeTargetTemperatureLow: 125,
        CAAttributeTypeTargetTemperatureHigh: 126,
        CAAttributeTypeHVACMode: 127,
        CAAttributeTypeAway: 128,
        CAAttributeTypeHVACState: 129,
        CAAttributeTypeHasLeaf: 130,
        CAAttributeTypeSetEnergyConsumption: 131,
        CAAttributeTypeCOAlarm: 132,
        CAAttributeTypeRestoreLastKnownState: 133,
        CAAttributeTypeLastImageReceived: 134,
        CAAttributeTypeUpDown: 135,
        CAAttributeTypeRequestVOD: 136,
        CAAttributeTypeInovaDetectorHistory: 137,
        CAAttributeTypeSurgeAlarm: 138,
        CAAttributeTypeLoadAlarm: 139,
        CAAttributeTypeOverloadAlarm: 140,
        CAAttributeTypeVoltageDropAlarm: 141,
        CAAttributeTypeShutterOrientation: 142,
        CAAttributeTypeOverCurrentAlarm: 143,
        CAAttributeTypeSirenMode: 144,
        CAAttributeTypeAlarmAutoStopTime: 145,
        CAAttributeTypeWindSpeed: 146,
        CAAttributeTypeWindDirection: 147,
        CAAttributeTypeComfortTemperature: 148,
        CAAttributeTypeEcoTemperature: 149,
        CAAttributeTypeReduceTemperature: 150,
        CAAttributeTypeProtectTemperature: 151,
        CAAttributeTypeInovaSystemTime: 152,
        CAAttributeTypeInovaCorrespondentProtocol: 153,
        CAAttributeTypeInovaCorrespondentID: 154,
        CAAttributeTypeInovaCorrespondentListen: 155,
        CAAttributeTypeInovaCorrespondentNumber: 156,
        CAAttributeTypeInovaCallCycleFireProtection: 157,
        CAAttributeTypeInovaCallCycleIntrusion: 158,
        CAAttributeTypeInovaCallCycleTechnicalProtect: 159,
        CAAttributeTypeInovaCallCycleFaults: 160,
        CAAttributeTypeInovaCallCycleDeterrence: 161,
        CAAttributeTypeInovaCallCyclePrealarm: 162,
        CAAttributeTypeInovaPSTNRings: 163,
        CAAttributeTypeInovaDoubleCallRings: 164,
        CAAttributeTypeInovaPIN: 165,
        CAAttributeTypeInovaPUK: 166,
        CAAttributeTypeInovaMainMediaSelection: 167,
        CAAttributeTypeRainFallLastHour: 168,
        CAAttributeTypeRainFallToday: 169,
        CAAttributeTypeIdentificationMode: 170,
        CAAttributeTypeButtonDoubleClick: 171,
        CAAttributeTypeSirenTriggerMode: 172,
        CAAttributeTypeUV: 173,
        CAAttributeTypeSlatSteps: 174,
        CAAttributeTypeEcoModeConfig: 175,
        CAAttributeTypeButtonLongRelease: 176,
        CAAttributeTypeVisualGong: 177,
        CAAttributeTypeAcousticGong: 178,
        CAAttributeTypeSurveillanceOnOff: 179,
        CAAttributeTypeStorageAlarm: 181,
        CAAttributeTypePowerSupplyAlarm: 182,
        CAAttributeTypeNetatmoHome: 183,
        CAAttributeTypeNetatmoPerson: 184,
        CAAttributeTypeNetatmoLastEventPersonId: 185,
        CAAttributeTypeNetatmoLastEventTime: 186,
        CAAttributeTypeNetatmoLastEventType: 187,
        CAAttributeTypeNetatmoLastEventIsKnownPerson: 188,
        CAAttributeTypeNetatmoLastEventIsArrival: 189,
        CAAttributeTypePresenceTimeout: 190,
        CAAttributeTypeKnownPersonPresence: 191,
        CAAttributeTypeUnknownPersonPresence: 192,
        CAAttributeTypeCurrent: 193,
        CAAttributeTypeFrequency: 194,
        CAAttributeTypeVoltage: 195,
        CAAttributeTypePresenceAlarmCancelationDelay: 196,
        CAAttributeTypePresenceAlarmDetectionDelay: 197,
        CAAttributeTypePresenceAlarmThreshold: 198,
        CAAttributeTypeNetatmoThermostatMode: 199,
        CAAttributeTypeNetatmoRelayBoilerConnected: 200,
        CAAttributeTypeNetatmoRelayMac: 201,
        CAAttributeTypeNetatmoThermostatModeTimeout: 202,
        CAAttributeTypeNetatmoThermostatNextChange: 203,
        CAAttributeTypeNetatmoThermostatPrograms: 204,
        CAAttributeTypeHomeeMode: 205,
        CAAttributeTypeColorWhite: 206,
        CAAttributeTypeMovementAlarm: 207,
        CAAttributeTypeMovementSensitivity: 208,
        CAAttributeTypeVibrationAlarm: 209,
        CAAttributeTypeVibrationSensitivity: 210,
        CAAttributeTypeAverageEnergyUse: 211,
        CAAttributeTypeBinaryInputMode: 212,
        CAAttributeTypeDeviceStatus: 213,
        CAAttributeTypeDeviceRemainingTime: 214,
        CAAttributeTypeDeviceStartTime: 215,
        CAAttributeTypeDeviceProgram: 216,
        CAAttributeTypeButtonPressed3Times: 223,
        CAAttributeTypeButtonPressed4Times: 224,
        CAAttributeTypeButtonPressed5Times: 225,
        CAAttributeTypeRepeaterMode: 226,
        CAAttributeTypeAutoOffTime: 227,
        CAAttributeTypeCO2Alarm: 228,
        CAAttributeTypeInputEndpointConfiguration: 229,
        CAAttributeTypeGustSpeed: 230,
        CAAttributeTypeGustDirection: 231,
        CAAttributeTypeLockState: 232,
        CAAttributeTypeAeotecSmartPlugLEDState: 233,
        CAAttributeTypeAlarmDuration: 234,
        CAAttributeTypeDewPoint: 235,
        CAAttributeTypeGesture: 236,
        CAAttributeTypeGestureSequenceLearningMode: 237,
        CAAttributeTypeGestureSequence: 238,
        CAAttributeTypeTotalCurrentEnergyUse: 239,
        CAAttributeTypeTotalAccumulatedEnergyUse: 240,
        CAAttributeTypeSunsetTime: 241,
        CAAttributeTypeSunriseTime: 242,
        CAAttributeTypeCurrentLocalWeatherCondition: 243,
        CAAttributeTypeCurrentLocalTemperature: 244,
        CAAttributeTypeCurrentLocalHumidity: 245,
        CAAttributeTypeForecastLocalWeatherCondition: 246,
        CAAttributeTypeForecastLocalTempMin: 247,
        CAAttributeTypeForecastLocalTempMax: 248,
        CAAttributeTypeArmed: 249,
        CAAttributeTypeFloodlight: 250,
        CAAttributeTypeHumanDetected: 251,
        CAAttributeTypeVehicleDetected: 252,
        CAAttributeTypeAnimalDetected: 253,
        CAAttributeTypeVacationMode: 254,
        CAAttributeTypeBlinkInterval: 255,
        CAAttributeTypeOtherMotionDetected: 256,
        CAAttributeTypeIRCodeNumber: 257,
        CAAttributeTypeHeatingMode: 258,
        CAAttributeTypeDisplayAutoOffTime: 259,
        CAAttributeTypeBacklight: 260,
        CAAttributeTypeOpenWindowDetectionSensibility: 261,
        CAAttributeTypeCurrentLocalWindSpeed: 262,
        CAAttributeTypeCurrentLocalGustSpeed: 263
    },
    CAAttributeState: {
        CAAttributeStateNone: 0,
        CAAttributeStateNormal: 1,
        CAAttributeStateWaitingForWakeUp: 2,
        CAAttributeStateWaitingForValue: 3,
        CAAttributeStateWaitingForAcknowledge: 4,
        CAAttributeStateInactive: 5,
        CAAttributeStateIgnored: 6,
        CAAttributeStateUnavailable: 7
    },
    CAAttributeChangedBy: {
        CAAttributeChangedByNone: 0,
        CAAttributeChangedByItself: 1,
        CAAttributeChangedByUser: 2,
        CAAttributeChangedByHomeegram: 3
    },
    CAAttributeBasedOn: {
        CAAttributeBasedOnEvents: 1,
        CAAttributeBasedOnInterval: 2,
        CAAttributeBasedOnPolling: 4
    },
    CAHomeegramState: {
        CAHomeegramStateNone: 0,
        CAHomeegramStateNormal: 1,
        CAHomeegramStateExecuting: 2,
        CAHomeegramStateNoTriggers: 3,
        CAHomeegramStateNoActions: 4
    },
    CAWarningCode: {
        CAWarningCodeCubeAdded: 100,
        CAWarningCodeCubeRemoved: 101,
        CAWarningCodeCubeIsMissing: 102,
        CAWarningCodeCubeInLearnMode: 103,
        CAWarningCodeCubeLearnModeStarted: 104,
        CAWarningCodeCubeLearnModeSuccessful: 105,
        CAWarningCodeCubeLearnModeTimeout: 106,
        CAWarningCodeCubeLearnModeNodeAlreadyAdded: 107,
        CAWarningCodeCubeLearnModeFailed: 108,
        CAWarningCodeCubeInRemoveMode: 109,
        CAWarningCodeCubeRemoveModeStarted: 110,
        CAWarningCodeCubeRemoveModeSuccessful: 111,
        CAWarningCodeCubeRemoveModeTimeout: 112,
        CAWarningCodeCubeRemoveModeNodeAlreadyDeleted: 113,
        CAWarningCodeCubeRemoveModeFailed: 114,
        CAWarningCodeCubeScannedNodes: 115,
        CAWarningCodeCubeUpdateInProgess: 116,
        CAWarningCodeCubeUpdateStarted: 117,
        CAWarningCodeCubeUpdateFinished: 118,
        CAWarningCodeCubeUpdateFailed: 119,
        CAWarningCodeCubeRemoveModeRequiresAction: 120,
        CAWarningCodeCubeRemoveModeCanceled: 121,
        CAWarningCodeCubeLearnModeCanceled: 122,
        CAWarningCodeCubeAuthorizationRequired: 123,
        CAWarningCodeCubeLearnModeInitializing: 124,
        CAWarningCodeCubeRemoveModeForbidden: 125,
        CAWarningCodeCubeResetStarted: 126,
        CAWarningCodeCubeResetSuccessful: 127,
        CAWarningCodeCubeResetFailed: 128,
        CAWarningCodeCubeResetTimeout: 129,
        CAWarningCodeCubeResetNotSupported: 130,
        CAWarningCodeCubeHealProgress: 131,
        CAWarningCodeNodeBadLinkQuality: 200,
        CAWarningCodeNodeIsMissing: 201,
        CAWarningCodeNodeWaterDetected: 202,
        CAWarningCodeNodeSmokeDetected: 203,
        CAWarningCodeNodeBatteryLow: 204,
        CAWarningCodeNodeLocked: 205,
        CAWarningCodeNodeNotCompatible: 206,
        CAWarningCodeNodeResetSuccessful: 207,
        CAWarningCodeNodeResetStarted: 208,
        CAWarningCodeNodeResetFailed: 209,
        CAWarningCodeNodeResetTimeout: 210,
        CAWarningCodeNodeWrongHVACMode: 211,
        CAWarningCodeNodeRangeError: 212,
        CAWarningCodeNodeBlocked: 213,
        CAWarningCodeNodeWrongAwayMode: 214,
        CAWarningCodeNodeResetCanceled: 215,
        CAWarningCodeNodeRemoveMissingStarted: 216,
        CAWarningCodeNodeRemoveMissingDone: 217,
        CAWarningCodeNodeCalibrationNeeded: 218,
        CAWarningCodeNodeValueOutOfRange: 219,
        CAWarningCodeSettingRemoteAccessActivated: 300,
        CAWarningCodeSettingRemoteAccessDeactivated: 301,
        CAWarningCodeSettingOnline: 302,
        CAWarningCodeSettingOffline: 303,
        CAWarningCodeSettingNetworkUninitialized: 304,
        CAWarningCodeSettingNetworkInitializing: 305,
        CAWarningCodeSettingNetworkInitialized: 306,
        CAWarningCodeUpdateAvailable: 400,
        CAWarningCodeUpdateDownloading: 401,
        CAWarningCodeUpdateInstalling: 402,
        CAWarningCodeUpdateInProgress: 403,
        CAWarningCodeUpdateSuccessful: 404,
        CAWarningCodeUpdateConnectionFailed: 405,
        CAWarningCodeUpdateDownloadFailed: 406,
        CAWarningCodeUpdateInstallationFailed: 407,
        CAWarningCodeUpdatePreparing: 408,
        CAWarningCodeNoUpdateAvailable: 409,
        CAWarningCodeUSBUpdateAvailable: 410,
        CAWarningCodeNoUSBUpdateAvailable: 411,
        CAWarningCodeUSBUpdateCanceled: 412,
        CAWarningCodeBackupAvailable: 450,
        CAWarningCodeBackupCreationFailed: 451,
        CAWarningCodeRestoreAvailable: 452,
        CAWarningCodeNoRestoreAvailable: 453,
        CAWarningCodeRestoreFailed: 454,
        CAWarningCodeRestoreRestarting: 455,
        CAWarningCodeRestoreCanceled: 456,
        CAWarningCodePermissionDenied: 500,
        CAWarningCodeTeachInForbidden: 501,
        CAWarningCodePermissionGranted: 502,
        CAWarningCodeVideocodeWrong: 503,
        CAWarningCodePasscodeWrong: 504,
        CAWarningCodeChangeVideocodeSuccessful: 505,
        CAWarningCodeChangePasscodeSuccessful: 506,
        CAWarningCodeChangeVideocodeFailed: 507,
        CAWarningCodeChangePasscodeFailed: 508,
        CAWarningCodeDeviceRemoved: 600,
        CAWarningCodeDeviceAdded: 601,
        CAWarningCodeUserRemoved: 700,
        CAWarningCodeAllUsersRemoved: 701,
        CAWarningCodeUserPasswordChangeRequired: 702,
        CAWarningCodeUserPasswordChangeFailed: 703,
        CAWarningCodeUserPasswordChangeSuccessful: 704,
        CAWarningCodeUserAlreadyExists: 705,
        CAWarningCodeGoogleAssistantSyncSuccess: 800,
        CAWarningCodeGoogleAssistantSyncError: 801,
        CAWarningCodeAppleHomeKitPairingSuccess: 802,
        CAWarningCodeAppleHomeKitPairingError: 803,
        CAWarningCodeHomeegramCouldNotDownloadTTS: 900,
        CAWarningCodeHomeegramTestResults: 901
    },
    CAErrorCode: {
        CAErrorCodeMissingParameter: 1,
        CAErrorCodeInvalidFormat: 2,
        CAErrorCodeInvalidPath: 3,
        CAErrorCodeInvalidVersion: 4,
        CAErrorCodeObjectNotFound: 5,
        CAErrorCodeInvalidResourceID: 6,
        CAErrorCodeInternalServerException: 7,
        CAErrorCodeTooManyParameters: 8,
        CAErrorCodeInvalidParameters: 9,
        CAErrorCodeConflictingParameters: 10
    },
    CAWLANMode: {
        CAWLANModeNone: 0,
        CAWLANModeHotspot: 1,
        CAWLANModeClient: 2,
        CAWLANModeBridge: 3
    },
    CACubeType: {
        none: 0,
        homeeZWave: 1,
        homeeZigBee: 2,
        homeeEnOcean: 3,
        homeeWMbus: 4,
        homeeHomematic: 5,
        hagerKNXRF: 6,
        hagerInova: 7,
        homeeBrain: 8,
        kameIOCube: 12,
        afrisoEnOcean: 150,
        ESTMKZWave: 151,
        PuMEnOcean: 152
    },
    CAUserRole: {
        CAUserRoleService: 1,
        CAUserRoleAdmin: 2,
        CAUserRoleStandard: 3,
        CAUserRoleLimited: 4,
        CAUserRoleAlexa: 5
    },
    CAUserType: {
        CAUserTypeNone: 0,
        CAUserTypeLocal: 1,
        CAUserTypeMyHager: 2
    },
    CATriggerType: {
        CATriggerTypeNone: 0,
        CATriggerTypeTime: 1,
        CATriggerTypeAttribute: 2,
        CATriggerTypeSwitch: 3,
        CATriggerTypeWebhook: 4,
        CATriggerTypeHomeegram: 5,
        CATriggerTypeCelestial: 6
    },
    CATriggerOperator: {
        CATriggerOperatorNone: 0,
        CATriggerOperatorRiseAbove: 1,
        CATriggerOperatorFallBelow: 2,
        CATriggerOperatorBecomeEqual: 3,
        CATriggerOperatorAnyChangeGreaterThan: 4
    },
    CATriggerHomeegramEvent: {
        CATriggerHomeegramEventNone: 0,
        CATriggerHomeegramEventEnabled: 1,
        CATriggerHomeegramEventDisabled: 2,
        CATriggerHomeegramEventPlayed: 3
    },
    CAConditionType: {
        CAConditionTypeNone: 0,
        CAConditionTypeTime: 1,
        CAConditionTypeAttribute: 2,
        CAConditionTypeHomeegram: 3,
        CAConditionTypeCelestial: 4
    },
    CAConditionOperator: {
        CAConditionOperatorNone: 0,
        CAConditionOperatorEqual: 1,
        CAConditionOperatorLessEqual: 2,
        CAConditionOperatorGreaterEqual: 3,
        CAConditionOperatorLessThan: 4,
        CAConditionOperatorGreaterThan: 5,
        CAConditionOperatorNotEqual: 6
    },
    CAConditionCheckMoment: {
        CAConditionCheckMomentNone: 0,
        CAConditionCheckMomentStart: 1,
        CAConditionCheckMomentEnd: 2,
        CAConditionCheckMomentStartAndEnd: 3
    },
    CAConditionHomeegramEvent: {
        CAConditionHomeegramEventNone: 0,
        CAConditionHomeegramEventEnabled: 1,
        CAConditionHomeegramEventDisabled: 2
    },
    CAActionType: {
        CAActionTypeNone: 0,
        CAActionTypeAttribute: 1,
        CAActionTypeTTS: 2,
        CAActionTypeNotification: 3,
        CAActionTypeGroup: 4,
        CAActionTypeWebhook: 5,
        CAActionTypeHomeegram: 6
    },
    CANotificationStyle: {
        CANotificationStyleNone: 0,
        CANotificationStylePush: 1,
        CANotificationStyleSMS: 2,
        CANotificationStyleEmail: 3
    },
    CAActionHomeegramEvent: {
        CAActionHomeegramEventNone: 0,
        CAActionHomeegramEventEnable: 1,
        CAActionHomeegramEventDisable: 2,
        CAActionHomeegramEventPlay: 3
    },
    CACelestialType: {
        CACelestialTypeSunrise: 1,
        CACelestialTypeSunset: 2
    },
    CATimeOfDay: {
        Day: 1,
        Night: 2,
        Morning: 3,
        Noon: 4,
        Afternoon: 5,
        Evening: 6,
        Midnight: 7
    },
    CADeviceType: {
        CADeviceTypeNone: 0,
        CADeviceTypePhone: 1,
        CADeviceTypeTablet: 2,
        CADeviceTypeDesktop: 3,
        CADeviceTypeBrowser: 4
    },
    CADeviceOS: {
        CADeviceOSNone: 0,
        CADeviceOSiOS: 1,
        CADeviceOSAndroid: 2,
        CADeviceOSWindows: 3,
        CADeviceOSWindowsPhone: 4,
        CADeviceOSLinux: 5,
        CADeviceOSMacOS: 6
    },
    CADeviceApp: {
        CADeviceAppNone: 0,
        CADeviceAppHomee: 1,
        CADeviceAppAFRISOhome: 2,
        CADeviceAppESTMK: 3,
        CADeviceAppCoviva: 4,
        CADeviceAppPuM: 5,
        CADeviceAppCovivaBerker: 6,
        CADeviceAppNVB: 7,
        CADeviceAppHomeeDev: 101,
        CADeviceAppAFRISOhomeDev: 102,
        CADeviceAppESTMKDev: 103,
        CADeviceAppCovivaDev: 104,
        CADeviceAppPuMDev: 105,
        CADeviceAppCovivaBerkerDev: 106,
        CADeviceAppNVBDev: 107
    },
    CAAttributeHistoryError: {
        CAAttributeHistoryErrorTimeout: 1,
        CAAttributeHistoryErrorNoConnection: 2,
        CAAttributeHistoryErrorWrongHostname: 3,
        CAAttributeHistoryErrorDisabled: 4,
        CAAttributeHistoryErrorUnknownCurlCode: 5,
        CAAttributeHistoryErrorEmpty: 6
    },
    CAGroupCategory: {
        None: 0,
        Light: 10,
        Climate: 11,
        DoorWindow: 12,
        Alarm: 13,
        Energy: 14,
        Heating: 15,
        Shutter: 16
    },
    NotificationColor: {
        Grey: 0,
        Green: 1,
        Orange: 2,
        Red: 3,
        DarkRed: 4
    },
    NotificationIcon: {
        Undefined: 0,
        Connected: 1,
        Connecting: 2,
        Connect: 3,
        Close: 4
    },
    LogicType: {
        Trigger: 0,
        Condition: 1
    },
    AttributeElementType: {
        Attribute: 0,
        HomeeMode: 1,
        Weather: 2
    },
    TimeTriggerType: {
        Once: 0,
        Weekly: 1,
        Expert: 2,
        Daily: 3
    },
    TimeConditionType: {
        Once: 0,
        Weekly: 1,
        Expert: 2,
        Daily: 3
    },
    TimeConditionDailyType: {
        WholeDay: 0,
        TimeSpan: 1
    },
    TimeTriggerStart: {
        SpecificTime: 0,
        Now: 1
    },
    TimeTriggerEnd: {
        SpecificTime: 0,
        AfterRepeats: 1,
        OpenEnd: 2
    },
    NotificationActionReceivers: {
        All: 0,
        SpecificUsers: 1
    },
    HomeeMode: {
        Home: 0,
        Sleeping: 1,
        Away: 2,
        Vacation: 3
    },
    DashboardGreeting: {
        General: 0,
        Morning: 1,
        Forenoon: 2,
        Noon: 3,
        Afternoon: 4,
        Evening: 5,
        Night: 6,
        Midnight: 7
    },
    HomeeUpdate: {
        Starting: 0,
        Downloading: 1,
        ErrorDownloading: 2,
        Prepairing: 3,
        ErrorPrepairing: 4,
        Installing: 5,
        ErrorInstalling: 6,
        Successful: 7
    },
    Service: {
        AppleHomeKit: 5,
        GoogleAssistant: 6,
        AmazonAlexa: 7
    },
    WidgetType: {
        Node: 0,
        Homeegram: 1,
        Group: 2,
        SmartWidgetLight: 3,
        SmartWidgetClimate: 4,
        SmartWidgetDoorWindow: 5,
        SmartWidgetAlarm: 6,
        SmartWidgetEnergy: 7,
        SmartWidgetHeating: 8,
        SmartWidgetShutter: 9,
        Weather: 10
    },
    Gestures: {
        Empty: 0,
        Up: 1,
        Down: 2,
        Left: 3,
        Right: 4
    }
}

exports.getHAPTypeByAttributeType = function (attributeType) {
    var HAPType = ''

    switch (attributeType) {
        case homeeEnums.CAAttributeType.CAAttributeTypeOnOff:
        case homeeEnums.CAAttributeType.CAAttributeTypeSiren:
            HAPType = 'OnOff'
            break

        case homeeEnums.CAAttributeTypeCurrentEnergyUse:
        case homeeEnums.CAAttributeTypeAccumulatedEnergyUse:
        case homeeEnums.CAAttributeTypeSetEnergyConsumption:
        case homeeEnums.CAAttributeTypeAverageEnergyUse:
            HAPType = 'Power'
            break

        case homeeEnums.CAAttributeType.CAAttributeTypeDimmingLevel:
            HAPType = 'Brightness'
            break

        case homeeEnums.CAAttributeType.CAAttributeTypeColorTemperature:
            HAPType = 'ColorTemperature'
            break

        case homeeEnums.CAAttributeType.CAAttributeTypeTemperature:
            HAPType = 'CurrentTemperature'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeTargetTemperature:
            HAPType = 'TargetTemperature'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeRelativeHumidity:
            HAPType = 'CurrentRelativeHumidity'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeBatteryLevel:
            HAPType = 'BatteryLevel'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeWindowPosition:
        case homeeEnums.CAAttributeType.CAAttributeTypeOpenClose:
            HAPType = 'ContactSensorState'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeBrightness:
            HAPType = 'CurrentAmbientLightLevel'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeFloodAlarm:
        case homeeEnums.CAAttributeType.CAAttributeTypeLeakAlarm:
        case homeeEnums.CAAttributeType.CAAttributeTypeOilAlarm:
        case homeeEnums.CAAttributeType.CAAttributeTypeWaterAlarm:
            HAPType = 'LeakDetected'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypePosition:
            HAPType = 'CurrentPosition'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeSmokeAlarm:
            HAPType = 'SmokeDetected'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeCO2Level:
            HAPType = 'CarbonDioxideLevel'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeMotionAlarm:
        case homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarm:
            HAPType = 'MotionDetected'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypePresenceAlarm:
            HAPType = 'OccupancyDetected'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeTamperAlarm:
            HAPType = 'StatusTampered'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeBatteryLowAlarm:
            HAPType = 'StatusLowBattery'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeCOAlarm:
            HAPType = 'CarbonMonoxideDetected'
            break
        case homeeEnums.CAAttributeType.CAAttributeTypeMalfunctionAlarm:
            HAPType = 'StatusFault'
            break
    }

    return HAPType
}

exports.getAccessoryTypeByNodeProfile = function (nodeProfile) {
    var accessoryType

    switch (nodeProfile) {
        case homeeEnums.CANodeProfile.CANodeProfileOnOffPlug:
        case homeeEnums.CANodeProfile.CANodeProfileMeteringSwitch:
        case homeeEnums.CANodeProfile.CANodeProfileMeteringPlug:
        case homeeEnums.CANodeProfile.CANodeProfileOnOffSwitch:
        case homeeEnums.CANodeProfile.CANodeProfileOnOffSwitchWithBinaryInput:
        case homeeEnums.CANodeProfile.CANodeProfileWatchDogWithPressureAndTemperatures:
        case homeeEnums.CANodeProfile.CANodeProfileSiren:
            accessoryType = 'Switch'
            break
        case homeeEnums.CANodeProfile.CANodeProfileDoubleOnOffSwitch:
        case homeeEnums.CANodeProfile.CANodeProfileDoubleOnOffPlug:
        case homeeEnums.CANodeProfile.CANodeProfileDoubleMeteringSwitch:
            accessoryType = 'DoubleSwitch'
            break
        case homeeEnums.CANodeProfile.CANodeProfileDimmableColorLight:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableExtendedColorLight:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableColorTemperatureLight:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableLight:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableLightWithBrightnessAndPresenceSensor:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableRGBWLight:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableColorMeteringPlug:
        case homeeEnums.CANodeProfile.CANodeProfileDimmablePlug:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableSwitch:
        case homeeEnums.CANodeProfile.CANodeProfileDimmableMeteringSwitch:
            accessoryType = 'Lightbulb'
            break
        case homeeEnums.CANodeProfile.CANodeProfileBrightnessSensor:
            accessoryType = 'LightSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileOpenCloseSensor:
        case homeeEnums.CANodeProfile.CANodeProfileOpenCloseAndTemperatureSensor:
        case homeeEnums.CANodeProfile
            .CANodeProfileOpenCloseWithTemperatureAndBrightnessSensor:
            accessoryType = 'ContactSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileWindowHandle:
            accessoryType = 'Window'
            break
        case homeeEnums.CANodeProfile.CANodeProfileShutterPositionSwitch:
        case homeeEnums.CANodeProfile.CANodeProfileElectricMotorMeteringSwitch:
        case homeeEnums.CANodeProfile
            .CANodeProfileElectricMotorMeteringSwitchWithoutSlatPosition:
            accessoryType = 'WindowCovering'
            break
        case homeeEnums.CANodeProfile.CANodeProfileTemperatureAndHumiditySensor:
        case homeeEnums.CANodeProfile.CANodeProfileTemperatureSensor:
        case homeeEnums.CANodeProfile.CANodeProfileNetatmoMainModule:
        case homeeEnums.CANodeProfile.CANodeProfileNetatmoOutdoorModule:
        case homeeEnums.CANodeProfile.CANodeProfileNetatmoIndoorModule:
            accessoryType = 'TemperatureSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileCO2Sensor:
            accessoryType = 'CarbonDioxideSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileCODetector:
            accessoryType = 'CarbonMonoxideSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileRoomThermostat:
        case homeeEnums.CANodeProfile.CANodeProfileRoomThermostatWithHumiditySensor:
        case homeeEnums.CANodeProfile.CANodeProfileRadiatorThermostat:
        case homeeEnums.CANodeProfile.CANodeProfileCosiThermChannel:
        case homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithCooling:
        case homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithHeating:
        case homeeEnums.CANodeProfile.CANodeProfileNestThermostatWithHeatingAndCooling:
        case homeeEnums.CANodeProfile.CANodeProfileNetatmoThermostat:
            accessoryType = 'Thermostat'
            break
        case homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithTemperatureBrightnessAndHumiditySensor:
        case homeeEnums.CANodeProfile.CANodeProfileMotionDetector:
        case homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithTemperatureAndBrightnessSensor:
        case homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithOpenCloseTemperatureAndBrightnessSensor:
        case homeeEnums.CANodeProfile.CANodeProfileMotionDetectorWithBrightness:
            accessoryType = 'MotionSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfilePresenceDetector:
        case homeeEnums.CANodeProfile.CANodeProfilePresenceDetectorWithTemperatureAndBrightnessSensor:
            accessoryType = 'OccupancySensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileSmokeDetector:
        case homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorWithTemperatureSensor:
        case homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorAndCODetector:
        case homeeEnums.CANodeProfile.CANodeProfileSmokeDetectorAndSiren:
            accessoryType = 'SmokeSensor'
            break
        case homeeEnums.CANodeProfile.CANodeProfileFloodDetector:
        case homeeEnums.CANodeProfile.CANodeProfileFloodDetectorWithTemperatureSensor:
        case homeeEnums.CANodeProfile.CANodeProfileOWU:
        case homeeEnums.CANodeProfile.CANodeProfileOWWG3:
        case homeeEnums.CANodeProfile.CANodeProfileLAG:
        case homeeEnums.CANodeProfile.CANodeProfileEurovac:
        case homeeEnums.CANodeProfile.CANodeProfileEuropress:
        case homeeEnums.CANodeProfile.CANodeProfileFloodDetectorWithTemperatureAndHumiditySensor:
            accessoryType = 'LeakSensor'
            break
    }

    return accessoryType
}
