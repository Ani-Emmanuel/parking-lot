const fs = require('fs');

//read text file from the root folder
const readStream = fs.createReadStream(process.argv[2], { encoding: 'utf8' });

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
}