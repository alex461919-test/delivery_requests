import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fakeStore from "./fake";

export const deliverySlice = createSlice({
  name: "delivery",
  // Кол-во заявок и границы точек для фейк-генератора
  initialState: fakeStore(5, [
    { lng: 37.493386, lat: 55.682332 },
    { lng: 37.75232, lat: 55.790831 },
  ]),
  reducers: {
    updatePoints: (state, action: PayloadAction<{ requestKey: React.Key; startKey: React.Key; endKey: React.Key }>) => {
      const start = state.points.find((item) => item.key === action.payload.startKey);
      const end = state.points.find((item) => item.key === action.payload.endKey);
      if (undefined !== start && undefined !== end) {
        state.requests = state.requests.map((item) =>
          item.key === action.payload.requestKey ? { ...item, ...{ start }, ...{ end } } : item
        );
      } else {
        console.error("updatePoints. undefined start/stop");
      }
    },
    setGroupVisible: (state, action: PayloadAction<{ keys: React.Key[] }>) => {
      state.requests = state.requests.map((item) => ({ ...item, isRouteVisible: action.payload.keys.includes(item.key) }));
    },
  },
});
/*
 setGroupVisible: (state, action: PayloadAction<{ keys: React.Key[] }>) => {
            state.requests = state.requests.map(item => ({ ...item, isRouteVisible: action.payload.keys.includes(item.key) }));
        },
*/
