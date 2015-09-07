'use strict';

module.exports = (function(){
	var Sequelize = require('sequelize');
	
	var sequelize = new Sequelize("tamaraw", "root", "", {
		dialect: "mariadb",
		host: "localhost",
		port: 3306
	});
	
	var Tour = sequelize.import(__dirname + "/models/tour");
	var Reservation = sequelize.import(__dirname + "/models/reservation");
	
	Tour.hasMany(Reservation, {as: "reservations", foreignKey: "tour_id"});
	Reservation.belongsTo(Tour);
	
	return {
		database: sequelize,
		Tour: Tour,
		Reservation: Reservation
	};
}());