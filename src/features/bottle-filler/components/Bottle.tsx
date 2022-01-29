import * as React from 'react';
import { IBottle } from '../store/bottleSlice';
import Slice from './Slice';

interface IBottleProps extends IBottle {
}

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  return <div className='bottle'>{
    props.slices.map(slc=><Slice key={slc.id} {...slc}/>)
    }</div>;
};

export default Bottle;
