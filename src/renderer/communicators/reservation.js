'use strict';

import {Communicator} from "./communicator";

class Reservation extends Communicator {
	constructor(ipc, $q) {
		super(ipc, $q);
	}
	
	byTour(tour) {
		return this.send("tour-reservations", tour);
	}
	
	countByTour(tour) {
		return this.send("tour-reservations-count", tour)
	}
	
	create(reservation) {
		return this.send("reservation-create", reservation);
	}
	
	delete(reservation) {
		return this.send("reservation-delete", reservation);
	}
}

export {Reservation};