const moongose = require('mongoose');

const favoritesSchema = moongose.Schema({
	userId: String,
	travelId: String,
});

// Creación de un índice sobre aquellos campos por los que se van a realizar búsquedas.

favoritesSchema.index({ userId: 1 });
favoritesSchema.index({ travelId: 1 });

favoritesSchema.statics.list = function (filter, limit, skip, sort, select) {
	const query = Favorites.find(filter);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(select);
	return query.exec();
};

const Favorites = moongose.model('favorites', favoritesSchema);

module.exports = Favorites;
