const http = require('http');

const config = require('../server/config/config');
const userCtrl = require('../server/controllers/user.controller');
require('../server/config/mongoose');

for (sysAcc of [config.sysAccAdmin, config.sysAccTest]) {
  console.log('>> Adding ', sysAcc);
  userCtrl.insert(sysAcc).then((doc) => {
    console.log('-> Insertion result: ', doc);
  }, (rejection) => {
    console.error('!!! Error on insertion:\n', rejection);
  });
}