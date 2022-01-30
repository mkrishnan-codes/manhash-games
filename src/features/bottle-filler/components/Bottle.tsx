import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { IBottle, selectSourceBottle, selectTargetBottle, checkAllColorSame } from '../store/bottleSlice';
import Slice from './Slice';
// import "../styles/tube.scss"
export interface IMouse {
  top: number, left: number
}
interface IBottleProps extends IBottle {
  hasSelected: boolean,
  mouse: IMouse
}

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  const dispatch = useAppDispatch();
  const [pos, setPos] = useState({ top: 0, left: 0 });

  let timer: any;
  const fn = () => {
    if (props.hasSelected) {
      dispatch(selectTargetBottle(props.id))
      timer = setTimeout(() => {
        dispatch(checkAllColorSame(props.id))
      }, 2000);
    } else {
      dispatch(selectSourceBottle(props.id));
    }

  }
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (inputRef && inputRef.current) {
      const rect = inputRef?.current.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left })
      
    }
    return () => {
      clearTimeout(timer)
    };
  }, [])
  let style;
  if (props.selected) {
    style = { top: props.mouse.top - pos.top, left: props.mouse.left-pos.left }
  }

  return (
    <div className='bot-rel' >
      <div ref={inputRef} className={`bottle tube ${props.selected ? 'active' : ''}`} style={style} onClick={fn}>
        <div className="tube__top"></div>
        <div className="bottle-content">
          {props.slices.map(slc => <Slice key={slc.id} {...slc} />)}

        </div>
        <div className="tube__outer-glass"></div>
      </div>
    </div>
  )
};

export default Bottle;
