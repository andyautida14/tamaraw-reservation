'use strict';

import {Communicator} from "./communicator";

class Tour extends Communicator {
	constructor(ipc, $q) {
		super(ipc, $q);
	}
	
	get all() {
		return this.send("get-tours");
	}
	
	create(tour) {
		return this.send("create-tour", tour);
	}
	
	delete(tour) {
		return this.send("delete-tour", tour);
	}
}

export {Tour};