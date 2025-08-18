const SendEmail = require('../models/sendEmail');
const Usuario = require('../models/users.js');
const jwt = require('jsonwebtoken');

class PasswordController {
	index(req, res, next) {
		res.locals.error = '';
		res.locals.email = '';
		res.render('password');
	}
	async putAPI(req, res, next) {
		try {
			const { email } = req.body;

			// buscar el usuario en la BD
			const usuario = await Usuario.findOne({ email: email });

			// si no lo encuentro --> error
			if (!usuario) {
				res.json({
					status: 400,
					error: 'No existe ese email en la base de datos',
				});

				return;
			}

			// si existe mandar crear token y el email
			const token = await jwt.sign(
				{ _id: usuario._id, email: usuario.email, userName: usuario.user },
				process.env.JWT_SECRET,
				{
					expiresIn: '1h',
				}
			);

			const port = 3000;
			// Configura nodemailer para enviar correos electrónicos
			// Construye la URL completa con el token
			const server_URL = process.env.SERVER_URL;
			const fullURL = `${server_URL}/recorderPassword/${token}`;
			const subject = 'Recuperacion Password';
			const text = process.env.TEXT_PASSWORD;

			//envio email
			SendEmail(email, subject, text, fullURL);

			res.json({
				jwt: token,
				_id: usuario._id,
				email: usuario.email,
				userName: usuario.user,
				msg: 'Correo electrónico enviado correctamente',
			});
		} catch (err) {
			next(err);
		}
	}
}
module.exports = PasswordController;
