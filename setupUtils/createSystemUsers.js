const http = require('http');

const config = require('../server/config/config');
const userCtrl = require('../server/controllers/user.controller');
require('../server/config/mongoose');

// for (sysAcc of [config.sysAccAdmin, config.sysAccTest]) {
//   console.log('>> Adding ', sysAcc);
//   userCtrl.insert(sysAcc).then((doc) => {
//     console.log('-> Insertion result: ', doc);
//     userCtrl.assignRole(doc._id, 'system').then(doc => console.log(`-> Adding role "system" to ${sysAcc.username}: `, doc));
//     if (sysAcc.username === 'admin') {
//       userCtrl.assignRole(doc._id, 'admin').then(doc => console.log(`-> Adding role "admin" to ${sysAcc.username}: `, doc));
//     }
//   }, (rejection) => {
//     console.error('!!! Error on insertion:\n', rejection);
//   });
// }


console.log('>> Adding ', config.sysAccAdmin);
userCtrl.insert(config.sysAccAdmin).then(doc => {
  console.log('-> Insertion result: ', doc);
  userCtrl.assignRole(doc._id, 'system').then(doc => console.log(`-> Adding role "system" to admin: `, doc));
  userCtrl.assignRole(doc._id, 'admin').then(doc => console.log(`-> Adding role "admin" to admin: `, doc));
}, (rejection) => {
  console.error('!!! Error on insertion:\n', rejection);
});

console.log('>> Adding ', config.sysAccTest);
userCtrl.insert(config.sysAccTest).then(doc => {
  console.log('-> Insertion result: ', doc);
  userCtrl.assignRole(doc._id, 'system').then(doc => console.log(`-> Adding role "system" to test: `, doc));
  userCtrl.assignRole(doc._id, 'verified').then(doc => console.log(`-> Adding role "verified" to test: `, doc));
}, (rejection) => {
  console.error('!!! Error on insertion:\n', rejection);
});
