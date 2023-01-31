'use strict';
const { db } = require('../db/nedb');
const { vaildAndGetLoggedUserInfo } = require('../utils/user');

/**
 * add favorite
 * @param {*} parents parents
 * @param {*} args args
 * @param {*} ctx ctx
 * @param {*} info info
 * @returns favorite column id
 */
async function addFavorite (parents, args, ctx, info) {
  const userInfo = vaildAndGetLoggedUserInfo(ctx);
  const store = await db.store.findOne({ id: args.storeId });
  if (!store) {
    throw new Error(`store ${args.storeId} does not exist`);
  }
  const { userId } = userInfo;
  const existed = await db.favorite.findOne({ userId, storeId: args.storeId });
  if (existed) {
    throw new Error('you has collected it');
  }
  const result = await db.favorite.insert({ userId, storeId: args.storeId });
  return result._id;
}

/**
 * unfavorite
 * @param {*} parents parents
 * @param {*} args args
 * @param {*} ctx ctx
 * @param {*} info info
 * @returns success
 */
async function unfavorite (parents, args, ctx, info) {
  const userInfo = vaildAndGetLoggedUserInfo(ctx);
  await db.favorite.deleteOne({ userId: userInfo.userId, storeId: args.storeId });
  return true;
}

/**
 * checkFavorite
 * @param {*} parents parents
 * @param {*} args args
 * @param {*} ctx ctx
 * @param {*} info info
 * @returns success
 */
async function checkFavorite (parents, args, ctx, info) {
  const userInfo = vaildAndGetLoggedUserInfo(ctx);
  const storeId = parents.id;
  const favorite = await db.favorite.findOne({ userId: userInfo.userId, storeId });
  if (favorite) {
    return true;
  }
  return false;
}

exports.addFavorite = addFavorite;
exports.unfavorite = unfavorite;
exports.checkFavorite = checkFavorite;
