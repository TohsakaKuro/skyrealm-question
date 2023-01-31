'use strict';

const { GraphQLObjectType, GraphQLID } = require('graphql');

const addFavorite = new GraphQLObjectType({
  name: 'addFavorite',
  fields: {
    id: { type: GraphQLID },
  },
});

exports.addFavorite = addFavorite;
