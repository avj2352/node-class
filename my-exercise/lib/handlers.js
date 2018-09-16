/**
 * Request Handlers
 * Learning Routers - Most important file
 */

//  Dependencies
const _data = require('./data'); // Require our file storage data
const helpers = require('./helpers');
const config = require('./config');

// Define the handlers
let handlers = {};

// Ping handlers
handlers.ping = (data,callback)=>{
    callback(200);
};

handlers.sample = (data,callback)=>{
    // Step 1: Callback a HTTP status code and a payload - which is an object
    callback(406, {'name': 'sample handler'});
    
};

// Handle 404 - not found
handlers.notFound = (data, callback)=>{
    // Step 1: Callback a HTTP status code and a payload - which is an object
    callback(404);
};

//Route definition - USERS
handlers.users = (data,callback)=>{
    // for this route we wont accept any other methods other than below
    const acceptableMethods = ['post','get','put','delete'];
    if (acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback); //Router is Invoking EVERYTHING HERE !!
    } else {
        callback(405); //HTTP status for method not allowed
    }
    
};

//Route definition - TOKENS
handlers.tokens = (data,callback)=>{
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data,callback); // Call by passing the http-servers data and chosenHandler function
    }else { 
        callback(405); //HTTP - method not allowed
    }
};


//Route definition - CHECKS
handlers.checks = (data,callback)=>{
    console.log('Inside the TOKEN router');
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._checks[data.method](data,callback); // Call by passing the http-servers data and chosenHandler function
    }else { 
        callback(405); //HTTP - method not allowed
    }
};

//Container for user submethod
handlers._users = {};
handlers._tokens = {};
handlers._checks = {};


/**
 * User SERVICE - CRUD
*/

// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = (data,callback)=>{
    //Check that all required fields are filled out
    console.log('Payload is: ', data.payload);
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    
    if(firstName && lastName && phone && password && tosAgreement){
        // Make sure that the user doesn't already exist
        // We are going to read from the user's data
        _data.read('users',phone,(err,data)=>{
            if(err){
                //Hash the password using the crypto module within Node
                const hashPassword = helpers.hash(password);
                if(hashPassword){
                    //Create the user object
                let userObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phone': phone,
                    'hashPassword':hashPassword,
                    'tosAgreement': tosAgreement
                };

                // Store the user to disk
                _data.create('users',phone,userObject,(error)=>{
                    if(!error){
                        callback(200);
                    } else {
                        console.error(error);
                        callback(500, {'Error':'Could not create the new user'});
                    }
                });
                } else {
                    callback(500,{'Error':'Error creating the hashedPassword'});
                }
            }else {
                callback(400,{'Error':'A User with that phone number exists'});
            }
        })
    } else {
        callback(400,{'Error': 'Missing required fields'});
    }


};

// Users - GET
// Required data : Request Param - phone
// COMPLETED: Only let authenticated users access their own object and not others
handlers._users.get = (data,callback)=>{    
    console.log('Data Query string is: ', data.queryStringObject);
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false; 
    if(phone){
        //Now check if the get method as a headers object
        console.log('Header params: ', data.headers);
        const tokenId = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
        //Verify that the given token from the headers is valid for the phone number
        handlers._tokens.verifyToken(tokenId, phone, (tokenIsValid)=>{
            if(tokenIsValid){
                _data.read('users',phone,(err,data)=>{
                    if(!err && data){
                        console.log('Data exists: ', data);
                        //FIXME: Move the below line of code as part of the data.js
                        // let parsedData = JSON.parse(data);
                        delete data.hashPassword;
                        callback(200,data);
                    } else {
                        callback(404, {});
                    }
                });
            } else {
                callback(403, {'Error': 'Missing requried token in header / token invalid'});
            }
        });        
    } else {
        callback(400,{'Error':'Missing required field'});
    }
};

