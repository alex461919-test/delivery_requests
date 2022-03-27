import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { deliverySlice } from "./slice";

export interface IRequest {
  key: React.Key;
  name: string;
  start: IPoint;
  end: IPoint;
  isRouteVisible: boolean;
}

export interface IPoint {
  key: React.Key;
  name: string;
  latLng: Array<number>;
}
export interface IStore {
  requests: Array<IRequest>;
  points: Array<IPoint>;
}

export const store = configureStore({
  reducer: {
    delivery: deliverySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { updatePoints, setGroupVisible } = deliverySlice.actions;

export const useRequestList = () => useAppSelector((state) => state.delivery.requests);
export const usePointsList = () => useAppSelector((state) => state.delivery.points);

export const useVisibleRoutes = () =>
  useAppSelector((state) => state.delivery.requests)
    .filter((request) => request.isRouteVisible)
    .map((request) => [request.start.latLng, request.end.latLng]);
