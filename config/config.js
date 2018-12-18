// Local Deployment 
/*exports.keyrock = "http://viva-smartsdk.duckdns.org:8001"
exports.mysql = {
  host : '200.23.5.142',
  db : 'smartsdksecurity',
  user : 'cenidet',
  password : 'Cenidet2017'
}
exports.context = 'http://35.185.120.11:1026/v2';
exports.crate = 'http://35.185.120.11:4200';
*/

// Docker Deployment 
exports.keyrock = "http://" + process.env.KEYROCK + ":" + process.env.KEYSTONE_PORT
exports.mysql  = {
  host : process.env.MYSQL_HOST,
  db : process.env.MYSQL_DB,
  user : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
};
exports.context = "http://"+ process.env.ORION + ":1026/v2"
exports.crate = process.env.CRATEDB + ":4200"
