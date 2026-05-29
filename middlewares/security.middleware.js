const helmet =
require('helmet');

const xss =
require('xss-clean');

const hpp =
require('hpp');



const securityMiddleware = [

  helmet(),

  xss(),

  hpp(),

];



module.exports =
securityMiddleware;