// Users - PUT
// Required data : Payload - phone
// Optiona data : Payload - object - Atleast one of these fields must be specified (firstName, lastName, password)
// TODO: Only let authentiated user update their object, dont let them update anyone else's
handlers._users.put = (data,callback)=>{
    //NOTE: We are passing the required phone not as URI / QueryParam, but as payload
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    // Check for optional fields
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;    
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    // Error if the phone is invalid in all cases
    if(phone){
        if(firstName || lastName || password){
            //Look up this user
            _data.read('users',phone,(error, userData)=>{
                if(!error && userData){
                    //Update the fields that are necessary
                    if(firstName){
                        userData.firstName = firstName;                        
                    }
                    if(lastName){
                        userData.lastName = lastName;                        
                    }
                    if(password){                        
                        userData.hashPassword = helpers.hash(password);;
                    }
                    _data.update('users',phone,userData,(error)=>{
                        if(!error){
                            callback(200,{});
                        } else {
                            console.log('Error updating file: ', error);
                            callback(500, {'Error':'Could not update the user'});
                        }
                    })
                } else{
                    callback(400, {'Error':'The specified phone does not exist'});
                }
            });
        } else {
            console.log('Atleast one of the errors are required');
            callback(400, {'Error': 'Missing required field'});
        }
    } else {
        console.log('Phone number required is invalid', phone);
        callback(400, {'Error':'Missing requried fields'});
    }
};

// Users - DELETE
// Required data : Request Param - phone
// TODO: Only let authenticated users delete their own object and not others
// TODO: Clean up / delete any other data files associated with the user
handlers._users.delete = (data,callback)=>{
    console.log('Data Query string is: ', data.queryStringObject);
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false; 
    if(phone){
        _data.read('users',phone,(err,data)=>{
            if(!err && data){
                console.log('Data exists: ', data);                
                _data.delete('users',phone,(err)=>{
                    if(!err){
                        callback(200,{});
                    } else {
                        callback(500, {'Error':'Could not delete the user'});
                    }
                });                
            } else {
                callback(400, {'Error':'Couldnot find the specified phone'});
            }
        })
    } else {
        callback(400,{'Error':'Missing required field'});
    }
};

/**
 * Token SERVICE - CRUD
*/

