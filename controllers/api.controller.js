'use strict';

const gcm = require('node-gcm');
const apn = require('apn');
const fs = require('fs');
const cert = fs.readFileSync('keys/cert.pem');
const key = fs.readFileSync('keys/key.pem');

function send(req, res) {

  let androidTokens = res.locals.androidTokens;
  let iosTokens = res.locals.iosTokens;

  if(androidTokens) {
    GCM();
  }

  if(iosTokens) {
    APN();
  }

  function GCM() {

    let message = new gcm.Message();
    message.addNotification({
      title: req.body.title,
      body: req.body.message
    });

    let sender = new gcm.Sender(process.env.SENDER_KEY);
    let regTokens = androidTokens;

    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err) console.error(err);
        else    console.log(response);
    });

  };

  function APN() {

    let cert = fs.readFileSync('keys/cert.pem');
    let key = fs.readFileSync('keys/key.pem');

    let connect_option = {
        key: key,
        cert: cert,
        production: true,
        maxConnections: 5,
        fastMode: true,
        buffersNotifications: true,
        passphrase: process.env.APN_PASSWORD
    };

    let pushCallbackError = function(errorNum, notification) {
        inspect('Push Error is: ' + errorNum);
    };

    let feedback = new apn.Feedback(connect_option);
    feedback.on("feedback", function(devices) {
        devices.forEach(function(item) {});
    });

    let connection = new apn.Connection(connect_option);

    connection.on("connected", function() {
        console.log("Connected");
    });

    connection.on("completed", function() {
        console.log("Completed!");

    });

    connection.on("transmitted", function(notification) {
        console.log("Transmitted: ", notification);
        // res.sendStatus(201);
    });

    connection.on("socketError", function(err) {
        console.log("Socket error", err.message);
    });

    connection.on('transmissionError', function(err) {
        console.log("Transmission Error", err);
        // res.sendStatus(500)
    });

    connection.on("error", function(err) {
        console.log("Standard error", err);
    });

    let notification = new apn.Notification();

    notification.alert = req.body.message;
    notification.payload = req.body.payload;
    notification.badge = req.body.badge;
    if(req.body.sound) {
      notification.sound = "default";
    } else {
      notification.sound = "";
    }

    console.log(notification);

    connection.pushNotification(notification, iosTokens);

    res.sendStatus(201);

  }

};

module.exports = send;
