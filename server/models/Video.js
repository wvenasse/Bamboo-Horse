const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
	name: {type: String},
	vision: {type: String},
	description: {type: String},
},
{
	timestamps: true
})

module.exports = mongoose.model('Video',schema,'videos')