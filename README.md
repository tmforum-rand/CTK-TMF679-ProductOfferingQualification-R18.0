# PRODUCT OFFERING QUALIFICATION-CTK
Installing and Running the Product Offering Qualification CTK
The Product Offering Qualification CTK is dependent on the installation of node.js and Newman to work.
The installation instructions for Newman are found here: https://www.getpostman.com/docs/newman_intro
Node.js can be downloaded and installed from:
http://nodejs.org/download/ 
Once Node.js and Newman are installed download and unzip the TMF679-ProductOfferingQualification ZIP file within your test directory.

You should see the following files:
-CTK-TMF679-ProductOfferingQualification.postman_collection.json : the postman collection for the Mandatory tests
-TMForumR2018.0-PaneOn.postman_environment : the Environment variable for the REST API Endpoint

Open the TMForumR2018.0-PaneOn.postman_environment.json file and change the following host value to match your endpoint. Note that by default the environment is pointing to the Sandbox endpoint. 
```json
{
      "key": "schema",
      "value": "https",
      "enabled": true
},
{
	"key": "host",
	"value": "paneon.no",
	"enabled": true
},
{
	"key": "port",
	"value": "8080",
	"enabled": true
},
```
now look for the ProductOfferingQualificationAPI key and change it so that it matches the URL for the ServiceQualification resource:
```json
{
	"key": "ProductOfferingQualificationAPI",
	"value": "{{schema}}://{{host}}:{{port}}/tmf-api/productOfferingQualificationManagement/v1",
	"description": "",
	"enabled": true
},
```
Save the new values and exit.

Go to your test directory and type the following command:

> newman run CTK-TMF679-ProductOfferingQualification.postman_collection.json -e TMForumR2018.0-PaneOn.postman_environment.json --reporters html json --reporter-html-export TMF679-ProductOfferingQualification-report.html --reporter-json-export TMF679-ProductOfferingQualification-report.json

where TMF679-ProductOfferingQualification-report.html and TMF679-ProductOfferingQualification-report.json will contain the results of the CTK execution. You should see something like the following example:
![CTK Example Image](https://github.com/henfen/CTKFILES/blob/master/TMF679-ProductOfferingQualification/Output-Example.png)


If there are no failures then you have passed the CTK and your API is conformant with all
the Mandatory features.

The results of the CTK are also in  the TMF679-ProductOfferingQualification-report.html
While all the information related to the execution of the CTK will be contained in the ServiceQualificationCTKResult.json file



