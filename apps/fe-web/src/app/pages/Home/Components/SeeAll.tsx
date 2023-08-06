import { translate } from "@fe-monorepo/helper";

const SeeAll = (props: { className: string }) =>
{
  return (
    <div className={`
        flex md:hidden items-end
        w-fit

        border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
        border-solid border-y-sunset

        cursor-pointer

        ${props.className}
        `}
      >
        <p className=
          {`
            text-sunset font-regular
            text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle
          `}
        >
          {translate("common_see_all")}
        </p>
    </div>
  )
}


export default SeeAll;
