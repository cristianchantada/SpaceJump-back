const SendEmail = require('../models/sendEmail');
const Usuario = require('../models/users.js');

class SendEmailContact {
	async sendEmail(req, res, next) {
		try {
			const data = req.body;
			// buscar el usuario en la BD
			const usuario = await Usuario.findOne({ user: data.user });

			// si no lo encuentro --> error
			if (!usuario) {
				res.json({
					status: 400,
					error: 'No existe ese usuario en la base de datos',
				});
				return;
			}

			// si existe mandar el email

			const port = 3000;

			// Configura nodemailer para enviar correos electrónicos

			// Construye la URL completa con el token
			const email = usuario.email;
			const subject = `Contacto Viaje solicitado`;
			const text = `Le escribimos desde la Aplicacion Space Jump para comunicarle que el usuario ${data.name} le ha dejado el siguiente mensaje
                            correspondiente al anuncio publicado
                            Nombre: ${data.name} ${data.surnames}
                            Empresa: ${data.companyName}
                            Consulta: ${data.textEmail}`;

			//envio email

			SendEmail(email, subject, text);

			res.json({
				status: 'ok',
				msg: 'Correo electrónico enviado correctamente',
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = SendEmailContact;
