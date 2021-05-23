const routes = (app) => {
	app.route('/')
		.get((req, res) => {
			res.send(`GET method`);
		})
		.post((req, res) => {
			res.send(`POST method`);
		})
		.put((req, res) => {
			res.send(`PUT method`);
		})
		.delete((req, res) => {
			res.send(`DELETE method`);
		});
};

module.exports = routes;
