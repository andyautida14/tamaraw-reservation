'use strict';

module.exports = (function(){
	return function(Tour) {
		var listener = {
			getTours: function(event) {
				Tour.getAll({
					order: [['for_date', 'ASC']]
				}).then(function(tours) {
					event.returnValue = tours;
				});
			},
			createTour: function(event, tour) {
				Tour.create(tour)
				.then(function(new_tour) {
					event.returnValue = new_tour;
				});
			},
			deleteTour: function(event, tour) {
				Tour.destroy({id: tour.id})
				.then(function() {
					event.returnValue = tour;
				});
			}
		};
		
		return listener;
	}
}());