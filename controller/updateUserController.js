const Usuario = require('../models/users.js');
const User = require('../models/users');

class UpdateUserController {
	async updateUser(req, res, next) {
		try {
			const { email, password, user } = req.body;

			// buscar el usuario en la BD

			let usuario = await Usuario.findOne({ email: email });
			const repetidoUser = await Usuario.findOne({ user: user });
			if (user === repetidoUser?.user && email !== repetidoUser?.email) {
				res.json({ status: 400, error: 'Usuario repetido' });
				return;
			} else {
				if (!!password) {
					usuario = await Usuario.findOneAndUpdate(
						{ email: email },
						{ password: await User.hashPassword(password), user: user }
					);

					// si no lo encuentro o no coincide la contraseña --> error
					if (!usuario) {
						res.json({
							status: 400,
							error: 'No existe ese email en la base de datos',
						});

						return;
					}
				} else {
					usuario = await Usuario.findOneAndUpdate(
						{ email: email },
						{ user: user }
					);
					if (!usuario) {
						res.json({
							status: 400,
							error: 'No existe ese email en la base de datos',
						});

						return;
					}
				}
			}
			usuario = await Usuario.findOne({ email: email });
			res.json({
				status: 200,
				msg: 'Datos actualizados correctamente',
				userName: usuario.user,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = UpdateUserController;
