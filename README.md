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



## Section 3:
## Section 4:
## Section 5:
## Section 6:
