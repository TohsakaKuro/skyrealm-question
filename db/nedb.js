'use strict';
const Datastore = require('nedb-promises');

const STORE_MAP = './mock_data/store_map.db';
const USER = './mock_data/user.db';
const FAVORITE = './mock_data/favorite.db';

const db = {
  store: Datastore.create(STORE_MAP),
  user: Datastore.create(USER),
  favorite: Datastore.create(FAVORITE),
};
let connectFlag = false;
async function connect () {
  if (!connectFlag) {
    await Promise.all(Object.values(db).map(v => v.load()));
    connectFlag = true;
  }
  return db;
}
exports.connect = connect;
exports.db = db;
