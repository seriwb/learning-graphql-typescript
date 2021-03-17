import { ObjectID } from 'mongodb';

export default {

    me: (parent, args, { currentUser }) => currentUser,

    totalPhotos: (parent, args, { db }) =>
      db.collection('photos')
        .estimatedDocumentCount(),

    allPhotos: (parent, args, { db }) =>
      db.collection('photos')
        .find()
        .toArray(),

    Photo: (parent, args, { db }) =>
      db.collection('photos')
        .findOne({ _id: new ObjectID(args.id) }),

    totalUsers: (parent, args, { db }) =>
      db.collection('users')
        .estimatedDocumentCount(),

    allUsers: (parent, args, { db }) =>
      db.collection('users')
        .find()
        .toArray(),

    User: (parent, args, { db }) =>
      db.collection('users')
        .findOne({ githubLogin: args.login })

}