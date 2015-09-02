'use strict';

module.exports = (function(){
	return function(Reservation) {
		var listener = {
			tourReservationsCount: function(event, tour) {
				Reservation.count({
					where: {tour_id: tour.id}
				}).then(function(count) {
					event.returnValue = {
						tour_id: tour.id,
						count: count
					};
				});
			},
			tourReservations: function(event, tour) {
				Reservation.findAll({
					where: {tour_id: tour.id}
				}).then(function(reservations) {
					event.returnValue = {
						tour_id: tour.id,
						reservations: reservations
					};
				});
			},
			reservationCreate: function(event, reservation) {
				Reservation.create(reservation)
				.then(function(res) {
					event.returnValue = res;
				});
			},
			reservationDelete: function(event, reservation) {
				Reservation.destroy({
					where: {id: reservation.id}
				}).then(function() {
					event.returnValue = reservation;
				});
			}
		};
		
		return listener;
	}
}());