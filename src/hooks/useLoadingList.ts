import { useState } from "react";

type key = string | number;

export function useLoadingList() {
  const [loadingList, setLoadingList] = useState<key[]>([]);
  const addToLoadingList = (key: number | string) => {
    setLoadingList((prev) => [...prev, key]);
  };

  const removeFromLoadingList = (key: number | string) => {
    setLoadingList((prev) => prev.filter((item) => item !== key));
  };

  return { loadingList, addToLoadingList, removeFromLoadingList };
}
