import { VehicleTypes } from './Vehicle';
import { MallFeesModel, StadiumFeesModel, AirportFeesModel } from './Fees';

const generateOccupancyArea = (spots: number) => {
    let arr: boolean[] = []
    for (let i = 0; i < spots; i++) {
        arr.push(false);
    }
    return arr;
}

export class VehicularParking {
    type: VehicleTypes;
    totalSpots: number;
    spotsOccupancy: boolean[];
    noOfSpotsOccupied = 0;
    constructor(type: VehicleTypes, totalSpots: number) {
        this.type = type;
        this.totalSpots = totalSpots;
        this.spotsOccupancy = generateOccupancyArea(totalSpots);
    }

    allocateSpotForParking(): number {
        if (this.noOfSpotsOccupied === this.totalSpots) {
            return -1;
        }
        for (let i = 0; i < this.totalSpots; i++) {
            if (!this.spotsOccupancy[i]) {
                this.spotsOccupancy[i] = true;
                this.noOfSpotsOccupied++;
                return i + 1;
            }
        }
        return -1;
    }

    unAllocateSpotForParking(spotNumber: number): void {
        if (this.spotsOccupancy[spotNumber - 1]) {
            this.spotsOccupancy[spotNumber - 1] = false;
            this.noOfSpotsOccupied--;
        }
    }

}

export class MallParking extends VehicularParking {
    feesModel: MallFeesModel;
    constructor(type: VehicleTypes, totalSpots: number, feesModel: MallFeesModel) {
        super(type, totalSpots);
        this.feesModel = feesModel;
    }
}

export class StadiumParking extends VehicularParking {
    feesModel: StadiumFeesModel;
    constructor(type: VehicleTypes, totalSpots: number, feesModel: StadiumFeesModel) {
        super(type, totalSpots);
        this.feesModel = feesModel;
    }
}

export class AirportParking extends VehicularParking {
    feesModel: AirportFeesModel;
    constructor(type: VehicleTypes, totalSpots: number, feesModel: AirportFeesModel) {
        super(type, totalSpots);
        this.feesModel = feesModel;
    }
}