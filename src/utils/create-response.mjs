export function createResponse(statusCode, body, event) {
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${statusCode} body: ${body}`);

  return {
    statusCode: statusCode,
	headers: {
		"Access-Control-Allow-Headers" : "Content-Type",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
	},
    body: JSON.stringify(body)
  };
}