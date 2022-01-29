import * as React from 'react';
import { ISlice } from '../store/bottleSlice';

interface ISliceProps extends ISlice {
}

const Slice: React.FunctionComponent<ISliceProps> = (props) => {
  return <div color={props.color} className='slice'></div>;
};

export default Slice;
