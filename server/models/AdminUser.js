const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: { type: String },
	icon: { type: String },
	name: { type: String },
	description: { type: String },
	password: {
		type: String,
		select: false,
		set(val) {
			return require('bcrypt').hashSync(val, 10);
		}
	},
	alikes: [{
		article: { type: mongoose.SchemaTypes.ObjectId, ref: 'Article' },
	}],
	plikes: [{
		person: { type: mongoose.SchemaTypes.ObjectId, ref: 'Person' },
	}],
	vlikes: [{
		video: { type: mongoose.SchemaTypes.ObjectId, ref: 'Video' },
	}],
})

module.exports = mongoose.model('AdminUser', schema)