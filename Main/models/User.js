const { Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^.+@(?:[\w-]+\.)+\w+$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
// returns number of friends for user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  // user model created with userSchema
  const User = model('User', userSchema);
  // exports model
  module.exports = User;
