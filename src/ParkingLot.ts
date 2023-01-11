import { VehicleTypes } from './Vehicle';
import { ParkingTypes } from './ParkingTypes';
import { ParkingCapacities } from './enums';
import { MallFeesModel, StadiumFeesModel, AirportFeesModel } from './Fees';
import { MallParking, StadiumParking, AirportParking, VehicularParking } from './VehicularParking';

export class ParkingLot {
    type: ParkingTypes;
    parkingCapacities: ParkingCapacities;
    parkingLots: { [key in VehicleTypes]?: VehicularParking } = {};
    constructor(type: ParkingTypes, parkingCapacities: ParkingCapacities) {
        this.type = type;
        this.parkingCapacities = parkingCapacities;
    }
}

export class MallParkingLot extends ParkingLot {
    constructor(parkingCapacities: ParkingCapacities) {
        super(ParkingTypes.MallParking, parkingCapacities);
        for (const [key, value] of Object.entries(parkingCapacities)) {
            let capacity = value;
            if (capacity && !isNaN(capacity)) {
                switch (key) {
                    case VehicleTypes.TwoWheeler: {
                        this.parkingLots[VehicleTypes.TwoWheeler] = new MallParking(VehicleTypes.TwoWheeler, capacity, new MallFeesModel(10));
                        break;
                    }
                    case VehicleTypes.FourWheeler: {
                        this.parkingLots[VehicleTypes.FourWheeler] = new MallParking(VehicleTypes.FourWheeler, capacity, new MallFeesModel(20));
                        break;
                    }
                    case VehicleTypes.MultiWheeler: {
                        this.parkingLots[VehicleTypes.MultiWheeler] = new MallParking(VehicleTypes.MultiWheeler, capacity, new MallFeesModel(50));
                        break;
                    }
                }
            }
        }
    }
}

export class StadiumParkingLot extends ParkingLot {
    constructor(parkingCapacities: ParkingCapacities) {
        super(ParkingTypes.StadiumParking, parkingCapacities);
        for (const [key, value] of Object.entries(parkingCapacities)) {
            let capacity = value;
            if (capacity && !isNaN(capacity)) {
                switch (key) {
                    case VehicleTypes.TwoWheeler: {
                        this.parkingLots[VehicleTypes.TwoWheeler] = new StadiumParking(VehicleTypes.TwoWheeler, capacity, new StadiumFeesModel(
                            [
                                { start: 0, end: 4, rate: 30 },
                                { start: 4, end: 12, rate: 60 },
                                { start: 12, end: Number.POSITIVE_INFINITY, rate: 100 }
                            ]
                        ));
                        break;
                    }
                    case VehicleTypes.FourWheeler: {
                        this.parkingLots[VehicleTypes.FourWheeler] = new StadiumParking(VehicleTypes.FourWheeler, capacity, new StadiumFeesModel(
                            [
                                { start: 0, end: 4, rate: 60 },
                                { start: 4, end: 12, rate: 120 },
                                { start: 12, end: Number.POSITIVE_INFINITY, rate: 200 }
                            ]));
                        break;
                    }
                    default: { break }
                }
            }
        }
    }
}

export class AirportParkingLot extends ParkingLot {
    constructor(parkingCapacities: ParkingCapacities) {
        super(ParkingTypes.AirportParking, parkingCapacities);
        for (const [key, value] of Object.entries(parkingCapacities)) {
            let capacity = value;
            if (capacity && !isNaN(capacity)) {
                switch (key) {
                    case VehicleTypes.TwoWheeler: {
                        this.parkingLots[VehicleTypes.TwoWheeler] = new AirportParking(VehicleTypes.TwoWheeler, capacity, new AirportFeesModel(
                            [
                                { start: 0, end: 1, rate: 0 },
                                { start: 1, end: 8, rate: 40 },
                                { start: 8, end: 12, rate: 60 },

                            ], 80
                        ));
                        break;
                    }
                    case VehicleTypes.FourWheeler: {
                        this.parkingLots[VehicleTypes.FourWheeler] = new AirportParking(VehicleTypes.FourWheeler, capacity, new AirportFeesModel(
                            [
                                { start: 0, end: 12, rate: 60 },
                                { start: 12, end: 24, rate: 80 },
                            ], 100
                        ));
                        break;
                    }
                    default: { break }
                }
            }
        }
    }
}


















