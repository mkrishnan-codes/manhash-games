import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BottleHolder } from "./components/BottleHolder";
import { COLUMNS, ROWS } from "./constants/bottle-app-configs";
import { initBottles, selectBottles, selectHasSelected, selectPoints } from "./store/bottleSlice";
import "./styles/bottle.scss";

export const BottleFiller: React.FunctionComponent<{}> = () => {
    const gridTemplateColumns = `repeat(${COLUMNS},1fr)`
    const perHieght = window.screen.height / (ROWS + 1);
    const gridAutoRows = `${perHieght}px`;
    const bottles = useAppSelector(selectBottles)
    const hasSelected = useAppSelector(selectHasSelected)
    const points = useAppSelector(selectPoints);
    const dispatch = useAppDispatch();
    const [mouse, setMouse] = useState({ top: 0, left: 0 });
    useEffect(() => {
        dispatch(initBottles())
    }, [])
    const setMouseClick = (e: any) => {
        setMouse({ top: e.screenY , left: e.screenX })
    }
    return <div className="bottle-game">
        <section className="pointTable"><h1>{`points : ${points}`}</h1></section>
        <div className="grid" style={{ gridTemplateColumns, gridAutoRows }}
            onMouseMove={setMouseClick}>
            {bottles.map(bottle => <BottleHolder mouse={mouse} hasSelected={hasSelected} key={bottle.id} {...bottle} />)}
        </div>
    </div>
};