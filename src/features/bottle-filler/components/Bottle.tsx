import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IBottle, selectSourceBottle, selectTargetBottle, checkAllColorSame, selectFillable, fillBottleAsync, selectTargetRect } from '../store/bottleSlice';
import Slice from './Slice';
import confirmSound from "../../../assets/sound/confirm.ogg";
import maxSound from "../../../assets/sound/max.ogg";
// import "../styles/tube.scss"
export interface IMouse {
  top: number, left: number
}
interface IBottleProps extends IBottle {
  hasSelected: boolean,
  mouse: IMouse
}
const getRect = ({ x, y, top, left, width, height }: DOMRect | any) => ({ x, y, top, left, width, height })
const audio1 = new Audio(confirmSound);
const audio2 = new Audio(maxSound);

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  const dispatch = useAppDispatch();
  const [pos, setPos] = useState<DOMRect>();
  let timer: any;
  const fillable = useAppSelector(selectFillable)
  const targetRect = useAppSelector(selectTargetRect);
  const selectSourceOrTarget = () => {
    if (props.hasSelected) {
      dispatch(selectTargetBottle({ rect: getRect(pos), id: props.id }))
      timer = setTimeout(() => {
        dispatch(checkAllColorSame(props.id))
      }, 2000);
    } else {
      audio1.play();
      dispatch(selectSourceBottle({ rect: getRect(pos), id: props.id }));
    }

  }
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (inputRef && inputRef.current) {
      const rect = inputRef?.current.getBoundingClientRect();
      setPos(rect)

    }
    return () => {
      clearTimeout(timer)
    };
  }, [])

  useEffect(() => {
    if (fillable) {
      dispatch(fillBottleAsync(1))
      audio2.play();
      if (props.selected && targetRect && pos) {
        console.log(targetRect.left - pos.left, targetRect.top - pos.top, "x,y");

        inputRef?.current?.animate([
          // keyframes
          { transform: 'rotate(45deg)' },
          { transform: `translate(${targetRect.left - pos.left}px,${targetRect.top - pos.top}px)` },
          { transform: 'rotate(90deg)' },

        ], {
          // timing options
          duration: 1000,
          iterations: 1
        });
      }
    }
  }, [fillable])
  return (
    <div className='bot-rel' >
      <div ref={inputRef}
        className={`bottle tube ${props.selected ? 'active' : ''}`}
        onClick={selectSourceOrTarget}>
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
