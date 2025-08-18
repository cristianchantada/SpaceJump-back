const nodemailer = require('nodemailer');

const SendMail = (emailTo, subject, text, fullURL = '') => {
	// Configura el transporte de correo
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_PASSWORD,
			pass: process.env.PASSWOR_REMEMBER,
		},
	});

	// Detalles del correo electrónico
	const mailOptions = {
		from: process.env.EMAIL_PASSWORD,
		to: emailTo,
		subject: subject,
		text: `${text} ${fullURL} `, //`Le escribimos de la App Space Jump para reestablecer la contraseña pinche el siguiente link:  ${fullURL}`
		//passw,
	};

	// Envía el correo electrónico
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error al enviar el correo:', error);
			res.json({ error: error, msg: 'Correo electrónico no enviado' });
		} else {
			console.log('Correo electrónico enviado:', info.response);
			res.json({
				status: 200,
				msg: 'Correo electrónico enviado correctamente',
			});
		}
	});
};
module.exports = SendMail;
