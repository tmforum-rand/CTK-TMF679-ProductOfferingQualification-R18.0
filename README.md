# PRODUCT OFFERING QUALIFICATION-CTK
Installing and Running Conformance Test Kit
The CTK is dependent on the installation of node.js and npm to work.
Node.js and NPM can be downloaded and installed from:

>https://nodejs.org/

Once Node.js and npm are installed download and unzip the TMF679-ProductOfferingQualification ZIP file within your test directory.

You should see the following files between many others :

>Windows-RUNCTK.ps1

>Linux-RUNCTK.sh

## 1.
### For Windows
For Windows you need to right click Windows-RUNCTK.ps1 and select run with PowerShell, press Y and Enter, wait for the dependencies to be installed go to Step 2.
### For Linux
For Linux you need to give executable permission for the Linux-RUNCTK.sh file, you can do that by opening a terminal and typing:
>chmod +x ./Linux-RUNCTK.sh
and
>./Linux-RUNCTK.sh
Wait for NPM to install the dependencies and go to step 2.

## 2.
Finally enter the URL for the base of your API, for example if you can get a resource on:
>https://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1/productOfferingQualification

You should input:
>https://paneon.no:8080/tmf-api/productOfferingQualificationManagement/v1

The script will now run for a few minutes and when it ends, you will have a resultsHTML.html file inside the folder, this is the file you need to forward to TMForum to get your certification if your API passed every test, the file should look like this:

![CTK Example Image](https://github.com/henfen/CTKFILES/blob/master/TMF679-ProductOfferingQualification/Output-Example.png)


If there are no failures then you have passed the CTK and your API is conformant with all
the Mandatory features.





