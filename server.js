const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();
const middleware = [express.json(), helmet(), logger];

server.use(middleware);
server.use(cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  const messageOfTheDay = process.env.MOTD || "Default - Don't worry, be happy!!!"
  res.status(200).json({ motd: messageOfTheDay });
});

function logger(req, res, next) {
  console.log(
    `req.method: ${req.method}, req.url: ${
      req.url
    }, timestamp: ${new Date().toISOString()} `
  );
  next();
}

module.exports = server;
