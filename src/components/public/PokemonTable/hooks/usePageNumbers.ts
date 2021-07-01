import { useEffect, useState } from "react";

export const usePageNumbers = (page: number, maxPage: number) => {
  const [listOfPage, setListOfPage] = useState<number[]>([]);
  useEffect(() => {
    let pagePrev = page;
    let pageNext = page;
    while (pagePrev > 0 && page - pagePrev < 2) {
      pagePrev--;
    }
    while (pageNext < maxPage && pageNext - page < 3) {
      pageNext++;
    }
    const pull = [];
    for (let i = pagePrev; i < pageNext; i++) {
      pull.push(i);
    }
    setListOfPage(pull);
  }, [page, maxPage]);

  return { listOfPage };
};
