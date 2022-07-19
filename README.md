# Azure IoT Service Tutorial
In this tutorial, IoT architecture from Microsoft's Architecture Center and [P'Smith](https://github.com/SmithMMTK/IoT-Bootcamp) tutorial are used as reference. This tutorial will provide a thorough instruction to demonstrate IoT workflow from data generation to data ingress to data processing. This is designed for anyone who is interested in IoT technology in Azure environment. 
## Prerequisite
- An Azure subscription. If you don't have an Azure subscription, [create a free account before you begin.](https://azure.microsoft.com/en-us/free/?WT.mc_id=A261C142F)
- Any IDE that you are familiar with. [Visual Studio Code](https://code.visualstudio.com/Download) is used in this tutorial. 
## Section 1: Introduction
To start this tutorial, the overall architecture needs to be determined first. Assume that now you are working in a factory and your manager wants you to monitor the speed of the fan inside the factory. The requirements are stated below. 
- Monitor the real-time data through Dashboard
- Store raw data in a place that can be access easily and fast
- Send alert to the manager whenever the fan speed exceed the threshold limit 
![Cover Picture](https://azurecomcdn.azureedge.net/cvt-7d12cb554a538170e8ffd3f464d6d95301d16aeeecba8d10775a17b0cdc5f7a2/images/page/overview/iot/index/tab1.png)
## Section 2: Azure Service and Architecture
After the requirements are defined, Azure PaaS are used in the architecture. The service that you would need to know are
- [Azure IoT Hub](https://docs.microsoft.com/azure/iot-hub) - Connect, monitor, and manage billions of IoT assets. Azure IoT Hub is a fully managed service that enables reliable and secure bidirectional communications between millions of IoT devices and a solution back end.
- [Azure Event Hubs](https://docs.microsoft.com/azure/event-hubs) - Cloud-scale telemetry ingestion from websites, apps, and any streams of data.
- [Azure Stream Analytics](https://docs.microsoft.com/azure/stream-analytics) - Real-time data stream processing from millions of IoT devices.
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview) - Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data.
- [Azure Data Explorer](https://docs.microsoft.com/en-us/azure/data-explorer/data-explorer-overview) - Fully managed, high-performance, big data analytics platform that makes it easy to analyze high volumes of data in near real time. The Azure Data Explorer toolbox gives you an end-to-end solution for data ingestion, query, visualization, and management.
- [Power Bi](https://powerbi.microsoft.com/en-us/) - Cloud-based, business analytics service for analyzing and visualizing data. Power BI gives you a platform to be productive and creative with the reports and analytics.

By connecting the services mentioned above, this results in the iot architecture below.

PLACE HOLDER FOR ARCHITECTURE PICTURE


## Section 3: IoT Hub
First, **Create IoT hub through Azure Portal.**

- Log in to [Azure Portal](portal.azure.com), Select New and Search for **IoT Hub**
- Enter the following value
    - Name :  xxx (unique value)
    - Pricing and scale tier : S1 – Standard
    - IoT Hub units : 1
    - Device-to-cloud partitions : 4
    - Resource group -> Create new : IoTDemo or if you have already created your resource group, you can use your existing resource group.
    - Location : Southeast Asia
- Click Review + Create <br></br>
![iothub first page](/images/iothub.png)

Then, **Get Connection String and Access Key**

- When the IoT hub has been created successfully, click the new tile for your IoT hub in the Azure portal to open the blade for the new IoT hub. Make a note of the Hostname, and then click Shared access policies.
![iothub first page](/images/iothubkey.png)
- In the Shared access policies blade, click the iothubowner policy, and then copy and make note of the IoT Hub connection string, host name, and primary key to use later throughout this tutorial. 

    - Host Name: xxxxxxxxxx
    - Connection String: xxxxxxxxxx
    - Primary Key: xxxxxxxxxx

## Section 4: Simulated Device
Once you have created the IoT Hub, you may want to generate some data to feed into the IoT Hub. Azure IoT Solution supports many ways to send the data from local devices into cloud. For example, [Azure RTOS](https://docs.microsoft.com/en-us/azure/rtos/) can be used in microcontroller to operate IoT operations in the microcontroller. [Azure Sphere](https://docs.microsoft.com/en-us/azure-sphere/) is another options for the one who wants an end-to-end platform to handle IoT operations. Moreover, Azure also provides  Azure IoT SDKs to improve Azure development experience. 

In this tutorial, we will simulate a device to send the data to IoT Hub using Azure IoT Hub SDKs by using Nodejs. 

1. **Create Simulated Device**
    - For Window 
        - Download Node.js Installer from [this link](https://nodejs.org/en/download/) (Choose Windows 64 bits) and install in local machine
        - Once installer finished, open Node.Js command prompt 
        - Create new folder by type command “md c:\iotsim”, then type cd c:\iotsim” (warning: case sensitive)
        - Create new folder by type command “md createdevice”, then type “cd createdevice” 
        - Create a package.json file using the following command “npm init” at your command prompt. Accept all the defaults:
        - Run the following command “npm install azure-iothub --save” to install the azure-iothub Service SDK package
        - Copy source code from [this file](https://github.com/kuthaisang/IoT-Bootcamp/blob/master/Source%20code/Simulated%20Device/Create%20Device.js) and put into file c:\iotsim\createdevice\createdevice.js
        - Open the createdevice.js file and replace the placeholder value with the "IoT Hub connection string" for the hub you created in the previous section <br></br>

        ```cs
        var connectionString = '<<IoT Hub connection string>>';
        ```
        - To run the createdevice application, execute the following command at the command prompt in the createdevice folder `node createdevice.js`
        - Make a note of the **Device ID** and **Device key**. You need these values later when you create an application that connects to IoT Hub as a device.
        - Switch back to Azure IoT Hub in Azure Portal, click **Devices**
        - Click Device name you just create by script, then copy and make note of the Device connection string 
            - Device Id: xxxxxxxxxx
            - Primary key: xxxxxxxxxx
            - Connection string: xxxxxxxxxx
    - For MacOS
        - Same procedure as for Window. Use Terminal instead of Nodejs command prompt. 
        - Create directory using  `mkdir iotsim`
        - For node command, use same command as window

2. **Create Received to cloud device using IoT Explorer**

    There are many ways to read the data. We can write custom code to read the data directly from IoT Hub or there is another option called Azure IoT Explorer which provides an easy to use GUI for users. 

    Here is how to install Azure IoT Explorer: Link to [Github repo](https://github.com/Azure/azure-iot-explorer). Follow the instruction to download and add connection string to your IoT Hub. Then, you will be able to monitor telemetry sended from your simulated device. 

3. **Generate Telemetry Message from Simulated Device**

    - For window
        - Create new folder c:\iotsim\senddata” and open Node.js command at created folder
        - Create a package.json file using the following command “npm init” at your command prompt. Accept all the defaults:
        - Run the following command <br>
         `npm install azure-iot-device azure-iot-device-mqtt --save` <br>
         to install the azure-iot-device-mqtt
        - Copy source code from [this file](https://github.com/kuthaisang/IoT-Bootcamp/blob/master/Source%20code/Simulated%20Device/Send%20Device%20Telemetry.js) and put into file c:\iotsim\senddata\senddata.js
        - Open the senddata.js file and replace the placeholder value with the "IoT Device connection string" for the hub you created in the previous section
        ```cs
        var connectionString = '<<IoT Device connection string>>';
        ```
        - Run the senddata.js , execute the following command at the command prompt in the senddevice folder  `node senddata.js`

After all the steps is done, you can monitor the telemetry and the status via Azure Portal and Azure IoT Explorer. 

## Section 5: Process IoT Streaming Data
In this section, we are going to process the data once it gets into IoT Hub. We will use Azure Stream Analytic to process the data and send the data to the next components in our computer. This will allow us to manipulate how the data flow in our work flow. Since we are trying to send data into 4 path including Power Bi, Blob Storage, Alert to mail, and Data Explorer. 
1. Start with Azure Stream Analytics
    - Select New Stream Analytics Job
    - Use the following parameters
        - Job name: SA1
        - Resource group: Use Existing = IoTDemo
        - Location: Southeast Asia
2. (Optional) Test Query in Stream Analytic
    - Select Query box to go the Query Editor. You will be able enter T-SQL query that performs the transformation over the incoming event data
    - Download example IoT Simulated Sensors from [this file](/Source%20code/Stream%20Analytics/windSpeed.json)
    - Upload sample data into the input section
    - Test your query language

    note: add example picture into this
3. Connect Azure Stream Analytics to receive data from Azure IoT Hub
    - In the Job Topology panel click the Inputs box
    - Add new Input by select IoT Hub and enter following parameter 
        - Input alias: input
        - IoT Hub: *use your iothub name* 
        - Share access policy name: *iothubowner*
        - Event serialization format: JSON (depend on your message type, in this case we use JSON)
## Section 6: Work with Power Bi
After we have set up our Stream Analytic, we will stream data into Power Bi and display real-time data through dashboard in Power Bi.
1. Make sure that you have already connected your Office 365 Account to Power Bi. 
2. Go to Stream Analytic that you have created in the last section and add output
    - Click Outputs
    - Add new output by enter following parameter
        - Output alias: output
        - Sink: Power BI
        - Group workspace: My workspace
        - Click Authorize button then enter your Office 365 User Name & Password
        - Dataset Name: IoT Hub Sensors
        - Table Name: Wind Sensors
3. Click Query and Add query from [this file](/Source%20code/Stream%20Analytics/01%20Basic%20Query.txt)  
```sql
SELECT
    max(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output
FROM
    input
GROUP BY TumblingWindow (second, 1), deviceId
```
4. Go to Overview button and click start Stream Analytic Jobs   
5. Switch to Power Bi portal and click My workspace
6. On Datasets+Dataflows tab, you will see the dataset like below. 
![Power Bi](/images/powerbi1.png)
7. Click three dots and create report
8. Once report page display, choose field of interest: sensortime, windspeed
9. Select Line Chart in Visualizations area
10. (Optional) There are many diagrams/graphs available for you to explore more. If interest, please try to create a informative visualization. 
11. Save report and add report to dashboard.
![Power Bi 2](/images/powerbi2.png)
## Section 7: Store Sensor Data in BLOB Storage 
1. Create Azure Storage
    - Create Storage Account by entering following value:
        - Name:  xxx (unique value)
        - Account kind: Blob storage
        - Replication: Locally-redundant storage (LRS)
        - Resource group: Use existing -> Your IoT Resource Group
        - Location : Southeast Asia
2. Add new output to Stream Analytics
    - Go to Stream Analytics and click stop button to add output
    - Click output and add another output using following parameter
        - Output alias: output2
        - Sink: Blob storage
        - Storage account: Your Storage Account that created in previous step
        - Container: Create a new container -> myiotsensor
        - Path pattern: sensor/logs/{date}
3. Append query to the existing query from [this file](/Source%20code/Stream%20Analytics/02%20Basic%20Query.txt) and save the query. Don't forget to click start Stream Analytics Jobs
```sql
SELECT
    max(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output
FROM
    input
GROUP BY TumblingWindow (second, 1), deviceId

SELECT
    max(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output2
FROM
    input
GROUP BY TumblingWindow (second, 1), deviceId
```
4. Review data that sent into Blob Storage Account
    - Go to your storage account and choose the container 'myiotsensor'
    - Explore JSON file that is kept in blob storage. 
## Section 8: Alert to trigger a business workflow
In this section, you will be able to monitor data that exceeds the threshold and notify people through email. 
1. Create Azure Event Hub 
    - Select Event Hubs and enter the following parameters
        - Name:  xxx (unique value)
        - Resource group: Use existing -> Your IoT Resource Group
        - Location : Southeast Asia
        - Pricing tier: Standard
2. Go to Event Hubs under Entities panel and click + Event Hub 
    - Name: iotevent
3. Get Event Hub Connection String
    - Open Event Hub and click Event Hub: iotevent
    - Click Shared Access Policy and add new policy by enable manage, send, and listen in the claim section
    - Take note on Primary Key and Connection String-Primary Key.
4. Go to Stream Analytics 
    - Add another output by enter the following parameters
        - Output alias: output3
        - Sink: Event hub
        - Service hub namespace: your service hub
        - Event hub name: iotevent
        - Partition key column: deviceId
    - Append query into existing query from [this file](/Source%20code/Stream%20Analytics/03%20Alert%20to%20trigger%20a%20business%20workflow.txt)
```sql
SELECT
    max(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output
FROM
    input
GROUP BY TumblingWindow (second, 1), deviceId

SELECT
    max(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output2
FROM
    input
GROUP BY TumblingWindow (second, 1), deviceId

SELECT
    avg(windSpeed) As windSpeed,
    deviceId,
    DATEADD(hour,7,System.Timestamp) As sensorTime
INTO
    output3
FROM
    input
GROUP BY TumblingWindow (second, 5), deviceId
HAVING avg(WindSpeed) > 14
```
5. Create an Azure function to process the Event hub queue
     - Create function app in Azure Portal by enter following value
        - App Name: xxx (unique value)
        - Resource Group: Your IoT Resource Group
        - Hosting Plan: Consumption Plan
        - Location: Southeast Asia
    - Click + New Function > EventHubTrigger > C# > Create
        - Development environment: Develop in portal
        - Select Azure Event Hub Trigger Template
        - Under Template Details, enter the following parameter
            - New Function: xxx (unique name)
            - Event Hub connection: Add New Event Hub Connection by specifying Event Hub name and connection you have created in the previous task called "iotevent".
        ![ExampleofFunctionApp](/images/functionapp.png)
    - Replace the default code with code from [this file](/IoT-Bootcamp/Source%20code/Function%20App/eventHubFx.txt)
    - Save and Run, Review result from Logs Section

6. Create an Azure Logic App to send out the alerts
    - Create Logic App in your resource group by entering the following parameter
        - App Name: LogicApp
        - Resource Group: *Your IoT Resource Group name*
        - Hosting Plan: Consumption Plan
        - Location: Southeast Asia
    - Build Logic App Solution by selecting Logic App Designer
        - Click TRIGGERS and select **When a HTTP request is received**
        - Click Use sample payload to generate schema
        - Download sample payload from windSpeed.json at and paste into code area then click DONE.
        - Click + New Step, then select Add an action
        - Click + New Step, then select Add an action
        - Type Office 365 Outlook send an email in query then click  Office 365 Outlook – Send an email
        - Click Sign In and enter your credential
        - Enter following parameter
            - To: Your target mail
            - Subject: WindSpeed Alert: @{json(triggerBody())['windSpeed']}
        - Click Save then copy HTTP POST from Request Action
        - Switch to Azure Function App, select your EventHubTrigger
        - Replace API URL with the HTTP POST that you have copied from Logic App
7. Run every compenents that you have created in this tutorial and Monitor the results in every services. 









            








    

