/**
 * Helpers file - to provide Hashing for various tasks
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config');

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


// export the module
module.exports = helpers;