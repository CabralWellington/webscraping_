var moment = require('moment'); // require
var CurrentDate = moment();
console.log(moment().format("HH:mm"));
console.log(moment().weekday());

if(moment().weekday()=="21"){
  console.log("Terça")
}else{
  console.log("não é terça")
}