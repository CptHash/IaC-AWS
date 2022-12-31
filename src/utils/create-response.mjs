export function createResponse(statusCode, body, event) {
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${statusCode} body: ${body}`);

  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
}