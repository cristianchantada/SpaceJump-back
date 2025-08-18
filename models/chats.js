const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
	travelId: { type: String, required: true },
	fromUserId: { type: String, required: true }, // usuario que envia el mensaje
	toUserId: { type: String, required: true }, // usuario que envia el mensaje
	chatDatetime: { type: Date, required: true },
	chatText: { type: String, required: true },
	readByUser: { type: Boolean, required: true }, // cuando lo lee el otro usuario: true, el usuario destinatario
});

chatsSchema.statics.list = function (filter, limit, skip, sort, select) {
	const query = Chats.find(filter);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(select);
	return query.exec();
};

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;
