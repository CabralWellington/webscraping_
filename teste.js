var moment = require('moment'); // require
var CurrentDate = moment();
console.log(moment().format("HH:mm"));
console.log(moment().weekday());

if(moment().format("HH:mm")>="16:00" && moment().format("HH:mm")<="17:37" ){
  console.log("Terça")
}else{
  console.log("não é terça")
}