"use strict";


let request = require('request');

let otpnum = require('./utility/otpGenerator.js');

class SendMsg {

    /**
     * @author Ankush Khotpal
     * @description Creates a new SendMsg instance
     * @param {string} SetURL for SMSW.co.in (http://smsw.co.in/API/WebSMS/Http/v1.0a/)
     * @param {string} username for SMSW.co.in
     * @param {string} password for SMSW.co.in
     * @param {string, optional} messageTemplate
     */
    constructor(url, username, password, messageTemplate) {
        this.setURL = url;
        this.username = username;
        this.password = password;
        if (messageTemplate) {
            this.messageTemplate = messageTemplate;
        } else {
            this.messageTemplate = "Your otp is {{otp}}. For security reasons, DO NOT share this OTP with anyone";
        }
        this.otp_expiry = 1440; //1 Day =1440 minutes
    }

    /**
     * Returns the base URL for SMSW api call
     * @returns {string} Base URL for SMSW api call
     */
    static getBaseURL() {
        return this.setURL;
        // return "http://smsw.co.in/API/WebSMS/Http/v1.0a/";
    }

    /**
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
      * @author Ankush Khotpal
      * @description Creates a new SendMsg instance
      * @param {string} request method for SMSW.co.in
      * @param {string} url end path for SMSW.co.in
      * @param {string} params for request for SMSW.co.in
      * 
      */
     static sendRequest(method, path, params, callback) {

         if (typeof params === 'function') {
             callback = params;
             params = {};
         }
         // Return promise if no callback is passed and promises available
         else if (callback === undefined && this.allow_promise) {
             promise = true;
         }

         let options = {
             method: method,
             url: SendMsg.getBaseURL() + path
         };

         if (method === 'get') {
             options.qs = params;
         }

         // Pass form data if post
         if (method === 'post') {
             let formKey = 'form';

             if (typeof params.media !== 'undefined') {
                 formKey = 'formData';
             }
             options[formKey] = params;
         }

         request(options, function (error, response, data) {
             // request error
             if (error) {
                 return callback(error, data);
             }

             // JSON parse error or empty strings
             try {
                 // An empty string is a valid response
                 if (data === '') {
                     data = {};
                 } else {
                     data = JSON.parse(data);
                 }
             } catch (parseError) {
                 return callback(
                     new Error('JSON parseError with HTTP Status: ' + response.statusCode + ' ' + response.statusMessage),
                     data
                 );
             }


             // response object errors
             // This should return an error object not an array of errors
             if (data.errors !== undefined) {
                 return callback(data.errors, data);
             }

             // status code errors
             if (response.statusCode < 200 || response.statusCode > 299) {
                 return callback(
                     new Error('HTTP Error: ' + response.statusCode + ' ' + response.statusMessage),
                     data
                 );
             }
             // no errors
             callback(null, data);
         });
     }


    /**
     * Send Otp or Message to given mobile number
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
        return SendMsg.sendRequest('get', 'index.php', args, callback);
    }
}

module.exports = SendMsg;
