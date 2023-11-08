const { ObjectId } = require('mongoose').Types;

const { User, Thought } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
          const singleUser = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!singleUser) {
            return res.status(404).json({ message: 'No User Found' });
          }
    
          res.json(course);
        } catch (err) {
          res.status(500).json(err);
        }
      },


}