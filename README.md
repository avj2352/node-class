# Node JS Master Class

- **Presenter**: Ryan Dhal
- [Exercise Files](https://github.com/pirple/The-NodeJS-Master-Class.git)
- [Master Class Link](https://pirple.thinkific.com/)
- Username: _pramod.jingade@gmail.com_
- Password: _zuko2352_

---

# How Node processes JS - *Event Loops*
> - Node is built using C++ application and it embeds the V8 Engine
> - It primarily can be broken down into two main modules
> - 1. A Script Processor - Script processor which tells node which file to run eg: `node index.js`
> - 2. A REPL - Read, Eval, Print, Loop - It is an interactive JS runtime.

When a Node Application is executing a piece of code, the following happen:
- Any synchronous code, Node will encounter it will immediately execute and move to the next line.
- Any asynchornous code, Node adds it to the `queue` / `todo list` and moves forward.
- Non-blocking tasks get added to the todoList, and Node processes them whenever it can.
- The `event loop` is continually checking if there's any new for Node JS to do.
- Each task is `blocking` if its blocking all the resources and tasks that are in pipeline - while it's executing the current task.
- Node JS  is a single threaded - Node's event loop and `non blocking` IO doesn't allow Node to do multiple things at one time...*they just allow Node to schedule things later*.
- Non blocking IO allows the app to do other things while it's sitting around waiting.

| Blocking IO | Non Blocking |
|:------------|-------------:|
| Synchronous Code | Async Code, Promises, ..etc., |
| When processing a request, web applications are actually sitting around doing nothing, waiting for response | Node schedules such requests to be done `later` and goes on executing |

---

# How Node Runs an application *Module System*

```javascript
var lib  = require ('./lib'); // This line imports a piece of code
module.exports = whatever ; //This line exports a piece of code
```
 These imports and exports, when chained together, create a dependency tree, which tells Node which files are needed to run the application

# REPL
- It is a way to execute the JS code against V8 engine at runtime

> The REPL is an interactive JS runtime.

- R : Reading input using `node` command
- E : Executing 
- P : Printing Response
- L : Loop

```bash
# This is the R of REPL
node index.js 
```

> - package-lock.json - is used to lock your versions exactly down to what you have installed
> -  .npmrc - Contains authToken that lets your local npm authenticate against the NPM cloud.
> - .travis.yml - Node version of a CI / CD which tells travis CI configuration for a test to pass
> - .jshintrc - configures javascript linter
> - Gulp, Grunt, Webpack - Popular build tools

---

# Environments & Configurations
When it comes to `Environments & Configuration` Node is woefully lacking. 

### Option 1
- Start your app with `NODE_ENV = myEnvironemntName node index.js`
```bash
# Pass the name of your environment file  before calling node index.js
NODE_ENV=config.js node index.js
```
- Put your configuration in a file _(eg: config.js)_ which has a switch inside of it
- That switch should read process.env.NODE_ENV to determine the current environment and export only the configuration variables for that environment.
- All your project specific configuration are inside that `config.js`

> You can access `NODE_ENV` command line variable from Node JS using the following piece of code:

```js
let cliValue = process.env.NODE_ENV; // process is the global object in Node JS
```

### Option 2
Start your app with `every configuration variable` you're going to need for that environment

```bash
# All below are configuration parameters accessed inside index.js using process.env.xyz
DBPassword=myDBPassword apiToken=mySecretToken port=myPortConfiguration foo=bar node index.js
```

### Option 3

- Read all your configuration from a `.env` file which gets ignored by source control (like Git)
- Each dev would put their own .env file in the project prior to beginning localhost work.
- Your deployment pipeline would insert an `.env` file into the repo before it deploys anywhere.

---

# Handling Errors

The following are the 3 possible ways of handling errors in a Node JS application

### Errback:
Functions should callback 2 parameters 
- An Error (if any)
- Data being returned (if any)

```javascript
// First param should always be the error to be handled, followed by the actual data as 2nd param
exampleErrBackFunction(function (err, data){
//Check the error
err ? return `Error recieved`
// Else process your data
console.log('Processed data', data);
});
```

### Avoid throwing Exceptions

An uncaught exception takes down the entire thread, and kills the application

### Avoid Globals

Just as in Browser best practice, Avoid Globals in Node JS application. This way you'll avoid namespace collisions with any libraries you may be using.

---

# Node JS vs the Browser

The following are some of Browser's built in methods and fields 

![Alt text](./browser_objects.PNG)

> - Node is one ENVIRONMENT. The browser is many (Chrome, Firefox, Safari)
> - You dont have to worry about compatibility on other systems as all machines are Node compatible
> - In Node, the source your write CANNOT be seen by the end user.
> - There is no `View source` feature available in Node for end users to peep.

---


# JAVA  LDAP CALL

```java
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, "LDAP://INGBTCPIC1DC001.code1.emi.philips.com:389");
			env.put(Context.SECURITY_PRINCIPAL, "320017874");
			env.put(Context.SECURITY_CREDENTIALS, "#CA0@Bangalore");
			env.put(Context.SECURITY_AUTHENTICATION, "DIGEST-MD5"); 
```

```java
String[] attrIDs = { "cn", "givenName", "sn", "mail" ,"memberOf"};
```

```json

{
"mail=mail": "ashwini.v@philips.com", 
"givenname=givenName": "Ashwini", 
"memberof=memberOf": "CN=DL_dlblr_CAO,OU=Mailgroups,OU=NLVEHVRES2,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggINGBTCPIC5-TFS-CAL-R5,OU=Groups,OU=INGBTCPIC5,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggINGBTCPIC5-TFS-CAL-R3,OU=Groups,OU=INGBTCPIC5,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=Gd_IM_IIQ_Employees,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_SFB_OBS_Standard-L-Z,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd4_IN_ORU_470770,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=dldlBlrPic_EMP_Temp,OU=Mailgroups,OU=INGBTCPIC1,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggNLYBSTQVP4-A-Artifactory-Developers-HSDP-CP,OU=Groups,OU=NLYBSTQVP4,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_Employees_HT-SV,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_IM_HT_Employees-TV,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_IN_Employees_HT,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=ggNLYBSTQVP4-TFS-Region-13-Proj-Contributors,OU=Groups,OU=NLYBSTQVP4,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggNLYEHVRAD1-PRD-allportal,OU=Groups,OU=NLYEHVRAD1,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_Active_Code1_E3_FullOfficesuite_UZ,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_Active_Code1_CorporateTechnologies-MZ,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=ggNLYBSTQVP4-TFS-License-TFS-CAL,OU=Groups,OU=NLYBSTQVP4,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=Gd_IM_Ph_Employees_VXY-other,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_Active_Personal_Accounts_V_W,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_IN_PIC_ORU_470770,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd4_p_c0027_global_employee_excluding_NL,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd4_p_c0027_Taleo_Employee_excluding_German,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd_IN_Employees,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=gd4_p_c0027_Global_Employee,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=_10PHApplC,OU=Mailgroups,OU=INGBTCPIC5,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=gd4_p_c0027_inpildyn,OU=Security-Groups-Automatic,OU=PIM,DC=code1,DC=emi,DC=philips,DC=com, CN=dldlBlrPic_EMP,OU=Mailgroups,OU=INGBTCPIC1,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggWebmeetingOrganizers,CN=Users,DC=code1,DC=emi,DC=philips,DC=com, CN=dlBlrPIC_Contractors,OU=Mailgroups,OU=INGBTCPIC1,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggINGBTCPIC7-Internet Access,OU=Network Access,OU=INGBTCPIC7,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggINGBTCPIC7-Wireless LAN AutoConfig,OU=Network Access,OU=INGBTCPIC7,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com, CN=ggNLYEHVPGN1-internet-access-global,OU=Groups,OU=NLYEHVPGN1,OU=CODE,DC=code1,DC=emi,DC=philips,DC=com",
"sn=sn":"V", 
"cn=cn": 320013291
}

```

---

# Setting up HTTPS using Node JS

## Pre-requisite

> Requires OpenSSL to be setup in the system.

---

Once, OpenSSL, The following is the openssl command to generate a SSL certificate

```bash
# Generate SSL certificate with 10 years validity
openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
Country name: IN
State or Province Name: Karnataka
Locality Name: Bangalore
Organization: innovoskies
Organization Unit name: innovoskies
# For production, better get the certificate from a CA authority, they know how to use wildcards
Common Name: localhost / innovoskies.com
```

---

## Using the certificates inside a Node JS server

- **Step 1** Configure both the HTTP and HTTP(S) ports on your Node JS configuration file.

> `config.js`

```javascript
environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'staging'
}
```

- **Step 2** Create a refactored function which will handle both the `http.createServer` and `https.createServer` callback functions

```javascript
//All the server logic for both the http and https server
const unifiedServer = function(req,res){
	// Get the URL and parse it - Uses an inbuilt QUERYSTRING MODULE
    // true - calls queryString Module and provides the parsed URL
    var parsedURL = url.parse(req.url, true); // Contains all info - in this case full url
    // Get the path from the URL
    var path = parsedURL.pathname; // Untrimmed path that the user requested.
    //Trimming of any extraneous path from the request
    //it will only trim the leading and lagging slashes, not middle slashes
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');
    //Get the query String parameter
    var queryStringObject = parsedURL.query;
    //Get the method type requested
    var method = req.method.toLowerCase();
    //Get the headers as an object
    var headers = req.headers;
    
    // Get the payload if there is any
    var decoder = new StringDecoder('utf-8');

    //NOTE: Node JS deals alot with streams, Streams are built into Node
    // Payload come as a stream, we need to collect the stream, collate them, then process them.
    var buffer = ''; //as new data comes in, append to buffer

    //EVENT: when the request object emits the event - only called when the payload comes in
    req.on('data',(data)=>{
        //So the buffer gets appended with the undecoded stream that comes in to be decoded with utf-8
        buffer += decoder.write(data);
    });

    //EVENT: end, when the stream ends - will always be called - Payload or no payload
    req.on('end', ()=>{
        buffer += decoder.end(); //End the decoding 

        //Now the request is finished streaming
        // Send the response
        // Log the path the request was asking for
        res.end('Hello World\n !!');
        console.log('Requested path is: ', trimmedPath);
        console.log('Query String parameters: ', queryStringObject);
        console.log('REQUESTED METHOD IS: ', method);
        console.log('Header Object is: ', headers);
        console.log('Request Body payload is: ', buffer);
    });
};
```

- **Step 3** Create a HTTPS configuration object to pass to https createServer function


```js
//Create httpsConfig
// Using the fs module to read the key and cert files SYNCHRONOUSLY
const httpsConfig = {
	key:fs.readFileSync('./certificateFolder/key.pem'),
	cert:fs.readFileSync('./certificateFolder/cert.pem')
};


```

---


# Error while creating Node Routers

The following Error is sometimes seen while configuring Node REST API

> **NODE: Error: Can't set headers after they are sent to the client**

 Solution

> _The res object in Express is a subclass of Node.js's `http.ServerResponse` (read the http.js source). You are allowed to call `res.setHeader(name, value)` as often as you want until you call `res.writeHead(statusCode)`. After `writeHead`, the headers are baked in and you can only call `res.write(data)`, and finally `res.end(data)`._

---

> NOTE: Hidden folders are created with a dot prefix Eg: `.data`

---

# User Service (CRUD - Users)

For the User Service, you need the following files:

- handlers.js
- helpers.js
- data.js
- config.js
- http-server.js

---

> `handlers.js` : This module will contain the routes to hanlder all User related CRUD operations

```js
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


handlers.users = (data,callback)=>{
    // for this route we wont accept any other methods other than below
    const acceptableMethods = ['post','get','put','delete'];
    if (acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback); //Router is Invoking EVERYTHING HERE !!
    } else {
        callback(405); //HTTP status for method not allowed
    }
    
};

//Container for user submethod
handlers._users = {};


// Users - POST
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
                callback(400, {});
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


//Finally - export the handlers module
module.exports = handlers;
```

---

> `helpers.js`: This module makes use of the `CRYPTO` module of Node JS and also pulls in the information from the `config.js` module


```js
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


// export the module
module.exports = helpers;
```

---

> `data.js`: This modules makes use of the `PATH` and the `FS` module of Node JS to CRUD a file. It also pulls information from the `config.js` module

```js
/**
 * Model file library for storing  and retrieving data
 */
// Dependencies
const fs  = require('fs'); // Filesystem module
const path = require('path'); //Normalize the path to different directories

//Base directory of the data folder


// Container for this module
let lib = {};
// take the current directory, move up a folder and move to .data/ folder
lib.baseDir = path.join(__dirname,'/../.data'); 

/**
 * 
 * Create and write a file using FS Module 
 * @param {*} dir name of the directory to store inside .data root folder 
 * @param {*} file name of the file
 * @param {*} data the data that needs to go in
 * @param {*} callback handler function
 */
lib.create = (dir, file, data, callback) => {
 // fileDescriptor - A way to uniquely identify a particular file} dir 
    fs.open(`${lib.baseDir}/${dir}/${file}.json`,'wx',(err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData  = JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData, (error)=>{
                if(!error){
                    fs.close(fileDescriptor,(error2)=>{
                        if(!error2){
                            callback(false); //giving a false error is a good thing.
                        }else {
                            callback('Error closing the file');
                        }
                    })
                }else{
                    callback('Error writing to new file'); // This - in theory, should never be called.
                }
            }); // Write 
            callback
        } else {
            callback('Could not create new file. It may already exist');
        }
    });
}


/**
 * Read a file using the FS module
 * @param {*} dir 
 * @param {*} file 
 * @param {*} callback 
 */
lib.read = (dir, file, callback) =>{
    fs.readFile(`${lib.baseDir}/${dir}/${file}.json`,'utf8',(err,data)=>{
        if(!err && data){
            const parsedData = lib.parseJsonToObject(data);
            callback(false, parsedData); // Now the read function is complete - it returns a valid JSON object
        } else {
            callback(err,data);
        }
    });
}

/**
 * Update a file with new data
 * @param {*} dir name of the directory to store inside .data root folder 
 * @param {*} file name of the file
 * @param {*} data the data that needs to be updated
 * @param {*} callback handler function
 */
lib.update = (dir, file, data, callback) => {
    //R+ => Open the file with switch -> Open file up for writing, error if the file doesnt exist yet
    //WX => Open the file with swtich -> Open file for writing, error if the file already exists
    //W+ => Open the file with swtich -> Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists)
    //Open the file for writing
    fs.open(`${lib.baseDir}/${dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData  = JSON.stringify(data);
            //Truncate the contents of the file before writing on top of it
            fs.truncate(fileDescriptor,(err)=>{
                if(!err){
                    //Now finally - write to the file and close it
                    fs.writeFile(fileDescriptor,stringData,(error2)=>{
                        if(!error2){
                            fs.close(fileDescriptor, (error3)=>{
                                if(!error3){
                                    callback(false); //Successfully wrote to a file and closed it
                                }else{
                                    callback('Error closing the file', error3);
                                }
                            })
                        }else {
                            callback('Error writing to an existing file', error2);
                        }
                    })

                }else{
                    callback('Error truncating the file', error);
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
}


/**
 * Delete a file
 * @param {*} dir name of the directory to store inside .data root folder 
 * @param {*} file name of the file
 * @param {*} callback handler function
 */
lib.delete = (dir,file,callback)=>{
    //Unlinking the file from filesystem
    fs.unlink(`${lib.baseDir}/${dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false);
        } else {
            callback('Error deleting the file');
        }
    });
}

/**
 * Parse a JSON string to an object in all cases, without throwing
 * @param string buffer
 * @returns Object any
 */
lib.parseJsonToObject = (inputBuffer)=>{
    try{
        const obj = JSON.parse(inputBuffer);
        return obj;
    }catch(error){
        // console.log('Error parsing data: ',error);
        return {};
    }
};


module.exports = lib; //Export the container
```

---

> `config.js`: Module to hold environment based information.

```js
/**
 * PAJ - 30th Aug 2018
 * Create and export environment variables
 */

var environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    hashingSecret: 'thisIsASecret'
};


environments.production = {
    port: process.env.port,
    envName: 'production',
    hashingSecret: 'thisIsAlsoASecret'
}

//Determine which environment was passed as a command line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check that the current environment is one of the environment types above, if not - return the staging server ppty
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export environmentToExport
module.exports = environmentToExport;
```

---

> `http-server.js`: Finally the main REST Controller to handle the callback responses and send to the client

```js
//Inbuilt module of Node - http
const http = require('http');
const url = require('url');
// string_decoder has a field called String Decoder
const StringDecoder = require('string_decoder').StringDecoder;
// const _data = require('./lib/data'); // Require our file storage data
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

const PORT = 5000;



//TESTING
//@FIXME delete this
// _data.delete('test','newFile',(err)=>{
// //     console.log('This was the error', err);    
// })


//Server would respond to any type of request with a simple hello world
// createServer listens to EVERY TYPE OF REQUEST
let server = http.createServer((req,res)=>{

    // Get the URL and parse it - Uses an inbuilt QUERYSTRING MODULE
    // true - calls queryString Module and provides the parsed URL
    let parsedURL = url.parse(req.url, true); // Contains all info - in this case full url
    // Get the path from the URL
    let path = parsedURL.pathname; // Untrimmed path that the user requested.
    //Trimming of any extraneous path from the request
    //it will only trim the leading and lagging slashes, not middle slashes
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');
    //Get the query String parameter
    let queryStringObject = parsedURL.query;
    //Get the method type requested
    let method = req.method.toLowerCase();
    //Get the headers as an object
    let headers = req.headers;
    // Get the payload if there is any
    let decoder = new StringDecoder('utf-8');

    //NOTE: Node JS deals alot with streams, Streams are built into Node
    // Payload come as a stream, we need to collect the stream, collate them, then process them.
    let buffer = ''; //as new data comes in, append to buffer

    //EVENT: when the request object emits the event - only called when the payload comes in
    req.on('data',(data)=>{
        //So the buffer gets appended with the undecoded stream that comes in to be decoded with utf-8
        buffer += decoder.write(data);
    });

    //EVENT: end, when the stream ends - will always be called - Payload or no payload
    req.on('end', ()=>{
        buffer += decoder.end(); //End the decoding 
        // Handle all the routing on request.end 

        //Choose the handler that this request should go to
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined'  ? router[trimmedPath] : router.notFound;

        //Construct the data object, to send to the handler
        //We now want the payload to be instead of the plain buffer, helpers.buffer
        let data  = {
            'trimmedPath' : trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        /**
         * Ecmascript 6 version of assigning defaults, passing values during parameter definition
         */
        chosenHandler(data, (statusCode = 200, payload = {})=>{
            // Ecmascript 5 way of assigning defaults
            // Checking that the datatype of statusCode is always a number
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            // Checking that the datatype of payload is always an object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert payload to a string
            // NOTE: This is not the payload we recevied, this is the payload that the response is defining
            const payloadString  = JSON.stringify(payload); 
            res.setHeader('Content-type', 'application/json'); // Ensure that the response is a JSON type
            res.writeHead(statusCode); // using the built in 
            res.end(payloadString); // Always send back the payload as a String
            
            // Consol logging out the response
            console.log('Requested path is: ', trimmedPath);
            console.log('Query String parameters: ', queryStringObject);
            console.log('REQUESTED METHOD IS: ', method);
            console.log('Header Object is: ', headers);
            console.log('Request Body payload is: ', buffer);
            console.log('Response sent is: ', payloadString);
        });

        // If request is not found, call the handler.notFound
    
    
    });
   
}); 

//Start server
server.listen(PORT,()=>{
	console.log('Server listening at:', server.address().port);
});

// Define a request router 
let router = {
    'ping': handlers.ping,
    'sample': handlers.sample,
    'users': handlers.users
};
```

# Tokens

Tokens / Authentication Layer / Session for user to store using his - phonenumber, password.

