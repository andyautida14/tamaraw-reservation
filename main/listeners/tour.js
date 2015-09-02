'use strict';

module.exports = (function(){
	return function(Tour) {
		var listener = {
			getTours: function(event) {
				Tour.getAll({
					order: [['for_date', 'ASC']]
				}).then(function(tours) {
					event.sender.send('all-tours', tours);
				});
			},
			createTour: function(event, tour) {
				Tour.create(tour)
				.then(function(new_tour) {
					event.sender.send('tour-created', new_tour);
				});
			},
			deleteTour: function(event, tour) {
				Tour.destroy({id: tour.id})
				.then(function() {
					event.sender.send('tour-destroyed', tour);
				});
			}
		};
		
		return listener;
	}
}());