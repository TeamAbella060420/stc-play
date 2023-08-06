export interface Headers {
  [key: string]: string;
}

export const requestHeaders = (req: Headers, extraHeaders?: Headers) => ({  
    headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH',
    'Access-Control-Max-Age': '3600',
    "User-Agent": req['headers']['User-Agent'],
    'x-api-token': req['headers']['x-api-token'],
    'x-api-version': req['headers']['x-api-version'],
    'x-api-lang': req['headers']['x-api-lang'],
    'x-api-key': req['headers']['x-api-key'],
    'x-api-endpoint': req['headers']['x-api-endpoint'],
    'Authorization': req['headers']['authorization'],
    ...extraHeaders
  }
});