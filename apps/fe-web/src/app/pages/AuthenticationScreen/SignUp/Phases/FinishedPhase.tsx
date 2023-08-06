import { useState, useEffect } from "react";

import { RootState } from "@fe-monorepo/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


import { motion } from "framer-motion";

import Icon from "../../../../common/Icon"

import { IconNames } from "@fe-monorepo/helper";

type Props =
{
  goNext: () => void,
}

const CheckMarkIcon = () =>
{
  const iconStyle = "fill-sunset z-[1]";

  return (
  <>
    <div className="flex 4xl:hidden">
        <Icon
          className={iconStyle}
          name={IconNames.checkMarkFill}
          width={100}
          height={100}
        />
      </div>

      <div className="hidden 4xl:flex 5xl:hidden">
        <Icon
          className={iconStyle}
          name={IconNames.checkMarkFill}
          width={177.77}
          height={177.7}
        />
      </div>

      <div className="hidden 5xl:flex 8xl:hidden">
        <Icon
          className={iconStyle}
          name={IconNames.checkMarkFill}
          width={266}
          height={266}
        />
      </div>

      <div className="hidden 8xl:flex">
        <Icon
          className={iconStyle}
          name={IconNames.checkMarkFill}
          width={533}
          height={533}
        />
      </div>
  </>
  )
}

const FinishedPhase = (props: Props) =>
{
  const { goNext } = props;

  const prefs = useSelector((state: RootState) => state.app);
  const { t } = useTranslation();

  const [seconds, setTimer] = useState<number>(5);
  const [isTimer, setIsTimer] = useState<boolean>(true);

  useEffect(() =>
  {
    setIsTimer(true);
  }, [])

  useEffect(() =>
  {
    let intervalId: NodeJS.Timeout;

    if (isTimer)
    {
      intervalId = setInterval(() =>
      {
        setTimer(prevTimer =>
        {
          if (prevTimer === 0)
          {
            clearInterval(intervalId);
            setIsTimer(false);

            goNext()
            return 0;
          }

          return prevTimer - 1;
        });
      }, 1000);
    }

    return () =>
    {
      clearInterval(intervalId);
    };
  }, [isTimer]);

  const secondsText = prefs.language === "en"? seconds: seconds.toLocaleString("ar-u-nu-arab")

  return (
    <div className="relative flex flex-col items-center justify-center sm:py-80 4xl:py-140 5xl:py-203 8xl:py-[426px]">

      <div>
        <motion.div
          className="relative mb-32 4xl:mb-56 5xl:mb-81 8xl:mb-[170px]"
          initial={{ opacity: 0, y: "-45%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{ duration: 1 }}
        >
          <CheckMarkIcon />
        </motion.div>
      </div>

      <div
        className="relative text-center w-full h-fit text-black100"
      >
        <motion.div

          className=" w-full"

          initial={{
              opacity: 0,
              y: "-245%",
          }}
          animate={{
              opacity: 1,
              y: "0%",
          }}
          transition={{ duration: 1 }}

        >
          <p className="
              text-bigTitle 4xl:text-huge 5xl:text-xlargeDynamic 8xl:text-fiveKDynamic
              font-medium
              mb-12 4xl:mb-20 5xl:mb-32 8xl:mb-64"
          >
            {t("success_screen")}
          </p>

          <p className="text-bodyLarge 4xl:text-title 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle">
            <span className="text-black70">{t("your_journey_starts")} </span>
            <span>{secondsText+` ${t("common_time_name_seconds")}`}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FinishedPhase;
