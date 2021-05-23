const mongoose = require('mongoose');

const schemaBlog = mongoose.Schema;

const blogSchema = new schemaBlog({
	title: String,
	author: String,
	body: String,
});

module.exports = blogSchema;
