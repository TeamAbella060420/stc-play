import { IconNames } from "@fe-monorepo/helper"
import Icon from "../common/Icon"
import Image from "./Image"


interface EmptyStateProps
{
    message:string
    icon?:JSX.Element
}

const EmptyState = (props:EmptyStateProps)=>
{
    return(
        <div className={`w-full h-full flex flex-col items-center justify-center`}>
            {props?.icon}
            <p className={`
                    text-secondary/50
                    text-title 4xl:text-mobileDynamic 5xl:text-LPTitle 8xl:text-fiveKDynamic`
              }
            >
                {props?.message}
            </p>
        </div>
    )
}

export default EmptyState
