import { Car } from './Car';

export type DriverParameters = {
  breakMultiplier?: number;
  accelerationMultiplier?: number;
};

export class Driver {
  private breakMultiplier = 0;
  private accelerationMultiplier = 0;

  constructor(private car: Car, parameters: DriverParameters = {}) {
    this.accelerationMultiplier = parameters.accelerationMultiplier || this.accelerationMultiplier;
    this.breakMultiplier = parameters.breakMultiplier || this.breakMultiplier;
  };

  increaseAccelerationMultiplier(value: number): void {
    this.accelerationMultiplier += value;
  }
  increaseBreakMultiplier(value: number): void {
    this.breakMultiplier += value;
  }

  changeCar(car: Car) {
    this.car = car;
  }

  update({ distance }: { distance: number }) {
    this.car.break = 1 / distance * this.breakMultiplier;
    this.car.acceleration = distance * this.accelerationMultiplier;
  }
}