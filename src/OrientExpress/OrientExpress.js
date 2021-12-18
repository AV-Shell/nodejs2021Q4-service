const http = require('http');
const config = require('../common/config');
const {
  responseCode: { NOT_FOUND },
} = require('../common/statusCodes');

module.exports = class Application {
  constructor(port) {
    this.port = port;
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  static _addResponceMethods(res) {
    res.json = (data, statusCode) => {
      const status = statusCode ?? res.statusCode;
      res.writeHead(status, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify(data));
      return res;
    };

    res.status = (status) => {
      res.statusCode = status;
      return res;
    };

    res.send = (data) => {
      res.setHeader('Content-Type', 'text/plain');
      res.end(JSON.stringify(data));
    };
  }

  static _parseUrl(req) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    if (config?.DEBUG) {
      console.log('parsedUrl', parsedUrl);
    }
    req.parsedUrl = parsedUrl;
  }

  _createServer() {
    return http.createServer((req, res) => {
      Application._parseUrl(req);
      Application._addResponceMethods(res);
      let body = '';
      let isRunNext = true;
      const next = () => {
        isRunNext = true;
      };
      req.on('data', (partOfData) => {
        body += partOfData;
      });
      req.on('end', async () => {
        if (body) {
          req.body = body;
        }
        let midCount = 0;
        while (midCount < this.middlewares.length && isRunNext) {
          isRunNext = false;
          try {
            if (config?.DEBUG) {
              console.log('try middleware', this.middlewares[midCount]?.length);
            }
            await this.middlewares[midCount](req, res, next);
          } catch (err) {
            if (config?.DEBUG) {
              console.log('i catch error', err.message);
            }
            if (this.errorHandler && typeof this.errorHandler === 'function') {
              this.errorHandler(err, req, res);
            } else {
              throw err;
            }
          }
          midCount++;
        }
        if (isRunNext) {
          res.statusCode = NOT_FOUND;
          res.setHeader('Content-Type', 'text/plain');
          res.end('human friendly: No endpoints!   ¯\\_(ツ)_/¯');
        }
      });
    });
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }

  setErrorHandler(cb) {
    this.errorHandler = cb;
  }

  static bodyParser(req, res, next) {
    if (config?.DEBUG) {
      console.log('bodyPArser');
      console.log('req.body', req.body);
      if (req.body) {
        console.log('JSON.parse(req.body)', JSON.parse(req.body));
      }
    }
    if (req.body) {
      req.body = JSON.parse(req.body);
    }
    if (config?.DEBUG) {
      console.log('req.body', req.body);
    }
    next();
  }
};
