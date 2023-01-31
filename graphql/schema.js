'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLList } = require('graphql');
const { resolveStoreList, resolveStorePageList } = require('../services/store');
const userInfo = require('./user');
const { resolveUserInfo, loginDefaultUser, logout } = require('../services/user');
const { addFavorite, unfavorite } = require('../services/favorite');
const { storePageList, store } = require('./store');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      storePageList: {
        type: storePageList,
        args: {
          lng: { type: new GraphQLNonNull(GraphQLFloat) },
          lat: { type: new GraphQLNonNull(GraphQLFloat) },
          radius: { type: new GraphQLNonNull(GraphQLFloat) },
          pageNum: { type: GraphQLInt, defaultValue: 1 },
          pageSize: { type: GraphQLInt, defaultValue: 20 },
        },
        resolve: resolveStorePageList,
      },
      storeList: {
        type: new GraphQLList(store),
        args: {
          lng: { type: new GraphQLNonNull(GraphQLFloat) },
          lat: { type: new GraphQLNonNull(GraphQLFloat) },
          radius: { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: resolveStoreList,
      },
      userInfo: {
        type: userInfo,
        resolve: resolveUserInfo,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields: () => ({
      addFavorite: {
        type: GraphQLID,
        args: {
          storeId: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: addFavorite,
      },
      unfavorite: {
        type: GraphQLBoolean,
        args: {
          storeId: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: unfavorite,
      },
      loginDefault: {
        type: GraphQLBoolean,
        resolve: loginDefaultUser,
      },
      logout: {
        type: GraphQLBoolean,
        resolve: logout,
      },
    }),
  }),
});

module.exports = schema;
