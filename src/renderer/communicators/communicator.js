class Communicator {
	constructor(ipc, q) {
		this._ipc = ipc.ipc;
		this._q = q;
	}
	
	send(channel, arg) {
		var ipc = this._ipc;
		
		return this._q(function(resolve, reject) {
			var result = ipc.sendSync(channel, arg);
			
			if(result) {
				resolve(result);
			} else {
				reject("Unknown error occured.");
			}
		});
	}
}

export {Communicator};