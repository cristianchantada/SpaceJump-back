const express = require('express');
const router = express.Router();

const revieJwtoken = require('../../lib/revieJwtoken');
const Favorites = require('../../models/favorites');
const Travels = require('../../models/Travels');
const User = require('../../models/users');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// POST /api/buy Return a travels find by buy.

router.post(
	'/',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const userId = req.body.userId;
			const result = await Travels.find({ userBuyer: userId.toString() });

			const jwtToken =
				req.get('Authorization') || req.body.jwt || req.query.jwt;
			const viewJwt = revieJwtoken(jwtToken);
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
			res.json({ status: 'OK', result });
		} catch (err) {
			res.json({ status: 400, message: 'Not Purchased Travels' });
			return;
		}
	}
);

module.exports = router;
