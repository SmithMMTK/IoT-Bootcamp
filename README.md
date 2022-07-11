# Azure IoT Service Tutorial
In this tutorial, IoT architecture from Microsoft's Architecture Center and [P'Smith](https://github.com/SmithMMTK/IoT-Bootcamp) tutorial are use as reference. This tutorial will provide a thorough instruction to demonstrate IoT workflow from data generation to data ingress to data processing. This is designed for anyone who is interested in IoT technology in Azure environment. 
## Prerequisite
- An Azure subscription. If you don't have an Azure subscription, [create a free account before you begin.](https://azure.microsoft.com/en-us/free/?WT.mc_id=A261C142F)
- Any IDE that you are familiar with. [Visual Studio Code](https://code.visualstudio.com/Download) is used in this tutorial. 
## Section 1: Introduction
To start this tutorial, the overall architecture needs to be determined first. Assume that now you are working in a factory and your manager wants you to monitor the speed of the fan inside the factory. The requirements are stated below. 
- Monitor the real-time data through Dashboard
- Store raw data in a place that can be access easily and fast
- Send alert to the manager whenever the fan speed exceed the threshold limit 

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
    - Resource group -> Create new : MyIoT or if you have already created your resource group, you can use your existing resource group.
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
1. Create Simulated Device <br>
    For Window 
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
    - 









## Section 5:
## Section 6:
