/**
 * Helpers file - to provide Hashing for various tasks
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const querystring = require('querystring');
const https = require('https'); // Function to craft and send https request

// Container for helpers 
let helpers = {};

/**
 * Takes in a string and returns a SHA-256 hashing of that string
 * @param string inputString
 * @returns string - SHA256
 */
helpers.hash = (str)=>{
    if(typeof(str) == 'string' && str.length > 0) {
        // hashing with sha256
        console.log('config file is: ', config);
        const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hash;
    }else {
        return false;
    }
};

/**
 * Parse a JSON string to an object in all cases, without throwing
 * @param string buffer
 * @returns Object any
 */
helpers.parseJsonToObject = (inputBuffer)=>{
    try{
        const obj = JSON.parse(inputBuffer);
        return obj;
    }catch(error){
        // console.log('Error parsing data: ',error);
        return {};
    }
};

/**
 * Create a Random String based on the length provided
 * @param number strLength 
 * @returns string random-string
 */
helpers.createRandomString = (strLength)=>{
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
        const possibleCharacters = 'abcdfefghijklmnopqrstuvwxyz0123456789';
        //Start preparing the randomString;
        let tempStr = '';
        for(let i = 1; i <= strLength; i++){
            //Get a randomString from possibleCharacters
            randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()*possibleCharacters.length));
            //Append to tempStr
            tempStr += randomCharacter;
        }
        return tempStr;
    } else {
        return false;
    }
};

/**
 * Use Twilio API to send SMS
 * @param number phone number
 * @param string message string
 * @param function callback
 */
helpers.sendTwilioSms = (phone, msg, callback)=>{
    // Validate the parameters
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg) == 'string' && msg.trim().length > 10 && msg.trim().length <=1600 ? msg.trim() : false;
    if (phone && msg) {
        // Configure the request payload to twilio
        const payload = {
            'From': config.twilio.fromPhone,
            'To' : `+91${phnoe}`,
            'Body': msg
        };

        // Stringify the request payload
        // We will use the querystring module instead of JSON.stringify
        // We need the payload type to form-urlencoded
        const stringPayload = querystring.stringify(payload);
        const requestDetails = {
            'protocol':'https:',
            'hostname':'api.twilio.com',
            'method':'POST',
            'path':`/2010-04-01/Accounts/${config.twilio.acountSid}/Messages.json`,
            'auth':`${config.twilio.accountSid}:${config.twilio.authToken}`,
            'headers':{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };

        // Instantiate the requestObj
        const req = https.request(requestDetails, (res)=>{
            const status = res.statusCode;
            // Callback successfully if the request went through
            if (status == 200 || status == 201) {
                callback(status);
            } else {
                callback(status, {'Error':'Twilio request'});        
            }
        });
        // Bind to the error event so it doesnt get thrown
        req.on('error', (e)=>{
            callback(500, {'Error':e});
        });

        // Add the payload
        req.write(stringPayload);

        // Send the request
        req.end();

    } else {    
        callback(400, {'Error':'Given parameters are missing or invalid'});
    }
};


// export the module
module.exports = helpers;