 'use strict';
 
//Host Name smiothub.azure-devices.net
//Connection string HostName=smiothub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=UY21e9zlEKXMJwtddEq9/rF5aupNxg6eNWJxkDQ5kVU=
//Device ID: myIoTSensor
//Device key: wGnWGTkMyfz+FUEkms2AaapxmMLmdDu7Vr/uUb+nPIU=
 
 
 var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
 var Message = require('azure-iot-device').Message;
 
 var connectionString = '<<IoT Hub connection string>>';
 var client = clientFromConnectionString(connectionString);

 function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }

 var connectCallback = function (err) {
   if (err) {
     console.log('Could not connect: ' + err);
   } else {
     console.log('Client connected');

     // Create a message and send it to the IoT Hub every second
     setInterval(function(){
         var windSpeed = 8 + (Math.random() * 4);
		 var date = require('date-and-time');
		// var now = new Date();
		 var sensorTime = date.format(new Date(), 'YYYY/MM/DD');
		 var sensorDate = date.format(new Date(), 'hh:mm A [GMT]Z');
		 var data = JSON.stringify({ deviceId: 'myIoTSensor', windSpeed: windSpeed, sensorTime: sensorTime, sensorDate: sensorDate});
         var message = new Message(data);
         console.log("Sending message: " + message.getData());
         client.sendEvent(message, printResultFor('send'));
     }, 1000);
   }
 };
 
  client.open(connectCallback);


 
