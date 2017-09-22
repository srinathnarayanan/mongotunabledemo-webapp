# Demo NodeJS webapp.
Geo Replication using Mongo API support Powered by **Azure DocumentDB**

* Details:
 * Latency Measurement is done by performing 1000 read/write operations and measuring p99 latency .
 * The home page is autorefreshed (actually map and charts are re rendered) every 30 secs. This can be modified.

* Handy tools and libs used:
 * Chart courtesy - [Google Charts API](https://developers.google.com/chart/)  
 * Map courtesy -  [jvectormap](http://jvectormap.com/)         


## Getting started
1. Setup The Worker Apps

    Make sure that the Cosmos Db account is correctly configured and that the Cloud Service Worker Apps to generate load are running. The source code and steps to deploy are shared [here](https://github.com/srinathnarayanan/mongotunabledemo-worker)

2. Clone / download the repo and open the NodejsWebApp2.sln file in Visual Studio

3. Configure Cosmos DB server settings for the Web App

    Open the config/config.js file and modify the following variables to reflect your MongoDb settings

    ```js
    const port = YOUR_MONGO_PORT;
    const username = YOUR_MONGO_USERNAME;
    const password = YOUR_MONGO_PASSWORD;
    const documentDbEndPoint = 'https://' + YOUR_MONGO_HOST
    ```
    
4. Deploy the Web app

   * Right click on the NodejsWebApp2 project and choose publish
   * Login to your azure acount and select the correct subscription and Azure Web App where you want the deployment to take place
   * click 'publish'. The Web App will be deployed in a few minutes
