const { ObjectId } = require('mongoose').Types;

const { User, Thought } = require('../models');

module.exports = {
    // all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // single user
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate({ path: 'friends', select: '-__v' })
                .populate({ path: 'thoughts', select: '-__v' });

            if (!singleUser) {
                return res.status(404).json({ message: 'No User Found' });
            }

            res.json(singleUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    // Update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No User found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user and remove thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await Thought.deleteMany({ username: user.username });

            res.json({ message: 'User & thoughts deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

};