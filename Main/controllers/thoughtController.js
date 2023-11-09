const { User, Thought } = require('../models');

module.exports = {
    // All throughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Single Thought
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!singleThought) {
                return res.status(404).json({ message: 'No course with that ID' });
            }
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create 
    async createThought(req, res) {
        try {
            const create = await Thought.create(req.body);
            res.json(create);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    //update
    async updateThought(req, res) {
        try {
            const update = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!update) {
                res.status(404).json({ message: 'No thought with id' });
            }
            res.json(update);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought id found' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found' })
                    : res.json({ message: 'Thought was deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    //  reaction add
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};