
export const MAX_CAR_ACCELERATION_LEVEL = 3; // m/s
export const MAX_CAR_BRAKE_LEVEL = 6; // m/s
export const MAX_CAR_SPEED = 45 // m/s

export type CarParameters = {
  speed?: number;
  odometer?: number;
}

export class Car {
  private odometer = 0;
  private speed = 0;
  private accelerationLevel = 0;
  private brakeLevel = 0;

  constructor(parameters: CarParameters = {}) {
    this.speed = parameters.speed || this.speed;
    this.odometer = parameters.odometer || this.odometer;
  }

  set acceleration(level: number) {
    this.accelerationLevel = Math.max(Math.min(level, MAX_CAR_ACCELERATION_LEVEL), 0);
  }

  set break(level: number) {
    this.brakeLevel = Math.max(Math.min(level, MAX_CAR_BRAKE_LEVEL), 0);
  }

  get acceleration() {
    return this.accelerationLevel;
  }

  get break() {
    return this.brakeLevel;
  }

  getOdometer() {
    return this.odometer;
  }

  getSpeed() {
    return this.speed;
  }

  update(deltaTime: number) {
    const deltaSpeed = (this.accelerationLevel - this.brakeLevel) * deltaTime;

    this.odometer += Math.max((this.speed + deltaSpeed / 2) * deltaTime, 0);
    this.speed = Math.max(Math.min(this.speed + deltaSpeed, MAX_CAR_SPEED), 0);
  }
}