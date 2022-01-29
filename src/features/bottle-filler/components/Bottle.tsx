import * as React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { IBottle, selectBottle } from '../store/bottleSlice';
import Slice from './Slice';

interface IBottleProps extends IBottle {
}

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  const dispatch = useAppDispatch();

  return <div className={`bottle ${props.selected ? 'active' : ''}`} onClick={() => dispatch(selectBottle(props.id))}>{
    props.slices.map(slc => <Slice key={slc.id} {...slc} />)
  }</div>;
};

export default Bottle;
