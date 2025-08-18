const jwt = require('jsonwebtoken');

function revieJwtoken(token) {
	if (token !== null) {
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET);
			return payload._id;
		} catch (error) {
			return null;
		}
	} else {
		return null;
	}
}

module.exports = revieJwtoken;
