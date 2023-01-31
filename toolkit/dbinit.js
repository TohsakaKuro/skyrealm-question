'use strict';
const storage = require('../db/nedb');
const fs = require('fs').promises;
const path = require('path');

/**
 * clear db
 */
async function clear () {
  await fs.rm(path.resolve('./mock_data/'), { force: true, recursive: true });
}

/**
 * mock some store
 */
async function mockStoreMap () {
  const db = await storage.connect();
  await db.store.insert({
    id: 'No.1',
    name: 'my home',
    address: ' my address',
    pictures: ['http://image1.jgp'],
    lng: 20,
    lat: 20,
    visitor: 3,
    frequency: 10,
    mediumIncome: 30,
  });
  await db.store.insert({
    id: 'No.2',
    name: 'your home',
    address: ' your address',
    pictures: ['http://image2.jgp'],
    lng: 10,
    lat: 10,
    visitor: 4,
    frequency: 20,
    mediumIncome: 40,
  });
  await db.store.insert({
    id: 'No.3',
    name: 'her home',
    address: ' her address',
    pictures: ['http://image3.jgp'],
    lng: 8,
    lat: 8,
    visitor: 3,
    frequency: 10,
    mediumIncome: 10,
  });
}

/**
 * mock a default user
 */
async function mockUser () {
  const db = await storage.connect();
  await db.user.insert({
    userId: '1',
    name: 'default user',
    nickname: 'default user',
    avatar: 'http://myAvatar.img',
  });
}
clear().then(() => {
  mockStoreMap();
  mockUser();
});
