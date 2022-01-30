import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { consoleLog } from "../../../utils/common-util";
import { AVAIL_COLORS, COLUMNS, MAX_SLICE_IN_BOTTLE, POINT_FACTOR, ROWS } from "../constants/bottle-app-configs";
import { giveTimeout } from "../services/async-op";
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
  source: IPositionAndId | null,
  target: IPositionAndId | null,
  status: 'idle' | 'loading' | 'failed';
  point: number,
  fillable?: boolean
}
export interface IRect {
  x: number, y: number, top: number, left: number, width: number, height: number
}
export interface IPositionAndId {
  rect?: IRect,
  id: string | number
}
const initialState: BottlesState = {
  total: 0,
  items: [],
  source: null,
  target: null,
  status: 'idle',
  point: 0
};
const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getASlice = (id: string): ISlice => {
  return { id, color: AVAIL_COLORS[randomInteger(0, AVAIL_COLORS.length - 1)], height: `${100 / MAX_SLICE_IN_BOTTLE}%` }
}
const getABottle = (id: number, last?: boolean): IBottle => {
  const slices = last ? [] : Array.from(Array(MAX_SLICE_IN_BOTTLE - 1).keys()).map(val => getASlice(`${id}-${val}`))
  return { id, slices, maxSlice: MAX_SLICE_IN_BOTTLE, selected: false }
}



export const fillBottleAsync = createAsyncThunk(
  'bottle/fillBottle',
  async (amount: number) => {
    const response = await giveTimeout(amount, 2000);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const bottleSlice = createSlice({
  name: 'bottle',
  initialState,
  reducers: {
    initBottles: (state) => {
      state.items = Array.from(Array(COLUMNS * ROWS).keys()).map(val => getABottle(val + 1, val === (COLUMNS * ROWS - 1)))
      state.total = ROWS * COLUMNS;

    },
    selectSourceBottle: (state, action: PayloadAction<IPositionAndId>) => {
      state.source = action.payload
      state.items.forEach(bot => {
        if (bot.id === action.payload.id) {
          bot.selected = true
        }
      })
    },
    selectTargetBottle: (state, action: PayloadAction<IPositionAndId>) => {
      const sourceIndex = state.items.findIndex(bot => bot.id === state.source?.id);
      state.target = action.payload;
      const source = state.items[sourceIndex];
      if (source && source.slices.length > 0) {
        const sourceSlice = source?.slices[source.slices.length - 1];
        if (sourceSlice) {
          state.items.forEach(bot => {
            if (bot.id === action.payload.id) {
              if (bot && bot.slices.length < MAX_SLICE_IN_BOTTLE) {
                if (bot.slices.length === 0) {
                  state.fillable = true;
                } else {
                  const targetSlice = bot?.slices[bot.slices.length - 1];
                  if (targetSlice && targetSlice.color === sourceSlice.color) {
                    state.fillable = true;
                  }
                }
              }
            }
          })
        }
      }

      // const item = state.items.filter(bot => bot.id === action.payload)
    },
    checkAllColorSame: (state, action: PayloadAction<string | number>) => {
      const sourceIndex = state.items.findIndex(bot => bot.id === action.payload);
      const source = state.items[sourceIndex];
      const clr = source?.slices[0]?.color;
      if (clr) {
        const every = source?.slices.length === MAX_SLICE_IN_BOTTLE && source?.slices.every(slc => slc.color === clr);
        if (every) {
          state.point += POINT_FACTOR;
          state.items[sourceIndex] = getABottle(state.items.length + 1, false)
        }
      }

    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fillBottleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fillBottleAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const sourceIndex = state.items.findIndex(bot => bot.id === state.source?.id)
        if (state.fillable) {
          state.items.forEach(bot => {
            if (bot.id === state.target?.id) {
              const sourceSlice = state.items[sourceIndex].slices.pop();
              if (sourceSlice) {
                bot.slices = [...bot.slices, { ...sourceSlice }]
              }
            }
          })
        }
        state.items[sourceIndex].selected = false;
        state.source = null
        state.fillable = false;
      });
  },
})
export default bottleSlice.reducer;
export const { initBottles, selectSourceBottle, selectTargetBottle, checkAllColorSame } = bottleSlice.actions;

export const selectBottles = (state: RootState) => state.bottles.items;
export const selectHasSelected = (state: RootState) => !!state.bottles.source;
export const selectPoints = (state: RootState) => state.bottles.point;
export const selectFillable = (state: RootState) => !!state.bottles.fillable;

