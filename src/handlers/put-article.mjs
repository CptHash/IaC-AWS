import { createResponse } from '../utils';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

export const putArticleHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`putMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }

  console.info('received:', event);

  const body = JSON.parse(event.body);
  const id = body.id;
  const tag = body.tag;
  const text = body.text;

  try {
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    const data = await ddbDocClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        id: id,
        tag: tag,
        text: text,
      },
    }));

    console.log("Success - updated", data);

    return createResponse(200, body, event);
  } catch (err) {
    console.error("Error", err.stack);

    return createResponse(500, { msg: err }, event);
  }
}