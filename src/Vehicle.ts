export enum VehicleTypes {
    TwoWheeler = 'Two Wheeler',
    FourWheeler = 'Four Wheeler',
    MultiWheeler = 'Multi Wheeler'
}

export class VehicleType {
    type: VehicleTypes;
    constructor(type: VehicleTypes) {
        this.type = type;
    }
}

export class TwoWheeler extends VehicleType {
    name: string;
    constructor(name: string) {
        super(VehicleTypes.TwoWheeler);
        this.name = name;
    }
}

export class FourWheeler extends VehicleType {
    name: string;
    constructor(name: string) {
        super(VehicleTypes.FourWheeler);
        this.name = name;
        this.name = name;
    }
}

export class MultiWheeler extends VehicleType {
    name: string;
    constructor(name: string) {
        super(VehicleTypes.MultiWheeler);
        this.name = name;
        this.name = name;
    }
}

export const Motorcycle = new TwoWheeler('Motorcycle');
export const Scooter = new TwoWheeler('Scooter');
export const Car = new FourWheeler('Car');
export const SUV = new FourWheeler('SUV');
export const Bus = new MultiWheeler('Bus');
export const Truck = new MultiWheeler('Truck');






