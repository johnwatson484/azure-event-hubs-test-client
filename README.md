
# Azure Event Hubs Test Client
A test client for sending JSON format events to Azure Event Hubs

# Prerequisites
Node v12+  

Or:  

Docker

# Running the client
## From source
- Clone the repo and run `npm install` to install required npm packages
- Update the preferred port in the `config.js` file.  By default this is set to **3012**.
- Run `npm start` to start the application.

The application can be run in a container if preferred by running the `scripts/start` script.

## Docker
`docker run -p 3012:3012 johnwatson484/azure-event-hubs-test-client`

## Set the connection string
This can be found in the Azure portal under Shared Access Policies for either the root account or a specific queue key.

This must be in the below format and note that the validation provided by the client is case sensitive.  For example "endpoint=..." would be invalid.  EntityPath is optional as it only applies to queue policies.

`Endpoint=sb://YOUR_HOSTNAME/;SharedAccessKeyName=KEYNAME;SharedAccessKey=KEY;`

## Set the Event Hub name
This is the Event Hub where the event will be sent to.

## Event value
This is the value that will be sent to the Event Hub and must be in JSON format.

# Errors
If invalid crendentials or malformed JSON is provided an error will be returned through the client.
