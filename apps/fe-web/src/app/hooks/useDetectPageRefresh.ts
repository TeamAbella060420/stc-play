import { useEffect } from "react";

const usePageRefreshDetection = () =>
{
  const hasPageBeenRefreshed = () =>
  {
    return !!localStorage.getItem("isPageRefresh")
  }

  const reset = () =>
  {
    localStorage.removeItem("isPageRefresh")
  }

  useEffect(() =>
  {
    const storeRefreshState = () =>
    {
      localStorage.setItem("isPageRefresh", (true).toString())
    }

    window.addEventListener("beforeunload", storeRefreshState);

    return () =>
    {
      window.removeEventListener("beforeunload", storeRefreshState);
    };
  }, []);

  return {
    hasPageBeenRefreshed: hasPageBeenRefreshed,
    reset: reset
  }
}

export default usePageRefreshDetection
