import { useCallback, useEffect, useRef, useState } from "react";

const useSlidingWindow = <T>(initialList: T[], sizeRequired: number, intialSelection = 0) =>
{
  const [mode, setMode] = useState<"sliding" | "full">("sliding");
  const [fullList, setFullList] = useState<T[]>(initialList)
  const [slidingWindow, setSlidingWindow] = useState<T[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(intialSelection);

  const constructSlidingWindow = useCallback(() =>
  {
    const neededList = fullList;

    const numHalf = Math.floor(sizeRequired / 2);

    const getRightSlice = () =>
    {
      const rightAmount = (sizeRequired % 2 !==0 ? 1: 0) + numHalf;

      const slice1 = neededList.slice(selectedIndex, selectedIndex + rightAmount);

      let slice2: T[] = []

      if (selectedIndex + rightAmount > neededList.length)
      {
        slice2 = neededList.slice(0, selectedIndex + rightAmount - neededList.length)
      }

      return slice1.concat(slice2);
    }

    const getLeftSlice = () =>
    {
      const leftAmount = selectedIndex - numHalf;

      const slice1 = neededList.slice( leftAmount > -1? leftAmount: 0, selectedIndex);

      let slice2: T[] = [];

      if (leftAmount < 0 )
      {
          slice2 = neededList.slice(leftAmount)
      }

      return slice2.concat(slice1)
    }

    const rightSlice = getRightSlice();

    const leftSlice = getLeftSlice();

    return leftSlice.concat(rightSlice)
  }, [selectedIndex, fullList])

  const shiftRight = () =>
  {
    setSelectedIndex(value => ((value + 1) % fullList.length))
  }

  const shiftLeft = () =>
  {
    setSelectedIndex(value =>
    {
      return (value - 1 < 0)? fullList.length - 1: value - 1
    })
  }

  const expandList = () =>
  {
    setMode("full")
  }

  const shrinkList = () =>
  {
    setMode("sliding")
  }

  useEffect(() =>
  {
    const fillArray = (list: T[]): T[] =>
    {
      const repeat = (arr: T[], n: number) => [].concat(...Array(n).fill(arr));

      const difference = sizeRequired - list.length;

      if (difference <= 0)
      {
        return list;
      }

      if (difference > list.length)
      {
        const n = Math.floor(difference/list.length);

        const newList = list.concat(repeat(list, n));

        return fillArray(newList);
      }
      else
      {
        return list.concat([...list.slice(0, difference)])
      }
    }

    console.log("initialList.length: ", initialList.length);

    if (initialList.length > 0)
    {
      const newList = fillArray(initialList);
      setFullList(newList)
    }
  }, [initialList]);


  useEffect(() =>
  {
    if (fullList.length >= sizeRequired)
    {
      const newSlidingWindow = constructSlidingWindow();

      setSlidingWindow(newSlidingWindow)
    }
  }, [fullList, selectedIndex]);

  useEffect(() =>
  {
    console.log("slidingWindow: ", slidingWindow);
  }, [slidingWindow])


  useEffect(() =>
  {
    console.log("mode: ", mode);

  }, [mode])


  return {
    processedList:
            mode === "sliding"
          ?
            slidingWindow
          :
            fullList
    ,
    expandList,
    shrinkList,
    shiftRight,
    shiftLeft
  }
}


export default useSlidingWindow
