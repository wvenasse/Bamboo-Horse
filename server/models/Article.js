const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
	title: {type: String},
	body: {type: String},
	comments: [{
		adminUser: {type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser'},
		comment: { type: String},
		is:{ type: Boolean},
		backcomments: [{
			adminUser: {type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser'},
			comment: { type: String},
			is:{ type: Boolean},
		}]
	}]
},
{
	timestamps: true
})

module.exports = mongoose.model('Article',schema)