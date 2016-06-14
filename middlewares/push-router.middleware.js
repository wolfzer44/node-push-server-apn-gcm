'use strict';

function pushRouter (req, res, next) {

  // console.log(req.body.devices);
  let devices = req.body.devices;

  function isAndroid(value) {
    return value.token.length > 64;
  }

  function isIOS(value) {
    return value.token.length === 64;
  }

  let onlyTokensAndroid = devices.filter(isAndroid);
  let onlyTokensIOS = devices.filter(isIOS);

  let android = onlyTokensAndroid.map(function(token) {
    return token.token;
  });

  let ios = onlyTokensIOS.map(function(token) {
    return token.token;
  })

  if(android.length >= 1) {
      res.locals.androidTokens = android;
  }

  if(ios.length >= 1) {
      res.locals.iosTokens = ios;
  }

  next();

};

module.exports = pushRouter;
