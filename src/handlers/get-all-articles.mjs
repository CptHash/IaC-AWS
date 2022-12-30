import { createResponse } from '../utils';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

export const getAllArticlesHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  console.info('received:', event);

  try {
    // Get tag from queryStringParameters
    const tag = event.queryStringParameters.tag;

    if (tag) {
      console.log("Received tag:", tag);
    }

    // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
    const data = await ddbDocClient.send(new ScanCommand({
      TableName: tableName,
    }));

    return createResponse(200, data.Items, event);
  } catch (err) {
    console.error("Error", err);

    return createResponse(500, { msg: err }, event);
  }
}
