const express = require('express');
const router = express.Router();
const multer = require('multer');

const Travels = require('../../models/Travels');
const User = require('../../models/users');
const Chat = require('../../models/chats');
const upload = multer({ dest: 'uploads/' });

// POST /api/chat/view/:user Return a travels find by user.
router.post('/view', upload.array('files'), async function (req, res, next) {
	try {
		const userName = req.body.user;
		const userData = await User.findOne({ user: userName });
		const userId = userData._id.toString();

		// Buscar los mensajes donde userId coincide con fromUserId o toUserId
		const messages = await Chat.find({
			$or: [{ fromUserId: userId }, { toUserId: userId }],
		});

		if (!messages.length) {
			return res.json({ status: 'KO', result: [] });
		}

		// Crear un objeto para almacenar los resultados finales
		const data = {};

		// Recorrer cada mensaje y obtener la información del anuncio relacionado
		for (const message of messages) {
			const travelId = message.travelId;

			// Verificar si el anuncio ya está en el objeto de datos
			if (!data[travelId]) {
				// Si no existe, obtén la información del anuncio desde la colección de viajes
				const travel = await Travels.findOne({ _id: travelId });

				if (travel) {
					data[travelId] = {
						travelId: travel._id,
						travelName: travel.topic,
						ownerId: travel.userId,
						ownerName: travel.userName,
						travelchat: [],
						pending: false, // Inicialmente, no hay mensajes pendientes
					};
				}
			}

			// Formatear el mensaje y agregarlo al array travelchat
			const sender = await User.findOne({ _id: message.fromUserId });
			const receiver = await User.findOne({ _id: message.toUserId });

			data[travelId].travelchat.push({
				date: message.chatDatetime.toDateString(),
				time: message.chatDatetime.toTimeString(),
				text: message.chatText,
				senderId: sender._id,
				senderName: sender.user,
				receiverId: receiver._id,
				receiverName: receiver.user,
			});

			// Verificar si el mensaje tiene readByUser en false y el usuario está en toUserId
			if (!message.readByUser && message.toUserId === userId) {
				data[travelId].pending = true; // Establecer pending en true si hay mensajes pendientes
			}
		}

		// Convierte el objeto en un array de resultados
		const result = Object.values(data);

		res.json({ status: 'OK', result });
	} catch (error) {
		res.json({ status: 400, message: 'Error retrieving data' });
	}
});

// POST /api/chat/set/:user Return a travels find by user.
router.post(
	'/set',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const travelId = req.body.travelId;
			const fromUserId = req.body.fromUserId;
			const toUserId = req.body.toUserId;
			const chatDatetime = req.body.chatDatetime;
			const chatText = req.body.chatText;
			const readByUser = req.body.readByUser;

			const newChat = new Chat({
				travelId: travelId,
				fromUserId: fromUserId,
				toUserId: toUserId,
				chatDatetime: chatDatetime,
				chatText: chatText,
				readByUser: false,
			});

			const chatSave = await newChat.save();

			res.json({ status: 'OK', result: chatSave });
		} catch (error) {
			res.json({ status: 400, message: 'Error retrieving data' });
		}
	}
);

// POST /api/chat/review Return a chat find by user an abs.
router.post(
	'/review',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const travelId = req.body.travelId;
			const userId = req.body.userId;

			const result = await Chat.updateMany(
				{ travelId: travelId, toUserId: userId },
				{ readByUser: true }
			);

			res.json({ status: 'OK', result: result });
		} catch (error) {
			res.json({ status: 400, message: 'Error retrieving data' });
		}
	}
);

// POST /api/chat/read Return a chat find by user and readByUser.
router.post(
	'/read',
	upload.array('files'),

	async function (req, res, next) {
		try {
			const userId = req.body.userId;
			const result = await Chat.find({ toUserId: userId, readByUser: false });

			res.json({ status: 'OK', result: result });
		} catch (error) {
			res.json({ status: 400, message: 'Error retrieving data' });
		}
	}
);

module.exports = router;
