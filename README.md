# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AV-Shell/nodejs2021Q4-service.git
```

## Change branch to task9-authentication-and-jwt 

```
git checkout task10-Nest.js
```


## Installing NPM modules

```
npm install
```

## Before run application you need to start Database.

## Run DB in docker: 

 1) Download and install [Docker](https://docs.docker.com/engine/install/)

 2) Download and install docker-compose

 3) Run in terminal next command : 

```
docker-compose up -d
```
## To stop DB in docker:

 1) Run in terminal next command : 

```
docker-compose down
```

## Running application

```
npm start
```

After you enter this command  server will start the app on port from .env (4000 as default if you not set this port in .env)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


# Load TESTING Artillery

Load testing on a virtual machine with a database in docker is a heavenly delight. Testing for more than 10 seconds results in a hang. Therefore, here are the results for testing one endpoint under 10 seconds.


Fastify
All virtual users finished
Summary report @ 03:00:25(+0300) 2021-07-10
  Scenarios launched:  60
  Scenarios completed: 60
  Requests completed:  120
  Mean response/sec: 6.86
  Response time (msec):
    min: 1
    max: 151
    median: 63
    p95: 115
    p99: 130.7
  Scenario counts:
    lost the time: 60 (100%)
  Codes:
    200: 60
    201: 60  


express 
All virtual users finished
Summary report @ 03:08:57(+0300) 2021-07-10
  Scenarios launched:  60
  Scenarios completed: 60
  Requests completed:  120
  Mean response/sec: 6.85
  Response time (msec):
    min: 2
    max: 167
    median: 55
    p95: 118
    p99: 160
  Scenario counts:
    lost the time: 60 (100%)
  Codes:
    200: 60
    201: 60



    # Express
|              |                                  |                                      |
|--------------|----------------------------------|-----------------------------------------------------------------------------------------|
| Requests     | [total]                          | 120.
| Response    | [min, mean, median, p95 p99, max] | 2µs, 55µs, 55µs, 118µs, 160µs, 167µs |
| Success      | [ratio]                          | 100.00%                              |
| Status Codes | [code:count]                     | 200: 60  201: 60                     |

# Fastify
|              |                                  |                                      |
|--------------|----------------------------------|-----------------------------------------------------------------------------------------|
| Requests     | [total]                          | 120.
| Response    | [min, mean, median, p95 p99, max] | 1µs, 63µs, 55µs, 115µs, 130µs, 151µs |
| Success      | [ratio]                          | 100.00%                              |
| Status Codes | [code:count]                     | 200: 60  201: 60                     |