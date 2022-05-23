const { Schema, model} = require('mongoose');

// USER
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, "username {VALUE} already exist"],
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// CREATE USER MODEL 
const User = model('User', UserSchema);

// FRIEND COUNT 
UserSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

module.exports = User;