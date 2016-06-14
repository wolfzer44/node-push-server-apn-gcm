'use strict';

function pushRouter (req, res, next) {

  if(!req.body.devices) {
    return res.sendStatus(500);
  }

  function isAndroid(value) {
    return value.os.toLowerCase() === "android";
  }

  function isIOS(value) {
    return value.os.toLowerCase() === "ios";
  }

  let onlyTokensAndroid = sample.filter(isAndroid);
  let onlyTokensIOS = sample.filter(isIOS);

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
