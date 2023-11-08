const { Schema, model, Types } = require('mongoose');

//import dayjs for timestamp ability
const daysjs = require('dayjs');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: created => dayjs(created).format('MMMM D, YYYY [at] h:mm A'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema. Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: created => dayjs(created).format('MMMM D, YYYY [at] h:mm A'),
        },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);


thoughtSchema.virtual('reactionCount ').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
// export model
module.exports = Thought;
