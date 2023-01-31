'use strict';
const { db } = require('../db/nedb');

/**
 * resolveStorePageList
 * @param {*} parents parents
 * @param {*} args args
 * @param {*} ctx ctx
 * @param {*} info info
 * @returns sore page list
 */
async function resolveStorePageList (parents, args, ctx, info) {
  // query by lat, lng, radius
  // as an example, convert it to a square. if we need accuracy, we can use mysql geometry, redis geo, or other geographic storage engine.
  // lat, lng, radius unit: decimal
  const top = args.lat + args.radius;
  const bottom = args.lat - args.radius;
  const left = args.lng - args.radius;
  const right = args.lng + args.radius;
  const list = await db.store.find({ lat: { $lt: top, $gt: bottom }, lng: { $lt: right, $gt: left } });

  const beginIndex = (args.pageNum - 1) * args.pageSize;
  const endIndex = args.pageNum * args.pageSize;
  const cutList = list.slice(beginIndex, endIndex);
  return {
    list: cutList,
    pageNum: args.pageNum,
    pageSize: args.pageSize,
    total: list.length,
  };
}

/**
 * resolveStoreList
 * @param {*} parents parents
 * @param {*} args args
 * @param {*} ctx ctx
 * @param {*} info info
 * @returns sore list
 */
async function resolveStoreList (parents, args, ctx, info) {
  // query by lat, lng, radius
  // as an example, convert it to a square. if we need accuracy, we can use mysql geometry, redis geo, or other geographic storage engine.
  // lat, lng, radius unit: decimal
  const top = args.lat + args.radius;
  const bottom = args.lat - args.radius;
  const left = args.lng - args.radius;
  const right = args.lng + args.radius;
  const list = await db.store.find({ lat: { $lt: top, $gt: bottom }, lng: { $lt: right, $gt: left } });
  return list;
}

exports.resolveStoreList = resolveStoreList;
exports.resolveStorePageList = resolveStorePageList;
