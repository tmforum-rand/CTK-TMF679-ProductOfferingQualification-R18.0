const readline = require('readline');
const rp = require('request-promise');
var DefaultURL = "https://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1";
var schema;
var hostname;
var port;
var statusCode;
const exampleEndPoint = "/productOfferingQualification";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the Conformance Test Kit for TMF679-ProductOfferingQualification\n");
getURL();
breakDownURL(DefaultURL);

function validadeHost(triedURL){
    if (!triedURL.includes(":") || !triedURL.includes("//")){
        console.log("\n_______________________________________\nERROR:");
        console.log("Expect URL to include : before port and // after http or https")
        console.log("_______________________________________\n");
        return false;
    }
    
    if (triedURL.substr(0,4) !== "http"){
        console.log("\n_______________________________________\nERROR:");
        console.log("URL Should start with http or https");
        console.log("_______________________________________\n");
        return false;
    }
    var indexOfColon = triedURL.indexOf(":");
    if (!isNumeric(triedURL.substr(indexOfColon+1,indexOfColon+2))){
        console.log("\n_______________________________________\nERROR:");
        console.log(triedURL.substring((triedURL.indexOf(":")+1),1));
        console.log("URL should include Port number after :");
        console.log("_______________________________________\n");
        return false;
    }
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
            return true;
        }
        else {
            console.log("\n_______________________________________\nERROR:");
            console.log("No API found on:")
            console.log("_______________________________________\n");
            return false;
        }
    }).catch(function (err) {
        console.log("\n_______________________________________\nERROR:");
        console.log(err + " while getting + "+ triedURL);
        console.log("_______________________________________\n");
    });
    
  

    
}

function isNumeric(num){
    return !(Number(num) == NaN);
}

function breakDownURL(URL){
    
}

function getURL(){
    var hostValid = false;
    rl.question('What is your full API address omiting the endpoint? example:\nhttps://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1/productOfferingQualification\nbecomes\nhttps://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1\nLeave blank for default\n', (answer) => {
    if (answer === ""){
        hostValid = true;
        return rl.close(); 
    }
    else {
        hostValid = validadeHost(answer);
        if (hostValid){
            DefaultURL = answer;
            return rl.close();
        }
        else{
            getURL();
        }
    }

    
    });

}