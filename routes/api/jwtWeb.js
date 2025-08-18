const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {
	try {
		const token = req.body.token;
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded._id;
		res.json(userId);
	} catch (err) {
		res.status(401).json({ error: 'Token inválido' });
	}
});

module.exports = router;
