"use strict";

let otpnum = require('./utility/otpGenerator.js');
let send_request = require('./utility/send_request.js')

class SendMsg {

    /**
     * * @author Ankush Khotpal
     * Set the OTP expiry minutes for SMSW api call
     */
    setOtpExpiry(otp_expiry) {
        this.otp_expiry = otp_expiry;
        return;
    }

    /**
     * Returns the 4 digit otp
     * @returns {integer} 4 digit otp
     */
    static generateOtp() {
        return otpnum.otp_num(1000, 9000);
    }

    /**
     * Send Otp to given mobile number
     * @param {string} contactNumber receiver's mobile number along with country code
     * @param {string} senderId
     * @param {string, optional} otp
     * @param {string} routeId (provided by SMSW.co.in)
     * @param {string} format (json | text)
     * Return promise if no callback is passed and promises available
     */
    send(contactNumber, senderId, otp, routeId, format, callback) {
        if (typeof otp === 'function') {
            callback = otp;
            otp = SendMsg.generateOtp()
        }
        let args = {
            username: this.username,
            password: this.password,
            sender: senderId,
            to: contactNumber,
            otp: otp,
            message: this.messageTemplate.replace('{{otp}}', otp),
            route_id: routeId,
            format: format,
            otp_expiry: this.otp_expiry
        };
        return send_request.sendRequest('get', 'index.php', args, callback);
    }

}

module.exports = SendMsg;
