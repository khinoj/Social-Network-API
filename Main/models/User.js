const { Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
        type: String,
        unique: true,
        
    }
)