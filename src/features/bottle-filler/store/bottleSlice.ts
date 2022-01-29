import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { AVAIL_COLORS, COLUMNS, MAX_SLICE_IN_BOTTLE, ROWS } from "../constants/bottle-app-configs";
export interface ISlice {
  id: string | number,
  color: string
}
export interface IBottle {
  id: string | number,
  slices: ISlice[]
  maxSlice: number
}
export interface BottlesState {
  total: number;
  items: IBottle[],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BottlesState = {
  total: 0,
  items: [],
  status: 'idle',
};
const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getASlice = (id: string): ISlice => {
  return { id, color: AVAIL_COLORS[randomInteger(0, AVAIL_COLORS.length - 1)] }
}
const getABottle = (id: number, last?: boolean): IBottle => {
  const slices = last ? [] : Array.from(Array(MAX_SLICE_IN_BOTTLE - 1).keys()).map(val => getASlice(`${id}-${val}`))
  return { id, slices, maxSlice: MAX_SLICE_IN_BOTTLE }
}
export const bottleSlice = createSlice({
  name: 'bottle',
  initialState,
  reducers: {
    initBottles: (state) => {
      state.items = Array.from(Array(COLUMNS * ROWS).keys()).map(val => getABottle(val, val === (COLUMNS * ROWS - 1)))
      state.total = ROWS * COLUMNS;

    }
  }
})
export default bottleSlice.reducer;
export const { initBottles } = bottleSlice.actions;

export const selectBottles = (state: RootState) => state.bottles.items;

