import { useEffect, useRef } from "react"

import { useComponentIsAppear } from "../../lib/hooks/useComponentIsAppear/useComponentIsAppear"
import Spinner from "./Spinner"

type loadMoreType=
{
    isLoading:boolean
    loadMore:()=>void
}

const LoadMore = (props:loadMoreType)=>
{
    const ref = useRef(null)

    const isLoadComponentAppear = useComponentIsAppear(ref)

    useEffect(()=>
    {   
        if(isLoadComponentAppear?.isIntersecting)
        {
            props?.loadMore()
        }
    },[isLoadComponentAppear?.isIntersecting])

    return (
        <div ref={ref} className={`p-0 m-0 w-full flex justify-center items-center`}>
            {
                props?.isLoading
                &&
                    <Spinner className={`h-[50px] my-20 w-[50px]`}/>
            }
        </div>
    )
}

export default LoadMore