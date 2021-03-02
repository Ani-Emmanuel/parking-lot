const fs = require('fs');

//creating parking lot class
class ParkingLot {
	constructor(size) {
		this.availableSpace = Array.from({ length: size }); // creating parking lot space
		console.log(`Created parking lot with ${this.availableSpace.length} slots`);
	}

	// Car parking method
	park(res) {
		const [label, plateNumber] = res.split(' ');
		let emptySlot = this._checkForAvailbleSpace();

		if (emptySlot === null) {
			console.log('\nSorry, parking lot is full \n');
		}

		let currentParkingCar = {
			plateNumber: plateNumber,
			color: null,
			slot_No: emptySlot
		};

		this.availableSpace[emptySlot] = currentParkingCar;
		console.log(`Allocated slot number: ${emptySlot + 1}`);
	}

	//Helper method to check for avaliable slot
	_checkForAvailbleSpace() {
		for (let index = 0; index < this.availableSpace.length; index++) {
			if (this.availableSpace[index] === undefined) {
				return index;
			}
		}
		return null;
	}

	//method for generating ticket
	generateTicket(doc) {
		console.log(
			`Slot No. ${doc.slot_No + 1}  Registration No. ${doc.plateNumber} \n`
		);
	}

	//car leaving method
	leaveParkingLot(res) {
		const [label, plateNumber, time] = res.split(' ');
		const doc = [];
		for (let x = 0; x < this.availableSpace.length; x++) {
			if (
				this.availableSpace[x] !== undefined &&
				this.availableSpace[x].plateNumber === plateNumber
			) {
				console.log(
					`Registration number ${
						this.availableSpace[x].plateNumber
					} with Slot Number ${
						this.availableSpace[x].slot_No + 1
					} is free with Charge ${this._timeCharge(Number(time))} \n`
				);

				this.availableSpace[x] = undefined;
				break;
			}

			//builds array of plate numbers
			if (this.availableSpace[x] !== undefined)
				doc.push(this.availableSpace[x].plateNumber);
		}

		//checks if the plateNumber is in the array of plate numbers
		if (!doc.includes(plateNumber)) {
			console.log(`Registration number ${plateNumber} not found`);
		}
	}

	//helper method for calculating price
	_timeCharge(time) {
		let price = 0;
		if (time > 2) {
			price = 10;
			for (let x = 0; x < time - 2; x++) {
				price += 10;
			}
			return price;
		} else {
			return (price += 10);
		}
	}

	//method to show parking lot status
	status() {
		const arr = [...this.availableSpace];
		console.log(`Slot No.   Registration No.`);
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] !== undefined)
				console.log(`${arr[i].slot_No + 1}          ${arr[i].plateNumber}`);
		}
	}
}

//read text file from the root folder
const readStream = fs.createReadStream(process.argv[2], { encoding: 'utf8' });

//reading value of the text file in chunks
readStream.on('data', (value) => {
	let result = value.split('\n');
	let parkingLot;
	result.forEach((res) => {
		if (res.charAt(0) === 'c') {
			parkingLot = new ParkingLot(6);
		} else if (res.charAt(0) === 'p') {
			parkingLot.park(res);
		} else if (res.charAt(0) === 'l') {
			parkingLot.leaveParkingLot(res);
		} else if (res.charAt(0) === 's') {
			parkingLot.status();
		}
	});
});
