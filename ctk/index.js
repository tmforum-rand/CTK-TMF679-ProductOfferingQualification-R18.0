const readline = require('readline');
const rp = require('request-promise');
var DefaultURL = "https://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1";
var schema;
var hostname;
var port;
var APIRelativeAddress;
var statusCode;
const exampleEndPoint = "/productOfferingQualification";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("////////////////////////////////////////////////////////////////////////\nWelcome to the Conformance Test Kit for TMF679-ProductOfferingQualification\n");
getURL();




function isURLValid(triedURL){
    //Regex is a Modified version of: https://gist.github.com/dperini/729294 that is published under MIT license
    //var regexQuery = "^(?:(?:http?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$";
    //var url = new RegExp(regexQuery,"i");
    //if (!url.test(triedURL)){
    //    console.log("ERROR: Invalid URL");
    //    return false;
    //}

    var options = {
        uri: triedURL + exampleEndPoint,
        
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true, // Automatically parses the JSON string in the response
        resolveWithFullResponse: true
    };
    rp(options).then(function(jsonString) {
        statusCode = jsonString.statusCode;
        if (statusCode == 200){
            console.log("API Found on: " + triedURL + exampleEndPoint);
            breakDownURL(triedURL);
            exportEnvironment();
            runNewman();
        }
        else {
            console.log("\n_______________________________________\nERROR:");
            console.log("No API found on:")
            console.log("_______________________________________\n");
            return false;
        }
    }).catch(function (err) {
        console.log("\n_______________________________________\nERROR:");
        console.log(err + " while processing "+ triedURL + "\n" + err.stack);
        console.log("_______________________________________\n");
    });
    
  

    
}

function isNumeric(num){
    return !(Number(num) == NaN);
}

function breakDownURL(URL){
    if (URL.includes("https://")){
        schema = "https";
    }
    if (URL.includes("http://")){
        schema = "http";
    }
    var hostNameStart = URL.indexOf("//")+2;
    var hostNameEnd = URL.lastIndexOf(":");
    var hostNameLenght = hostNameEnd - hostNameStart;
    hostname = URL.substr(hostNameStart,hostNameLenght);
    
    var portStart = URL.lastIndexOf(":")+1;
    var portAndEndPoint = URL.substr(portStart);
    port = portAndEndPoint.substr(0,portAndEndPoint.indexOf("/"));
    APIRelativeAddress = portAndEndPoint.substr(portAndEndPoint.indexOf("/"));
    //console.log(schema+"://"+hostname+":"+port+APIRelativeAddress);
    
    
    
}

function getURL(){
    
    rl.question('////////////////////////////////////////////////////////////////////////\nWhat is your full API address omiting the endpoint? example:\nhttps://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1/productOfferingQualification\nbecomes\nhttps://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1\n>', (answer) => {
    DefaultURL = answer;
    rl.close();
    isURLValid(answer);
    
    });

}

function exportEnvironment(){

    var fs = require('fs');
    var environmentFile = "TMForumR18.0.postman_environment.json";    
    var content = fs.readFileSync(environmentFile, "utf8");
    var envJson = JSON.parse(content);
    envJson.name = "TMForumR18.0";
    envJson.values.forEach(element => {
        if (element.key == "schema"){
            element.value = schema;
        }
        if (element.key == "host"){
            element.value = hostname;
        }
        if (element.key == "port"){
            element.value = port;
        } 
        if (element.key == "ProductOfferingQualificationAPI"){
            element.value = "{{schema}}://{{host}}:{{port}}"+APIRelativeAddress;
        }
    });
    jsonData = JSON.stringify(envJson);
    fs.writeFileSync("TMFENV.json", jsonData);


}

function runNewman(){
    var newman = require('newman');

    newman.run({
        collection: require('./CTK-TMF679-ProductOfferingQualification.postman_collection.json'),
        environment: require('./TMFENV.json'),
        insecure: true,
        reporters: ['html','json'],
        reporter: {
            html: {
                export: '../htmlResults.html', // If not specified, the file will be written to `newman/` in the current working directory.
                //template: './customTemplate.hbs' // optional, this will be picked up relative to the directory that Newman runs in.
            },
            json: {
                export: '../jsonResults.json'
            }
        }
    }).on('start', function (err, args) {
        console.log('running a collection...');
    }).on('done', function (err, summary) {
        if (err || summary.error) {
            if (err){
                console.error('collection run encountered an error. ' + err);
            }
            if (summary.error){
                console.log("Collected run completed but with errors, please check htmlResults.html for details. Your API didn't pass the Conformance Test Kit.");
            }
            
        }
            
        else {
            console.log('Collection run completed without errors, you passed the Conformance Test Kit, jsonResults.json and htmlResults.html have the details and can be forwarded to TMForum.');        }
    });
}