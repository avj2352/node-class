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
    'users': handlers.users,
    'tokens': handlers.tokens
};