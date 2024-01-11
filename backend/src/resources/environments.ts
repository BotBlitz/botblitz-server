
var env='development';
process.argv.forEach(function (val, index, array) {
    var arg = val.split("=");
    if (arg.length > 0) {
        if (arg[0] === 'env') {
          env = arg[1]
        }
    }
  });
  
  var propertiesReader = require('properties-reader');
  export const environment = propertiesReader('./src/resources/'+ env + '.properties')
  
  