import { useState } from "react";

export function useLoadingList() {
  const [loadingList, setLoadingList] = useState<any[]>([]);
  const addToLoadingList = (key: number | string) => {
    setLoadingList((prev) => [...prev, key]);
  };

  const removeFromLoadingList = (key: number | string) => {
    setLoadingList((prev) => prev.filter((item) => item !== key));
  };

  return { loadingList, addToLoadingList, removeFromLoadingList };
}
