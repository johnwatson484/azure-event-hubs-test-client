[![Build Status](https://dev.azure.com/johnwatson484/John%20D%20Watson/_apis/build/status/Azure%20Event%20Hubs%20Test%20Client?branchName=master)](https://dev.azure.com/johnwatson484/John%20D%20Watson/_build/latest?definitionId=43&branchName=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=johnwatson484_azure-event-hubs-test-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=johnwatson484_azure-event-hubs-test-client)
[![Known Vulnerabilities](https://snyk.io/test/github/johnwatson484/azure-event-hubs-test-client/badge.svg)](https://snyk.io/test/github/johnwatson484/azure-event-hubs-test-client)
# Azure Event Hubs Test Client
A test client for sending JSON format events to Azure Event Hubs or Kafka broker.

# Prerequisites
Node v14+  

Or:  

Docker

# Running the client
## From source
- Clone the repo and run `npm install` to install required npm packages
- Update the preferred port in the `config.js` file.  By default this is set to **3012**.

### Node
- Run `npm start` to start the application.

### Docker Compose
- Run `docker-compose build`
- Run `docker-compose up`


## Docker
`docker run -p 3012:3012 johnwatson484/azure-event-hubs-test-client`

## Using the client
The below screenshot shows an overview of the the client.

![Client Screenshot](/docs/screenshot.png "Client Screenshot")

### Set the host
If using Azure Event Hubs then set this value to your Azure Event Hubs namespace.  For example, `myeventhub.servicebus.windows.net`

If using Kafka then set this to the hostname of the broker.  If running the client in a container and the broker is accessible on the host device's localhost.  Then set this value to `host.docker.internal`.

### Set the port
If using Azure Event Hubs this value is ignored.  If using Kafka then set the port of the broker.

### Set authentication
The client supports three methods for authentication.
- Connection String, for Azure Event Hubs authentication
- Username and password, for Kafka clients with plain authentication
- None, for Kafka clients with no authentication

#### Connection string format
This can be found in the Azure portal under Shared Access Policies for either the root account or a specific queue key.

This must be in the below format and note that the validation provided by the client is case sensitive.  For example "endpoint=..." would be invalid.  EntityPath is optional as it only applies to queue policies.

`Endpoint=sb://YOUR_HOSTNAME/;SharedAccessKeyName=KEYNAME;SharedAccessKey=KEY;`

### Set the Event Hub name
This is the Event Hub where the event will be sent to.

### Set the event type (optional)
This value will be added to the message body as a `type` property.

### Set the routing key (optional)
This value will be added to the header metadata as a `routingKey` property

### Set the event value
This is the value that will be sent to the Event Hub and must be in JSON format.  

Any `##` placeholders will be replaced by an auto incrementing integer.

### Set the total
The number of copies of the event to send.
## Errors
If invalid crendentials or malformed JSON is provided an error will be returned through the client.
