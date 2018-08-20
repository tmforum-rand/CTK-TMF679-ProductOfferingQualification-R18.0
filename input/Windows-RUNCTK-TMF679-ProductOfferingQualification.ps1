Write-Host "This will run a TMForum API CTK"
Write-Host "In order to be able to run it, you need to have"
Write-Host "NodeJS, NMP and Newman installed."
Write-Host


newman run CTK-TMF679-ProductOfferingQualification.postman_collection.json -e TMForumR2018.0-PaneOn.postman_environment.json --reporters html json --reporter-html-export TMF679-ProductOfferingQualification-report.html --reporter-json-export TMF679-ProductOfferingQualification-report.json
