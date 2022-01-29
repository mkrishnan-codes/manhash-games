import * as React from 'react';
import { IBottle } from '../store/bottleSlice';
import Bottle from './Bottle';

export interface IBottleHolderProps extends IBottle {
  hasSelected: boolean,
}

export function BottleHolder(props: IBottleHolderProps) {
  return (
    <section className='bottle-holder'>
      <Bottle {...props} />
    </section>
  );
}
