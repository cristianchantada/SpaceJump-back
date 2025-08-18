const express = require('express');
const router = express.Router();

const multer = require('multer');
const Favorites = require('../../models/favorites');
const Travels = require('../../models/Travels');
const upload = multer({ dest: 'uploads/' });
const User = require('../../models/users');

router.post(
	'/',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const userId = req.body.userId;
			const email = req.body.email;
			const password = req.body.password;

			if (email.indexOf('@') === -1) {
				res.json({ status: 400, message: 'Email is not valid' });
				return;
			}

			// buscar el usuario en la BD
			const user = await User.findOne({ email: email });

			// si no lo encuentro o no coincide la contraseña --> error
			if (!user || !(await user.comparePassword(password))) {
				res.json({ status: 400, error: 'invalid credentials' });
				return;
			}

			const user_Id = user._id;
			await User.deleteOne(user);
			await Favorites.deleteMany({ userId: user_Id });
			await Travels.deleteMany({ userId: user_Id });
			res.json({ status: 'OK', result: email });
			return;
		} catch (error) {
			res.json({ status: 400, message: 'Error Delete User' });
			return;
		}
	}
);

module.exports = router;
