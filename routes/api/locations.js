const express = require('express');
const router = express.Router();

const Locations = require('../../models/locations');

// GET /api/locations Return all locations.

router.get('/', async (req, res, next) => {
	try {
		const filter = {};
		const limit = parseInt(req.query.limit);
		const skip = parseInt(req.query.skip);
		const sort = req.query.sort;
		const select = req.query.select;
		const result = await Locations.list(filter, limit, skip, sort, select);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
