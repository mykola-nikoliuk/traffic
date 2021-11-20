import * as chai from 'chai';
import { Car, MAX_CAR_ACCELERATION_LEVEL, MAX_CAR_SPEED } from './Car';

const expect = chai.expect;
describe('Car', () => {

  let car: Car;

  beforeEach(() => {
    car = new Car();
  });

  it('should set speed equal to acceleration', () => {
    const acceleration = 2;
    car.acceleration = acceleration;
    car.update(1);

    expect(car.getSpeed()).to.equal(acceleration);
  });

  it('should acceleration be less then MAX_CAR_ACCELERATION_LEVEL', () => {
    car.acceleration = MAX_CAR_ACCELERATION_LEVEL + 1;
    car.update(1);

    expect(car.getSpeed()).to.equal(MAX_CAR_ACCELERATION_LEVEL);
  });

  it('should accumulate odometer', () => {
    const acceleration = 2;
    const time = 2;
    car.acceleration = acceleration;
    car.update(time);

    expect(car.getOdometer()).to.equal(acceleration * time);
  });

  it('should accelerate and stop', () => {
    const acceleration = 2;
    const time = 1;
    car.acceleration = acceleration;
    car.update(time * 2);
    car.acceleration = 0;
    car.break = acceleration * 2
    car.update(time);

    expect(car.getSpeed()).to.equal(0);
  });

  it('should accelerate on each update', () => {
    const acceleration = 2;
    let updates = 3;
    const resultSpeed = acceleration * updates;
    car.acceleration = acceleration;

    while (updates--) {
      car.update(1);
    }
    expect(car.getSpeed()).to.equal(resultSpeed);
  });

  it('should set initial speed and odometer', () => {
    const params = { speed: 10, odometer: 100 };
    car = new Car(params);
    expect({ speed: car.getSpeed(), odometer: car.getOdometer() }).to.deep.equal(params);
  });

  it('should reach max speed', () => {
    const time = MAX_CAR_SPEED / MAX_CAR_ACCELERATION_LEVEL + 1;
    car.acceleration = MAX_CAR_ACCELERATION_LEVEL;
    car.update(time);
    expect(car.getSpeed()).to.deep.equal(MAX_CAR_SPEED);
  });

  it('should newer less 0', () => {
    car.break = 1;
    car.update(1);
    expect(car.getSpeed()).to.deep.equal(0);
  });

});