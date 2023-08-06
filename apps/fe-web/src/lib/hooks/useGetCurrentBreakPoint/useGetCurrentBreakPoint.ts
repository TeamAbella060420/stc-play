import { useEffect, useState } from "react";

export type BreakPoint =  "mobile" | "normal" | "2k" | "4k" | "8k";

const useGetCurrentBreakPoint = () =>
{
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth);
  const [currentBreakPoint, setCurrentBreakPoint] = useState<BreakPoint>("normal")

  useEffect(() =>
  {
    const handleResize = () => setInnerWidth(window.innerWidth)

    window.addEventListener('scroll', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() =>
  {
    let breakpoint: BreakPoint = "normal";

    if (innerWidth >= 7680)
    {
      breakpoint = "8k"
    }
    else if (innerWidth >= 3840)
    {
      breakpoint = "4k"
    }
    else if (innerWidth >= 2560)
    {
      breakpoint = "2k"
    }
    else if (innerWidth >= 640)
    {
      breakpoint = "normal"
    }
    else
    {
      breakpoint = "mobile"
    }

    setCurrentBreakPoint(breakpoint);
  }, [innerWidth])

  return { currentBreakPoint }
}

export default useGetCurrentBreakPoint
