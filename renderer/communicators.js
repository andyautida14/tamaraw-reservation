'use strict';

import {Tour} from "./communicators/tour";
import {Reservation} from "./communicators/reservation";

var ipc = null;

angular.module("communicator")
.factory("ipc", function() {
	ipc = require("ipc");
	
	return {
		ipc: ipc
	};
})
.service("Tour", Tour)
.service("Reservation", Reservation);