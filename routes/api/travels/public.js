const express = require('express');
const router = express.Router();

const revieJwtoken = require('../../../lib/revieJwtoken');
const Favorites = require('../../../models/favorites');
const Travels = require('../../../models/Travels');
const User = require('../../../models/users');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// GET /api/travels Return all travels.

router.get('/', async (req, res, next) => {
	try {
		const currentDate = new Date();
		const filter = { datetimeDeparture: { $gte: currentDate } };
		const limit = parseInt(req.query.limit);
		const skip = parseInt(req.query.skip);
		const sort = { datetimeCreation: 'desc' };
		const select = req.query.select;
		const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;
		const viewJwt = revieJwtoken(jwtToken);

		let result = await Travels.list(filter, limit, skip, sort, select);

		for (let i = 0; i < result.length; i++) {
			try {
				const user = await User.findOne({ _id: result[i].userId });

				result[i].userName = user.user;

				if (viewJwt !== null) {
					const idString = result[i]._id.toString();
					const user_id = viewJwt;
					const favorite = await Favorites.findOne({
						userId: user_id,
						travelId: idString,
					});

					if (favorite) {
						result[i].favorite = true;
					} else {
						result[i].favorite = false;
					}
				}
			} catch (error) {
				result[i].userName = 'space user';
				result[i].favorite = false;
			}
		}
		res.json(result);
	} catch (err) {
		next(err);
	}
});

// GET /api/travels/:id Return a travel find by id.

router.get('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const result = await Travels.findOne({ _id: _id });
		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
