/**
 * Request Handlers
 * Learning Routers - Most important file
 */

//  Dependencies
const _data = require('./data'); // Require our file storage data
const helpers = require('./helpers');

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

//Container for user submethod
handlers._users = {};
handlers._tokens = {};


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
// TODO: Only let authenticated users access their own object and not others
handlers._users.get = (data,callback)=>{
    console.log('Data Query string is: ', data.queryStringObject);
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false; 
    if(phone){
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
        })
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

// Users - GET
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
handlers._tokens.put = (data,callback)=>{

};

// Tokens - DELETE
handlers._tokens.delete = (data,callback)=>{

};


//Finally - export the handlers module
module.exports = handlers;