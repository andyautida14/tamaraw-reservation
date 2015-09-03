'use strict';

import {Tour} from "./renderer/communicators/tour.js";
import {Reservation} from "./renderer/communicators/reservation.js";

var ipc = null;

angular.module("communicators", [])
.factory("ipc", function() {
	ipc = require("ipc");
	
	return {
		ipc: ipc
	};
})
.service("Tour", Tour)
.service("Reservation", Reservation);