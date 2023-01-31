const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt, GraphQLBoolean } = require('graphql');
const { checkFavorite } = require('../services/favorite');

const store = new GraphQLObjectType({
  name: 'store',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    pictures: { type: new GraphQLList(GraphQLString) },
    lng: { type: GraphQLFloat },
    lat: { type: GraphQLFloat },
    visitor: { type: GraphQLInt },
    frequency: { type: GraphQLFloat },
    mediumIncome: { type: GraphQLFloat },
    haveCollected: {
      type: GraphQLBoolean,
      resolve: checkFavorite,
    },
  },
});

const storePageList = new GraphQLObjectType({
  name: 'storePageList',
  fields: {
    list: { type: new GraphQLList(store) },
    pageNum: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    total: { type: GraphQLInt },
  },
});
exports.store = store;
exports.storePageList = storePageList;
