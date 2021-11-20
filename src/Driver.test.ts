import * as chai from 'chai';
import { Car } from './Car';
import { Driver } from './Driver';

const expect = chai.expect;


describe('Driver', () => {

  let driver: Driver;

  beforeEach(() => {
    const car = new Car();
    driver = new Driver(car);
  });

  it('should change break level according distance', () => {
    const speed = 10;
    const distance = 10;
    const multiplier = 0.01;

    const car = new Car({ speed });
    driver.increaseBreakMultiplier(multiplier);
    driver.changeCar(car);
    driver.update({
      distance,
    });

    expect(car.break).to.equal(distance * multiplier);
  });

  it('should change acceleration level according distance', () => {
    const speed = 20;
    const distance = 20;
    const multiplier = 0.001;

    const car = new Car({ speed });
    driver.increaseAccelerationMultiplier(multiplier);
    driver.changeCar(car);
    driver.update({
      distance,
    });

    expect(car.acceleration).to.equal(distance * multiplier);
  });

  it('should brake with acceleration', () => {
    const speed = 20;
    const distance = 20;
    const accelerationMultiplier = 0.001;
    const breakMultiplier = 0.01;

    const car = new Car({ speed });
    driver.increaseAccelerationMultiplier(accelerationMultiplier);
    driver.increaseBreakMultiplier(breakMultiplier);
    driver.changeCar(car);
    driver.update({
      distance,
    });

    expect(car.acceleration - car.break).to.equal(distance * accelerationMultiplier - distance * breakMultiplier);
  });
  it('should init with defined acceleration and break multipliers', () => {

    const params = { accelerationMultiplier: 1, breakMultiplier: 0.5 };
    const result = params.accelerationMultiplier - params.breakMultiplier;
    const car = new Car();
    driver = new Driver(car, { accelerationMultiplier: 1, breakMultiplier: 0.5 });
    driver.update({ distance: 1 });

    expect(car.acceleration - car.break).to.equal(result);
  });
});
