'use strict';

const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const userInfo = new GraphQLObjectType({
  name: 'userInfo',
  fields: {
    avatar: { type: GraphQLString },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
  },
});

module.exports = userInfo;
