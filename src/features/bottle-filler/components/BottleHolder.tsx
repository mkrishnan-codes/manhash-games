import * as React from 'react';
import { IBottle } from '../store/bottleSlice';
import Bottle, { IMouse } from './Bottle';

export interface IBottleHolderProps extends IBottle {
  hasSelected: boolean,
  mouse: IMouse
}

export function BottleHolder(props: IBottleHolderProps) {
  return (
    <section className='bottle-holder'>
      <Bottle {...props} />
    </section>
  );
}
