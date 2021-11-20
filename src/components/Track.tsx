import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CarComponent } from './CarComponent';
import { Driver } from '../Driver';
import { Car } from '../Car';

// @ts-ignore
window.stopDistance = 3000;


export const Track = ({ length }: { length: number }) => {
  const [position, setPosition] = useState(0);

  const car = useMemo(() => {
    return new Car();
  }, []);

  // @ts-ignore
  window.car = car;


  const driver = useMemo(() => {
    return new Driver(car);
  }, []);

  // @ts-ignore
  window.driver = driver;


  useEffect(() => {
    driver.increaseAccelerationMultiplier(20000);
    driver.increaseBreakMultiplier(1800);

    const interval = setInterval(() => {
      // @ts-ignore
      const distance = window.stopDistance - car.getOdometer();
      driver.update({
        distance,
      });
      console.log('=', car.acceleration, car.break);
      car.update(0.5);
      console.log({
        odometer: car.getOdometer(),
        speed: car.getSpeed(),
        distance,
      });
      setPosition(car.getOdometer());
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledTrack length={length}>
      <CarComponent position={position % length} isBraking={car.acceleration - car.break < 0} />
    </StyledTrack>
  );
}

const StyledTrack = styled.div<{ length: number }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: ${({ length }) => length}px;
  width: 200px;
  background-color: grey;
`;