// Tokens - POST
// Required data - PAYLOAD - phone and password
// Optional data - none
handlers._tokens.post = (data,callback)=>{
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;        
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    if(phone && password){
        //Look up the user who matches the phone number        
        _data.read('users',phone,(err,userData)=>{
            if(!err && userData){
                console.log('User Data exists: ', userData);
                //Hash the sent password and compare it with userData.hashPassword
                const hashPass = helpers.hash(password);
                if(userData.hashPassword == hashPass){
                    console.log('Password has been validated');
                    // If Valid - create a new token with a random name, set expiration date 1 hour in the future
                    let tokenId = helpers.createRandomString(20);
                    let expires = Date.now() + 1000*60*60;
                    const tokenObj = {'phone': phone, 'tokenId': tokenId, 'expires':expires};
                    //Store the token
                    _data.create('tokens',tokenId, tokenObj,(err)=>{
                        if(!err){
                            callback(200, tokenObj);
                        } else {
                            callback(500, {'Error':'Error storing the token object'});
                        }
                    });

                } else {
                    callback( 400, {'Error':'Invalid Password provided'});
                }
            } else {
                callback( 400, {'Error':'Could not find the specified user'});
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};

// Tokens - GET
// Required fields - QUERYPARAM - id
// Optional fields - none
handlers._tokens.get = (data,callback)=>{
    console.log('Data Query string is: ', data.queryStringObject);
    const tokenId = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(tokenId){
        _data.read('tokens',tokenId,(err,tokenData)=>{
            if(!err && tokenData){
                console.log('Data exists: ', tokenData);
                callback(200,tokenData);
            } else {
                callback(404, {});
            }
        })
    } else {
        callback(400,{'Error':'Missing required field'});
    }
};

// Tokens - PUT
// Required fields - PAYLOAD - id, extend
// Optional field - none
handlers._tokens.put = (data,callback)=>{
    console.log('Data Payload is: ', data.payload);
    const tokenId = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    const extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? data.payload.extend : false;
    if(tokenId && extend){
        // Lookup the token
        _data.read('tokens', tokenId, (err,tokenData)=>{
            if(!err && tokenData){
                //Check to see if the token already hasn't expired
                if(tokenData.expires > Date.now()){
                    // Set the expirtion time to an hour from now
                    tokenData.expires = Date.now() + 1000*60*60;
                    _data.update('tokens', tokenId, tokenData, (err)=>{
                        if(!err){
                            callback(200, {});
                        } else {
                            callback(500, {'Error':'Error updating token'});
                        }
                    })
                } else {
                    callback(400, {'Error': 'Token has already expired and cannot be extended'});
                }
            } else {
                callback(400, {'Error': 'Token ID doesn\'t exists'});
            }
        })
    } else {
        callback(400, {'Error': 'Missing required field(s) / Invalid field(s)'});
    }
};

// Tokens - DELETE
// Required data - Query Param - id,
// Optional data - none
handlers._tokens.delete = (data,callback)=>{
    console.log('Data Query string is: ', data.queryStringObject);
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false; 
    if(id){
        _data.read('tokens',id,(err,data)=>{
            if(!err && data){
                console.log('Data exists: ', data);                
                _data.delete('tokens',id,(err)=>{
                    if(!err){
                        callback(200,{});
                    } else {
                        callback(500, {'Error':'Could not delete the token'});
                    }
                });                
            } else {
                callback(400, {'Error':'Couldnot find the specified token id'});
            }
        });
    } else {
        callback(400,{'Error':'Missing required field'});
    }
};

//CHECKS - POST
// Required Parameters - protocol, url, method, success, timeouts 
// Optional Parameters - none
// Enforce the 5 check limit
handlers._checks.post = (data, callback) => {
    //Validate all the inputs
    console.log('Inside the CHECKS POST');
    const protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) == 'string' && ['post','get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

    if (protocol && url && method && successCodes && timeoutSeconds) {
        // Get the token from the headers
        console.log('Header params: ', data.headers);
        const tokenId = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
        //Read the token from the tokens collection and retrieve the user info
        _data.read('tokens', tokenId, (err, tokenData) => {
            if (!err && tokenData) {
                const userPhone = tokenData.phone;
                //Lookup the user data
                _data.read('users', userPhone, (error, userData) => {
                    if (!error && userData) {
                        const userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        if (userChecks.length < config.maxChecks) {
                            // Create random id for check
                            const checkId = helpers.createRandomString(20);

                            // Create check object including userPhone
                            const checkObject = {
                                'id': checkId,
                                'userPhone': userPhone,
                                'protocol': protocol,
                                'url': url,
                                'method': method,
                                'successCodes': successCodes,
                                'timeoutSeconds': timeoutSeconds
                            };

                            // Save the object
                            _data.create('checks', checkId, checkObject, (err)=>{
                                if (!err) {
                                    // Add check id to the user's object
                                    userData.checks = [...userChecks,checkId]; // ES6 way of adding to the appending an array with new element
                                    // userData.checks.push();

                                    // Save the new user data
                                    _data.update('users', userPhone, userData, (err)=>{
                                        if (!err) {
                                            // Return the data about the new check
                                            callback(200, checkObject);
                                        } else {
                                            callback(500, {'Error': 'Could not update the user with the new check.'});
                                        }
                                    });
                                } else {
                                    callback(500, {'Error': 'Could not create the new check'});
                                }
                            });
                } else {
                    callback(400, {'Error':`The User already has the number of maximum checks: ${config.maxChecks}`});
                }
            } else {
                callback(403, {});
            }
                });
            } else {
                callback(403,{});
            }
        });      
    } else {
        callback(400, {'Error': 'Missing requried inputs / Inputs are invalid'});
    }
}

/**
 * Create a General purpose function to check if a given token id is currently valid for a given user
 * @param string token id
 * @param string phone 
 * @param Function callback 
 */
handlers._tokens.verifyToken = (id, phone, callback)=>{
    //Lookup the token first
    _data.read('tokens', id, (err, tokenData)=>{
        if(!err && tokenData){
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

//Finally - export the handlers module
module.exports = handlers;