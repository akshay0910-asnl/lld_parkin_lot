import { ParkingSystem } from '../src/ParkingSystem';
import { VehicleTypes, Motorcycle, Scooter, Car, SUV, Bus, Truck } from '../src/Vehicle';
import { ParkingTypes } from '../src/ParkingTypes';


describe("Mall Parking", () => {
	const mallParking = new ParkingSystem(ParkingTypes.MallParking, {
		[VehicleTypes.TwoWheeler]: 1,
		[VehicleTypes.FourWheeler]: 1,
		[VehicleTypes.MultiWheeler]: 1
	});

	describe("Vehicular Parking", () => {
		afterEach(() => { jest.restoreAllMocks(); });
		let spotNumber: number;

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = mallParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = mallParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
		});

		test("should not park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = mallParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const totalSpots = relevantParkingLot.totalSpots;
			const parkingTicket = mallParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			if (totalSpots === initialNoOfOccupiedSpots) {
				expect(spyFn).toHaveBeenCalledTimes(0);
				expect(parkingTicket).toBeFalsy();
				expect(finalNoOfOccupiedSpots).toEqual(initialNoOfOccupiedSpots);
			}
		});

		test("should unpark two wheeler and display the parking receipt", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingReceipt');
			const relevantParkingLot = mallParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingReceipt = mallParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingReceipt?.fees).toBeGreaterThan(0);
			expect(parkingReceipt?.receiptNumber).toBeGreaterThan(0);
			expect(initialNoOfOccupiedSpots).toBeGreaterThan(finalNoOfOccupiedSpots);
		});

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = mallParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = mallParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
			mallParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
		});

	});

	describe("Parking charge",() => {

		test("should calculate correct parking charge for a two-wheeler", () => {
			let parkingTicket = mallParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = mallParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 10, 30));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(40);
		});

		test("should calculate correct parking charge for a four-wheeler", () => {
			let parkingTicket = mallParking.parkVehicle(Car, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = mallParking.unParkVehicle(Car, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 10, 30));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(80);
		});

		test("should calculate correct parking charge for a multi-wheeler", () => {
			let parkingTicket = mallParking.parkVehicle(Bus, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = mallParking.unParkVehicle(Bus, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 10, 30));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(200);
		});

	});

});

describe("Stadium Parking", () => {
	const stadiumParking = new ParkingSystem(ParkingTypes.StadiumParking, {
		[VehicleTypes.TwoWheeler]: 1,
		[VehicleTypes.FourWheeler]: 1,
		[VehicleTypes.MultiWheeler]: 1
	});

	describe("Vehicular Parking", () => {
		afterEach(() => { jest.restoreAllMocks(); });
		let spotNumber: number;

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = stadiumParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = stadiumParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
		});

		test("should not park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = stadiumParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const totalSpots = relevantParkingLot.totalSpots;
			const parkingTicket = stadiumParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			if (totalSpots === initialNoOfOccupiedSpots) {
				expect(spyFn).toHaveBeenCalledTimes(0);
				expect(parkingTicket).toBeFalsy();
				expect(finalNoOfOccupiedSpots).toEqual(initialNoOfOccupiedSpots);
			}
		});

		test("should unpark two wheeler and display the parking receipt", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingReceipt');
			const relevantParkingLot = stadiumParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingReceipt = stadiumParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingReceipt?.fees).toBeGreaterThan(0);
			expect(parkingReceipt?.receiptNumber).toBeGreaterThan(0);
			expect(initialNoOfOccupiedSpots).toBeGreaterThan(finalNoOfOccupiedSpots);
		});

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = stadiumParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = stadiumParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
			stadiumParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
		});

	});

	describe("Parking charge",() => {

		test("should calculate correct parking charge for a two-wheeler", () => {
			let parkingTicket = stadiumParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = stadiumParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 11, 4));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(30);
			parkingTicket = stadiumParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = stadiumParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 22, 23));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(390);
		});

		test("should calculate correct parking charge for a four-wheeler", () => {
			let parkingTicket = stadiumParking.parkVehicle(Car, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = stadiumParking.unParkVehicle(Car, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 18, 54));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(180);
			parkingTicket = stadiumParking.parkVehicle(SUV, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = stadiumParking.unParkVehicle(SUV, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 20, 29));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(580);
		});

	});
});

describe("Airport Parking", () => {
	const airportParking = new ParkingSystem(ParkingTypes.AirportParking, {
		[VehicleTypes.TwoWheeler]: 1,
		[VehicleTypes.FourWheeler]: 1,
		[VehicleTypes.MultiWheeler]: 1
	});

	describe("Vehicular Parking", () => {
		afterEach(() => { jest.restoreAllMocks(); });
		let spotNumber: number;

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = airportParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
		});

		test("should not park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = airportParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const totalSpots = relevantParkingLot.totalSpots;
			const parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			if (totalSpots === initialNoOfOccupiedSpots) {
				expect(spyFn).toHaveBeenCalledTimes(0);
				expect(parkingTicket).toBeFalsy();
				expect(finalNoOfOccupiedSpots).toEqual(initialNoOfOccupiedSpots);
			}
		});

		test("should unpark two wheeler and display the parking receipt", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingReceipt');
			const relevantParkingLot = airportParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingReceipt = airportParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingReceipt?.fees).toBeGreaterThan(0);
			expect(parkingReceipt?.receiptNumber).toBeGreaterThan(0);
			expect(initialNoOfOccupiedSpots).toBeGreaterThan(finalNoOfOccupiedSpots);
		});

		test("should park vehicle and display the parking ticket", () => {
			const spyFn = jest.spyOn(ParkingSystem.prototype, 'displayParkingTicket');
			const relevantParkingLot = airportParking.getRelevantParkingLot(Motorcycle);
			const initialNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			const parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			spotNumber = (parkingTicket) ? parkingTicket.spotNumber : -1;
			const finalNoOfOccupiedSpots = relevantParkingLot.noOfSpotsOccupied;
			expect(spyFn).toHaveBeenCalled();
			expect(parkingTicket).toBeTruthy();
			expect(parkingTicket?.type).toBe(VehicleTypes.TwoWheeler);
			expect(parkingTicket?.spotNumber).toBeGreaterThan(0);
			expect(finalNoOfOccupiedSpots).toBeGreaterThan(initialNoOfOccupiedSpots);
			airportParking.unParkVehicle(Motorcycle, spotNumber, new Date(2023, 1, 11, 10, 30));
		});

	});

	describe("Parking charge",() => {

		test("should calculate correct parking charge for a two-wheeler", () => {
			let parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = airportParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 8, 14));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(0);
			parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = airportParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 22, 23));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(60);
			parkingTicket = airportParking.parkVehicle(Motorcycle, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = airportParking.unParkVehicle(Motorcycle, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 12, 19, 24));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(160);
		});

		test("should calculate correct parking charge for a four-wheeler", () => {
			let parkingTicket = airportParking.parkVehicle(Car, new Date(2023, 1, 11, 7, 24));
			let parkingReceipt = airportParking.unParkVehicle(Car, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 11, 8, 19));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(60);
			parkingTicket = airportParking.parkVehicle(SUV, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = airportParking.unParkVehicle(SUV, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 12, 7, 23));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(80);
			parkingTicket = airportParking.parkVehicle(SUV, new Date(2023, 1, 11, 7, 24));
			parkingReceipt = airportParking.unParkVehicle(SUV, parkingTicket ?parkingTicket.spotNumber:0, new Date(2023, 1, 14, 8, 24));
			expect(parkingReceipt).toBeTruthy();
			expect(parkingReceipt?.fees).toEqual(400);
		});

	});
})