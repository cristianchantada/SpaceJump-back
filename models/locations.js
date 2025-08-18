const moongose = require('mongoose');

const locationsSchema = moongose.Schema({
	name: String,
});

locationsSchema.statics.list = function (filter, limit, skip, sort, select) {
	const query = Locations.find(filter);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(select);
	return query.exec();
};

const Locations = moongose.model('Locations', locationsSchema);

module.exports = Locations;
