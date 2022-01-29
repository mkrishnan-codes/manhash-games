import * as React from 'react';
import { ISlice } from '../store/bottleSlice';

interface ISliceProps extends ISlice {
}

const Slice: React.FunctionComponent<ISliceProps> = (props) => {
    return <div className='slice' style={{ background: props.color, height: props.height }}>{props.id}</div>;
};

export default Slice;
