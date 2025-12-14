// src/shared/redux/hooks.ts
import type { AppDispatch, RootState } from "@/shared/redux/stores/stores";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
