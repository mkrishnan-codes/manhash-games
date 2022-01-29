import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { AVAIL_COLORS, COLUMNS, MAX_SLICE_IN_BOTTLE, ROWS } from "../constants/bottle-app-configs";
export interface ISlice {
  id: string | number,
  color: string,
  height: string
}
export interface IBottle {
  id: string | number,
  slices: ISlice[]
  maxSlice: number,
  selected: boolean
}
export interface BottlesState {
  total: number;
  items: IBottle[],
  source: string | number | null,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BottlesState = {
  total: 0,
  items: [],
  source: null,
  status: 'idle',
};
const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getASlice = (id: string): ISlice => {
  return { id, color: AVAIL_COLORS[randomInteger(0, AVAIL_COLORS.length - 1)], height: `${100 / MAX_SLICE_IN_BOTTLE}%` }
}
const getABottle = (id: number, last?: boolean): IBottle => {
  const slices = last ? [] : Array.from(Array(MAX_SLICE_IN_BOTTLE - 1).keys()).map(val => getASlice(`${id}-${val}`))
  return { id, slices, maxSlice: MAX_SLICE_IN_BOTTLE, selected:false }
}
export const bottleSlice = createSlice({
  name: 'bottle',
  initialState,
  reducers: {
    initBottles: (state) => {
      state.items = Array.from(Array(COLUMNS * ROWS).keys()).map(val => getABottle(val+1, val === (COLUMNS * ROWS - 1)))
      state.total = ROWS * COLUMNS;

    },
    selectBottle: (state, action: PayloadAction<string | number>) => {
      if (!state.source) {
        state.source = action.payload
        state.items = state.items.map(bot => bot.id === action.payload ? { ...bot, selected: true } : bot)
      }
    }
  }
})
export default bottleSlice.reducer;
export const { initBottles, selectBottle } = bottleSlice.actions;

export const selectBottles = (state: RootState) => state.bottles.items;

