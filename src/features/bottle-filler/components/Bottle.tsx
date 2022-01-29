import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { IBottle, selectSourceBottle, selectTargetBottle, checkAllColorSame } from '../store/bottleSlice';
import Slice from './Slice';
// import "../styles/tube.scss"
interface IBottleProps extends IBottle {
  hasSelected: boolean
}

const Bottle: React.FunctionComponent<IBottleProps> = (props) => {
  const dispatch = useAppDispatch();
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
  useEffect(() => {
    return () => {
      clearTimeout(timer)
    };
  }, [])
  // return <div className={`bottle ${props.selected ? 'active' : ''}`} onClick={fn}>{
  //   props.slices.map(slc => <Slice key={slc.id} {...slc} />)
  // }</div>;

  return (
    <div className={`bottle tube ${props.selected ? 'active' : ''}`} onClick={fn}>
      <div className="tube__top"></div>
      <div className="bottle-content">
     { props.slices.map(slc => <Slice key={slc.id} {...slc} />)}

      </div>
      <div className="tube__outer-glass"></div>
    </div>
  )
};

export default Bottle;
