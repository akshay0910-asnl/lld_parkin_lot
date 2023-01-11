import { VehicleTypes, VehicleType } from './Vehicle';
import { ParkingTypes } from './ParkingTypes';
import { ParkingCapacities } from './enums';
import { ParkingLot, MallParkingLot, StadiumParkingLot, AirportParkingLot } from './ParkingLot';
import { AirportParking, MallParking, StadiumParking, VehicularParking } from './VehicularParking';

export const getDifferenceInDates = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const hours = diffHours - diffDays * 24;
    const minutes = diffMinutes % 60;
    console.log({ days: diffDays, hours, minutes });
    return { days: diffDays, hours, minutes };
}

export class ParkingTicket {
    type: VehicleTypes;
    ticketNumber: number;
    spotNumber: number;
    entryDate: Date;
    constructor(type: VehicleTypes, ticketNumber: number, spotNumber: number, entryDate: Date) {
        this.type = type;
        this.ticketNumber = ticketNumber;
        this.spotNumber = spotNumber;
        this.entryDate = entryDate;
    }
}

export class ParkingReceipt {
    type: VehicleTypes;
    receiptNumber: number;
    entryDate: Date;
    exitDate: Date;
    fees: Number;
    constructor(type: VehicleTypes, receiptNumber: number, entryDate: Date, exitDate: Date, fees: Number) {
        this.type = type;
        this.receiptNumber = receiptNumber;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
        this.fees = fees;
    }
}

export class ParkingSystem {
    parkingType: ParkingTypes;
    parkingCapacities: ParkingCapacities;
    parkingLot: ParkingLot;
    parkingTickets: ParkingTicket[];
    parkingReceipts: ParkingReceipt[];
    ticketNumber: number = 0;
    receiptNumber: number = 0;
    constructor(parkingType: ParkingTypes, parkingCapacities: ParkingCapacities) {
        this.parkingType = parkingType;
        this.parkingCapacities = parkingCapacities;
        this.parkingTickets = [];
        this.parkingReceipts = [];
        switch (parkingType) {
            case ParkingTypes.MallParking: {
                this.parkingLot = new MallParkingLot(parkingCapacities);
                break;
            }
            case ParkingTypes.StadiumParking: {
                this.parkingLot = new StadiumParkingLot(parkingCapacities);
                break;
            }
            case ParkingTypes.AirportParking: {
                this.parkingLot = new AirportParkingLot(parkingCapacities);
                break;
            }
        }
    }

    parkVehicle(vehicle: VehicleType, entryDate: Date) :ParkingTicket | undefined {
        const relevantParkingLot = this.getRelevantParkingLot(vehicle);
        if (relevantParkingLot) {
            const parkingSpot = relevantParkingLot.allocateSpotForParking();
            if (parkingSpot < 0) {
                console.log(`No space available`);
                return;
            }
            const parkingTicket = new ParkingTicket(vehicle.type, ++this.ticketNumber, parkingSpot, entryDate);
            this.displayParkingTicket(parkingTicket);
            this.parkingTickets.push(parkingTicket);
            return parkingTicket;
        }
    }

    unParkVehicle(vehicle: VehicleType, ticketNumber: number, exitDate: Date): ParkingReceipt | undefined {
        if (!this.parkingTickets[ticketNumber - 1]) { return; }
        const { spotNumber, entryDate } = this.parkingTickets[ticketNumber-1];
        const relevantParkingLot = this.getRelevantParkingLot(vehicle);
        if (relevantParkingLot) {
            const { days, hours, minutes } = getDifferenceInDates(exitDate, entryDate);
            const fees = relevantParkingLot.feesModel.calculateFees(days, hours, minutes);
            relevantParkingLot.unAllocateSpotForParking(spotNumber);
            const parkingReceipt = new ParkingReceipt(vehicle.type, ++this.receiptNumber, entryDate, exitDate, fees);
            this.displayParkingReceipt(parkingReceipt);
            this.parkingReceipts.push(parkingReceipt);
            return parkingReceipt;
        }
    }

    displayParkingTicket(ticket: ParkingTicket) {
        console.log(`Parking Ticket:`);
        console.group();
        console.log(`Ticket Number: ${ticket.ticketNumber}`);
        console.log(`Spot Number: ${ticket.spotNumber}`);
        console.log(`Entry Date: ${ticket.entryDate.toDateString()}`);
        console.groupEnd();
    }

    displayParkingReceipt(receipt: ParkingReceipt) {
        console.log(`Parking Receipt:`);
        console.group();
        console.log(`Receipt Number: ${receipt.receiptNumber}`);
        console.log(`Entry Date: ${receipt.entryDate.toDateString()}`);
        console.log(`Exit Date: ${receipt.exitDate.toDateString()}`);
        console.log(`Fees: ${receipt.fees}`);
        console.groupEnd();
    }

    getRelevantParkingLot(vehicle: VehicleType) {
        switch (this.parkingType) {
            case ParkingTypes.MallParking: {
                return this.parkingLot.parkingLots[vehicle.type] as MallParking;
            }
            case ParkingTypes.StadiumParking: {
                return this.parkingLot.parkingLots[vehicle.type] as StadiumParking;
            }
            case ParkingTypes.AirportParking: {
                return this.parkingLot.parkingLots[vehicle.type] as AirportParking;
            }
        }
    }
}






