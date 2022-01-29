import * as React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { IBottle, selectSourceBottle, selectTargetBottle, checkAllColorSame } from '../store/bottleSlice';
import Slice from './Slice';

interface IBottleProps extends IBottle {
  hasSelected: boolean
}

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  const dispatch = useAppDispatch();
  // const clickFn = () => dispatch(props.hasSelected ? selectTargetBottle(props.id) : selectSourceBottle(props.id));

  const fn = () => {
    if (props.hasSelected) {
      dispatch(selectTargetBottle(props.id))
      dispatch(checkAllColorSame(props.id))
    } else {
      dispatch(selectSourceBottle(props.id));
    }

  }
  return <div className={`bottle ${props.selected ? 'active' : ''}`} onClick={fn}>{
    props.slices.map(slc => <Slice key={slc.id} {...slc} />)
  }</div>;
};

export default Bottle;
