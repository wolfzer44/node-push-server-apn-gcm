'use strict';
const os = require('os');
const jwt = require('jsonwebtoken');

function origin(req, res, next) {

  const reqIp = req.get('host').split(':')[0];
  const token = req.header.Authorization;
  const listInterfaces = os.networkInterfaces().en1;
  const ipv4 = listInterfaces
    .filter(list => list.family === "IPv4")
    .map(list => list.address)
    .reduce(address => address);

  if(reqIp === ipv4) {
    next();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(!err) {
        next();
      } else {
        res.sendStatus(401);
      }
    });
  }

}

module.exports = origin;
