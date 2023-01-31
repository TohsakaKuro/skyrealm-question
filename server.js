const Koa = require('koa');
const mount = require('koa-mount');
const { graphqlHTTP } = require('koa-graphql');
const schema = require('./graphql/schema');
const session = require('koa-session');
const storage = require('./db/nedb');

const app = new Koa();

app.use(session({
  signed: false,
}, app));

app.use(
  mount(
    '/graphqlApi',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  ),
);

storage.connect()
  .then(() => {
    app.listen(3000);
    console.log('server started at http://localhost:3000');
  })
  .catch((err) => {
    console.error('db error', err);
  });
