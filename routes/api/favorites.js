const express = require('express');
const router = express.Router();

const multer = require('multer');
const Favorites = require('../../models/favorites');
const Travels = require('../../models/Travels');
const User = require('../../models/users');

const upload = multer({ dest: 'uploads/' });

// POST /api/favorites Return a travels find by favorites.

router.post(
	'/',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const user = req.body.user;
			const userData = await User.findOne({ user: user });
			const userId = userData._id;
			const travels = await Favorites.find({ userId: userId });
			let data = [];

			for (let i = 0; i < travels.length; i++) {
				let travel = await Travels.findOne({ _id: travels[i].travelId });
				travel.favorite = true;
				data.push(travel);
			}
			res.json({ status: 'OK', result: data });
			return;
		} catch (error) {
			res.json({ status: 400, message: 'Not Favorite Travels' });
			return;
		}
	}
);

// POST /api/favorites/setForFavorite Add a travels find by favorites.

router.post(
	'/setForFavorite',
	upload.array('files'),
	async function (req, res, next) {
		try {
			const userId = req.body.userId;
			const travelId = req.body.travelId;
			const checked = req.body.checked;

			if (checked === 'true') {
				const favorite = new Favorites({ userId: userId, travelId: travelId });
				await favorite.save();
			} else {
				await Favorites.deleteOne({ userId: userId, travelId: travelId });
			}
			const travels = await Favorites.find({ userId: userId });
			res.json({ status: 'OK', result: travels });
			return;
		} catch (error) {
			res.json({ status: 400, message: 'Not Favorite Travels' });
			return;
		}
	}
);

module.exports = router;
