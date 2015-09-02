'use strict';

module.exports = (function(){
	var Tour = require(__dirname + "/listeners/tour.js");
	var Reservation = require(__dirname + "/listeners/reservation.js");

	var listener = {
		listen: function(ipc, Models) {
			var tour = Tour(Models.Tour);
			var reservation = Reservation(Models.Reservation);
		
			ipc.on('get-tours', tour.getTours);
			ipc.on('create-tour', tour.createTour);
			ipc.on('delete-tour', tour.deleteTour);
			ipc.on('tour-reservations', reservation.tourReservations);
			ipc.on('tour-reservations-count', reservation.tourReservationsCount);
			ipc.on('reservation-create', reservation.reservationCreate);
			ipc.on('reservation-delete', reservation.reservationDelete);
		}
	};
	
	return listener;
}());