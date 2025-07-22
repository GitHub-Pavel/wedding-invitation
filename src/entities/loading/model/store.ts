import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

interface LoadingState {
  loading: boolean;
  loaded: boolean;
}
const initState: LoadingState = {
  loaded: false,
  loading: false,
};
const LoadingAtom = atom<LoadingState>(initState);

export const useLoading = () => useAtomValue(LoadingAtom);

export const useSetLoading = () => {
  const [prev, setState] = useAtom(LoadingAtom);

  return useCallback(
    (state: Partial<LoadingState>) => setState({ ...prev, ...state }),
    [prev, setState]
  );
};
