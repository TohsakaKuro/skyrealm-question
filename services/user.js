'use strict';

const { db } = require('../db/nedb');
const { vaildAndGetLoggedUserInfo } = require('../utils/user');
/**
 * resolve user info
 * @returns userInfo
 */
async function resolveUserInfo (parents, args, ctx, info) {
  return vaildAndGetLoggedUserInfo(ctx);
}

/**
 * login as default user
 */
async function loginDefaultUser (parents, args, ctx, info) {
  const defaultUserInfo = await db.user.findOne({ userId: '1' });
  if (!defaultUserInfo) {
    throw new Error('please init user');
  }
  ctx.session.userInfo = defaultUserInfo;
  return true;
}

/**
 * logout
 */
async function logout (parents, args, ctx, info) {
  delete ctx.session.userInfo;
  return true;
}

exports.resolveUserInfo = resolveUserInfo;
exports.loginDefaultUser = loginDefaultUser;
exports.logout = logout;
