# Send_SMS


This package is intended to consume SMS Gateway-API as Node module. Which will help you to use to send auto generated otp with custom message.


### Code Set-up:

1. Install the NPM module
******************************************
npm install npm-sendmsg --save
******************************************


2. Require the package in your code.
******************************************
const SendMsg = require('npm-sendmsg');
******************************************


3. Setup your configuration from appConfig file with provided username and password
**************************************************************************
const sendMsg = new sendMsg('username', 'password', 'routId', 'format' 'messageTemplate');
**************************************************************************
NOTE BY:- 'messageTemplate' is optional. For custom message.


**************************************************************************
const sendMsg = new sendMsg('username', 'password', 'routId', 'format');
**************************************************************************
That's all, your are ready to use


### Requests

You now have the send, retry and verify otp via following methods.
**************************************************************************
sendMsg.send(contactNumber, senderId, otp, routeId, format, callback); //otp is optional if not sent it'll be generated automatically
//routeId provided by smsw.co.in service provided
// format of request and response for api
**************************************************************************

### Note:

In `callback` function you'll get two parameters but you have to always listen for second param instead of direct error object.
Error object sample code
**************************************************************************
{"type":"error","message":"ERROR_MESSAGE"}
**************************************************************************


### Usage:

To send OTP, without optional parameters
**************************************************************************
sendMsg.send("9711998846", "ANKIND", function (error, data) {
  console.log(data);
});
**************************************************************************

To send OTP, with optional parameters
***********************************************************************************
sendMsg.send("9711998846", "ANKIND", "4635", function (error, data) {
  console.log(data);
});
***********************************************************************************

If you want to set custom expiry of OTP verification  
****************************************************************************************
sendMsg.setOtpExpiry('60'); //in minutes
****************************************************************************************


### Options:

By default sendMsg uses default message template, but custom message template can also set in constructor like
************************************************************************************************************************************
const SendMsg = require('npm-sendmsg');
const sendMsg = new SendMsg( 'username', 'password', 'routId', 'format' 'Your otp is {{otp}}.For security reasons, DO NOT share this OTP with anyone');
************************************************************************************************************************************

`{{otp}}` expression is used to inject generated otp in message.

### Licence:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
