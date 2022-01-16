# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AV-Shell/nodejs2021Q4-service.git
```

## Change branch to task-7-docker-basics 

```
git checkout task-7-docker-basics 
```


## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After you enter this command  server will start the app on port from .env (4000 as default if you not set this port in .env)

## Running application in docker: 

 1) Download and install [Docker](https://docs.docker.com/engine/install/)

 2) Run in terminal next command : 

```
docker-compose up
```
## Stop app in docker:

 1) Run in terminal next command : 

```
docker-compose down
```

## Testing

Before starting test you need install npm packages

open new terminal and enter:

```
npm install
```

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
