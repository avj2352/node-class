# Node JS Master Class

- **Presenter**: Ryan Dhal
- [Exercise Files](https://github.com/pirple/The-NodeJS-Master-Class.git)
- [Master Class Link](https://pirple.thinkific.com/)
- Username: _pramod.jingade@gmail.com_
- Password: _zuko2352_

---

# How Node processes JS - *Event Loops*
- The `event loop` is continually checking if there's any new for Node JS to do.
- Each task is `blocking` if its blocking all the resources and tasks that are in pipeline - while it's executing the current task.
- Node JS  is a single threaded - Node's event loop and `non blocking` IO doesn't allow Node to do multiple things at one time...*they just allow Node to schedule things later*.
- Non blocking IO allows the app to do other things while it's sitting around waiting.

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