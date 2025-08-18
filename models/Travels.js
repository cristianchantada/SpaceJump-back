const moongose = require('mongoose');

const travelsSchema = moongose.Schema({
	topic: { type: String, required: true },
	origin: { type: String, required: true },
	destination: { type: String, required: true },
	remarks: String,
	price: { type: Number, required: true },
	forSale: { type: Boolean, required: true },
	active: { type: Boolean, required: true },
	photo: String,
	userId: { type: String, required: true },
	userName: { type: String, required: true },
	String,
	active: { type: Boolean, required: true },
	userBuyer: [String],
	datetimeCreation: { type: Date, required: true },
	favorite: Boolean,
	datetimeDeparture: { type: Date, required: true },
	availableSeats: Number,
	soldSeats: Number,
});

// Creación de un índice sobre aquellos campos por los que se van a realizar búsquedas.

travelsSchema.index({ photo: 1 });
travelsSchema.index({ userId: 1 });
travelsSchema.index({ userBuyer: 1 });
travelsSchema.index({ datetimeDeparture: 1 });

travelsSchema.statics.list = function (filter, limit, skip, sort, select) {
	const query = Travels.find(filter);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(select);
	return query.exec();
};

const Travels = moongose.model('Travels', travelsSchema);

module.exports = Travels;
