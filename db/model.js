const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user_schema = new Schema({
    'name': String,
    'username': String,
    'password': String,
    'no_of_challenges': Number,
    'experience': Number,
    'expert_in': [Object],
    'isAdmin': Boolean,
    'voted': [Schema.Types.ObjectId],
    'vote_count': Number
})

var user = mongoose.model('user', user_schema);

module.exports = {
    User: user
}