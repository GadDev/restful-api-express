const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
// const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/albo', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogSchema = require('./src/models/crmModels');
const blogModel = mongoose.model('blog', blogSchema);

// POST new blog post (CREATE)
app.post('/blog', (req, res) => {
	let blog = new blogModel(req.body);

	blog.save((err, blogModel) => {
		if (err) {
			res.send(err);
		}
		res.json(blogModel);
	});
});

// GET all blog posts (READ)
const getPosts = (req, res) => {
	blogModel.find({}, (err, blogs) => {
		if (err) {
			res.send(err);
		}
		return res.json(blogs);
	});
};
app.get('/blogs', getPosts);

// GET blog post by id (READ)
const getPostById = (req, res) => {
	blogModel.findById(req.params.id, (err, blog) => {
		if (err) {
			res.send(err);
		}

		res.json(blog);
	});
};
app.get('/blog/:id', getPostById);

// PUT update blog post (UPDATE)
const updatePost = (req, res) => {
	blogModel.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true },
		(err, post) => {
			if (err) {
				res.send(err);
			}
			res.json(post);
		}
	);
};

app.put('/blog/:id', updatePost);

//DELETE delete blog post
const deletePost = (req, res) => {
	blogModel.findByIdAndDelete({ _id: req.params.id }, (err, blog) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'post deleted successfully' });
	});
};

app.delete('/blog/:id', deletePost);

app.listen(PORT, () => {
	console.log(`server is listening on port: ${PORT}`);
});
