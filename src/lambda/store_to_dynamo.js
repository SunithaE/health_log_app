// Include the AWS SDK module
const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();
// Use built-in module to get current date & time
let date = new Date();
// Store date and time in human-readable format in a variable
let now = date.toISOString();
// Define handler function, the entry point to our code for the Lambda service
// We receive the object that triggers the function as a parameter
exports.main = async (event) => {
    // Extract values from event and format as strings
    console.log(event)
    let id = event['patient_id'];
    let brainhug_tasks = event['brainhug_tasks'];
    let daily_checkin = event['daily_checkin'];
    let madrs_score = event['madrs_score'];
    let time_spent =  event['time_spent'];

    // Create JSON object with parameters for DynamoDB and store in a variable
    let params = {
        TableName:'therapy_test',
        Item: {
            'patient_id': id,
            'brainhug_tasks': brainhug_tasks,
            'daily_checkin': daily_checkin,
            'madrs_score':madrs_score,
            'time_spent':time_spent
        }
    };
    // Using await, make sure object writes to DynamoDB table before continuing execution
    await dynamodb.put(params).promise();
    // Create a JSON object with our response and store it in a constant
    const response = {
        statusCode: 200,
        body: id
    };
    // Return the response constant
    return response;
};