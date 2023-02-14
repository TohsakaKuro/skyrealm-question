'use strict';

/**
 * vaild and get logged user info
 * @param {*} ctx ctx
 * @returns userInfo
 */
function vaildAndGetLoggedUserInfo (ctx) {
  const { userInfo } = ctx.session;
  if (userInfo === undefined) {
    throw new Error('please login');
  }
  return userInfo;
}

function getLoggedUserInfo (ctx) {
  if (ctx.session.userInfo) {
    return ctx.session.userInfo;
  }
  return null;
}

exports.vaildAndGetLoggedUserInfo = vaildAndGetLoggedUserInfo;
exports.getLoggedUserInfo = getLoggedUserInfo;
