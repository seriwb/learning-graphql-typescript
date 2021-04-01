import Query from './Query';
import Mutation from './Mutation';
import Type from './Type';

const resolvers = {
  Query,
  Mutation,
  ...Type
};

export default resolvers;