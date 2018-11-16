'strict';
const rn = require('random-number');

 /**
  * @author Ankush Khotpal
  * @description Creates a new otp generation instance
  * @param {integer} to set minimum starting number to generate otp
  * @param {intiger} to set maximum number
  */

function otp_num(MIN, MAX) {
    var options = {
        min: MIN,
        max: MAX,
        integer: true
    }
    var num = rn(options);
    return num;
}


module.exports = {
    otp_num: otp_num,
};
