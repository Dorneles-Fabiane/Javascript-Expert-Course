const http = require('http');
const { once } = require('events');

const PORT = 3000;

const DEFAULT_USER = {
  username: 'FabianeDorneles',
  password: '123'
}

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact our page')
    return res.end()
  },
  '/login:post': async (req, res) => {
    const user = JSON.parse(await once(req, 'data'))
    const toLower = (text) => text.toLowerCase()

    if(
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      res.writeHead(401)
      res.end('Unauthorized!')
      return
    }
    return res.end("Login successful")
  },
  default(req, res) {
    res.writeHead(404)
    return res.end('This route does not exist!')
  }
}

function handler(req, res) {
  const { url, method } = req;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(req, res)
}

const app = http.createServer(handler)
.listen(PORT, () => console.log(`running at ${PORT}`));

module.exports = app;