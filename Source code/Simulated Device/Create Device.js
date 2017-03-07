// Creates a device identity and associated security key to connect your simulated device app
// Run following command before execte this script
// npm init
// npm install azure-iothub --save


'use strict';

var iothub = require('azure-iothub');

//replace the placeholder value with the IoT Hub connection string for the hub';
var connectionString = '<<IoT Hub connection string>>';

var registry = iothub.Registry.fromConnectionString(connectionString);
var device = new iothub.Device(null);
 
 
 //Put device id to create here';
 device.deviceId = 'myFirstNodeDevice';

 registry.create(device, function(err, deviceInfo, res) {
   if (err) {
     registry.get(device.deviceId, printDeviceInfo);
   }
   if (deviceInfo) {
     printDeviceInfo(err, deviceInfo, res)
   }
 });

 
 
 //Take note on Device Key';
 function printDeviceInfo(err, deviceInfo, res) {
   if (deviceInfo) {
     console.log('Device ID: ' + deviceInfo.deviceId);
     console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
   }
 }