'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
l=require('../config/lib');

var fields = {
		title: { type: String },
	description: { type: String },
	completed: { type: Boolean, default : false },
	created: { type: Date , default: Date.now }
};

var todoSchema = new Schema(fields);

module.exports = mongoose.model('Todo', todoSchema);
