import { ParkingTypes } from './ParkingTypes';

export abstract class FeesModel {
    feesType: ParkingTypes;
    constructor(feesType: ParkingTypes) {
        this.feesType = feesType;
    }
    abstract calculateFees(days: number, hours: number, minutes: number): number
}

type Increments = { start: number; end: number, rate: number };

const getTotalHours = (days: number, hours: number, minutes: number): number => ((24 * days + hours) + (minutes === 0 ? 0 : 1));

export class MallFeesModel extends FeesModel {
    rate: number;
    constructor(rate: number) {
        super(ParkingTypes.MallParking);
        this.rate = rate;
    }
    calculateFees(days: number, hours: number, minutes: number): number {
        const totalHours = getTotalHours(days, hours, minutes);
        return this.rate * totalHours;
    }
}

export class StadiumFeesModel extends FeesModel {
    increments: Increments[];
    constructor(increments: Increments[]) {
        super(ParkingTypes.StadiumParking);
        this.increments = increments;
    }
    calculateFees(days: number, hours: number, minutes: number): number {
        const totalHours = getTotalHours(days, hours, minutes), increments = this.increments;
        let applicableRateSlab = 0, applicableTimeSlabStartTime = 0, total = 0, isEndFound = false;
        for (let i = 0; i < increments.length; i++) {
            const { start, end, rate } = increments[i];
            applicableRateSlab = rate;
            applicableTimeSlabStartTime = start;
            if (end === Number.POSITIVE_INFINITY) {
                break
            }
            total += rate;
            if (totalHours <= end) {
                isEndFound = true;
                break;
            }
        }
        total += (isEndFound) ? 0 : applicableRateSlab * (totalHours - applicableTimeSlabStartTime);
        return total;
    }
}

export class AirportFeesModel extends FeesModel {
    perDayRate: number;
    increments: Increments[];
    constructor(increments: Increments[], perDayRate: number) {
        super(ParkingTypes.AirportParking);
        this.increments = increments;
        this.perDayRate = perDayRate;
    }
    calculateFees(days: number, hours: number, minutes: number): number {
        if (days > 0) {
            return (days + 1) * this.perDayRate;
        }
        const totalHours = getTotalHours(days, hours, minutes), increments = this.increments;
        let applicableRateSlab = 0, total = 0, isEndFound = false;
        for (let i = 0; i < increments.length; i++) {
            const { end, rate } = increments[i];
            applicableRateSlab = rate;
            if (end === Number.POSITIVE_INFINITY) {
                break;
            }
            if (totalHours <= end) {
                total += rate;
                isEndFound = true;
                break;
            }
        }
        total += (isEndFound) ? 0 : applicableRateSlab;
        return total;
    }
}














