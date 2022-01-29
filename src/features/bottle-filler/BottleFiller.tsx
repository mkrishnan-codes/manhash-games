import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BottleHolder } from "./components/BottleHolder";
import { COLUMNS, ROWS } from "./constants/bottle-app-configs";
import { initBottles, selectBottles, selectHasSelected, selectPoints } from "./store/bottleSlice";
import "./styles/bottle.scss"
export const BottleFiller: React.FunctionComponent<{}> = () => {
    const gridTemplateColumns = `repeat(${COLUMNS},1fr)`
    const gridAutoRows = `${800 / ROWS}px`;
    const bottles = useAppSelector(selectBottles)
    const hasSelected = useAppSelector(selectHasSelected)
    const points = useAppSelector(selectPoints);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initBottles())
    }, [])
    return <div className="bottle-game">
        <section className="pointTable">{`points : ${points}`}</section>
        <div className="grid" style={{ gridTemplateColumns, gridAutoRows }}>
            {bottles.map(bottle => <BottleHolder hasSelected={hasSelected} key={bottle.id} {...bottle} />)}
        </div>
    </div>
};