import { IconNames, translate } from "@fe-monorepo/helper";
import { TournamentData } from "@fe-monorepo/models";
import { RootState } from "@fe-monorepo/store";
import ScaledIcon from "apps/fe-web/src/app/common/ScaledIcon";
import useGetCurrentBreakPoint from "apps/fe-web/src/lib/hooks/useGetCurrentBreakPoint/useGetCurrentBreakPoint";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { t } from "i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const formatNumber = (num: number, precision = 1, dir?: "ltr" | "rtl") =>
{
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: translate("common_number_millions"), threshold: 1e6 },
    { suffix: translate("common_number_thousands"), threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  translate("common_number_thousand")

  if (num === 1000 && dir === "rtl")
  {
    return translate("common_number_thousand")
  }

  const found = map.find((x) => Math.abs(num) >= x.threshold);

  if (found)
  {
    const number = (((num / found.threshold).toFixed(num % found.threshold === 0 ? 0: precision)))
    const formatted = number + found.suffix;

    return formatted;
  }

  return num;
}

type TimeLeft =
{
  days: string,
  hours: string,
  minutes: string,
  seconds: string
}

const useCountDownTimer = (endDate: string) =>
{
  const countDownTimer = useRef<NodeJS.Timer>();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    {
      days: "0",
      hours: "0",
      minutes: "0",
      seconds: "0"
    }
  )

  const isOnGoing = () =>
  {
    const timeLeftCopy = { ...timeLeft };

    return timeLeftCopy.days !== "0" || timeLeftCopy.hours !== "0" || timeLeftCopy.minutes !== "0" || timeLeftCopy.seconds !== "0"
  }

  useEffect(() =>
  {
    const startDate = moment(endDate).utc()

    countDownTimer.current = setInterval(() =>
    {
      const currentDate = moment().utc();

      const diff = startDate.diff(currentDate);

      if (diff < 1)
      {
        clearInterval(countDownTimer.current)

        return;
      }

      const duration = moment.duration(diff);

      const days = Math.floor(duration.asMilliseconds() / 8.64e+7);
      const remainingDays = duration.asMilliseconds() % 8.64e+7

      const hours = Math.floor(remainingDays / 3.6e+6);
      const remainingHours = remainingDays % 3.6e+6;

      const minutes = Math.floor(remainingHours / 60000);

      const seconds = (Math.floor((remainingHours % 60000) / 1000))


      if (duration.isValid())
      {
        setTimeLeft({
            days: (""+days).padStart(2, "0"),
            hours: (""+hours).padStart(2, "0"),
            minutes: (""+minutes).padStart(2, "0"),
            seconds: (""+seconds).padStart(2, "0")
        })
      }
      else
      {
        clearInterval(countDownTimer.current)
      }
    }, 1000)

    return () =>
    {
      clearInterval(countDownTimer.current)
    }
  }, [])

  return {
    timeLeft,
    isOnGoing: isOnGoing()
  };
}

const CardHeader = (props: { host: string, prize: number }) =>
{
  const BigPrize = (props: {className?: string}) =>
  {
    return (
        <div className={`
                ${props.className}
                bg-moonlight
                flex items-center
                gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44

                rounded-e-[4px] sm:rounded-e-none
                sm:rounded-s-[4px] 4xl:rounded-s-[7.11px] 5xl:rounded-s-[10.66px] 8xl:rounded-s-[21.33px]
        `}>
          <ScaledIcon
              name={IconNames.trophy}
              className={`fill-white100`}
              normalHeight={20}
              normalWidth={20}
          />

          <p className="
                  font-regular
                  text-white100/90
                  text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle"
          >
            Big prize!
          </p>
        </div>
    )
  }

  const HostedBy = (props: { className?: string, host: string}) =>
  {
    return (
        <div className={`
            flex items-center

            gap-12 4xl:gap-[21.33px] 5xl:gap-32 8xl:gap-64
            bg-black100

            rounded-e-[4px] 4xl:rounded-e-[7.11px] 5xl:rounded-e-[10.66px] 8xl:rounded-e-[21.33px]
            ${props?.className}
          `}
        >
          <div className="
                overflow-hidden
                flex items-center justify-center
                border-[1px] border-white100/10 border-solid
                bg-purple rounded-full
                aspect-square h-[28px] 4xl:h-50 5xl:h-[75px] 8xl:h-[149px]"
          >
            <ScaledIcon
                name={IconNames.stc}
                normalHeight={18}
                normalWidth={18}
            />
          </div>

          <div className="
                flex flex-col sm:flex-row
                gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44
                text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge"
          >
            <p className="text-white100">{translate("tournament_hosted_by")}</p>
            <p className="text-white100/70">{props.host}</p>
          </div>
      </div>
    )
  }

  const commonStyle =
  `
    py-12 4xl:py-22 5xl:py-32 8xl:py-64
    px-16 4xl:px-[28px] 5xl:px-40 8xl:px-81
  `

  // mt-[5%]
  return (
    <header className="
              mt-24 4xl:mt-[42.66px] 5xl:mt-64 8xl:mt-[128px]
              self-start
              gap-[7px] sm:gap-0
              w-full
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center"
    >
      <HostedBy host={props.host} className={commonStyle} />

      {
        !!props.prize
      &&
        <BigPrize className={commonStyle} />
      }
    </header>
  )
}

interface CardBodyProps
{
  name: string,
  startDate: string,
  isMiddle: boolean,
}

const CardBody = (props: CardBodyProps) =>
{
  const {timeLeft, isOnGoing } = useCountDownTimer(props.startDate)

  const TimeUnit = (props: {time: string, unit: string}) =>
  {
    return (
      <div className="
            p-30 sm:p-0
            flex flex-col justify-center items-center
            gap-[5px] 4xl:gap-[8.88px] 5xl:gap-[13.33px] 8xl:gap-[26.66px]
            text-center
          "
      >
          <p className="
                    font-medium
                    text-title sm:text-bodyLarge sm:text-title 4xl:text-mobileDynamic 5xl:text-LPTitle 8xl:text-fiveKDynamic"
          >
            {props.time}
          </p>

          <p className="font-regular text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge">{props.unit}</p>
      </div>
    )
  }

  return (
    <section className="
        relative
        h-full w-full
        font-medium
        flex
        flex-col sm:flex-row
        sm:items-end
        justify-end sm:justify-between
        p-12 sm:p-24 4xl:p-[42.66px] 5xl:p-[90px] 8xl:p-180

        gap-16 sm:gap-0
        "
  >

      <p className="
          text-white100
          text-bodyLarge sm:text-title 4xl:text-mobileDynamic 5xl:text-LPTitle 8xl:text-fiveKDynamic
          sm:w-[62%]
      ">
        {props.name}
      </p>

      <div className="
              sm:w-[32%]
              flex flex-col sm:items-end
              font-regular
              text-white100
              gap-12 4xl:gap-[21.33px] 5xl:gap-32 8xl:gap-64

      ">
        {
          isOnGoing
        &&
          <p className="font-regular text-caption sm:text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle">
            See you in
          </p>
        }

         {/* TODO: make sure the direction of the time is correct for both languages */}
        <div dir={"ltr"} className="inline-flex justify-around items-end w-full">
          {
            isOnGoing
          &&
            <>
            <TimeUnit time={timeLeft.days} unit="Days" />

            <TimeUnit time={timeLeft.hours} unit="Hours" />

            <TimeUnit time={timeLeft.minutes} unit="Minutes" />

            <TimeUnit time={timeLeft.seconds} unit="Seconds" />
            </>
          }
        </div>
      </div>
    </section>
  )
}

interface CardFooterProps
{
  dir: "ltr" | "rtl"
  className?: string,
  platforms: string[],
  teamSize: number,
  isTeamBased: boolean,
  prize: number,
  registrationFee: number,
  capacity: number,
  numParticipants: number,
  startDate: string
}

const CardFooter = (props: CardFooterProps) =>
{
    const { dir } = props;
    const iconStyle =
    `
      dark:fill-white100/70
      defaultTheme:fill-black70

      sm:dark:fill-white100/70
      sm:defaultTheme:fill-white100/70
    `;

    const StartDate = (props: { date: string }) =>
    {
      const formattedDate = moment(props.date).local()

      return (
        <div

        className="
              flex items-center
              gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44"
        >
            <ScaledIcon
                name={IconNames.calendar1}
                className={iconStyle}
                normalHeight={20}
                normalWidth={20}
            />

            <p dir="ltr">{formattedDate.format("DD MMM YYYY [at] h:mm A")}</p>
          </div>
      )
    }

    const PrizePool = (props: { prize: number }) =>
      {
        const formatedPrize = formatNumber(props.prize, 1, dir);

        console.log("formatedPrize: ", );

        return (
            <div className="
                flex items-center

                gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44"
            >
                <ScaledIcon
                    name={IconNames.trophy}
                    className={iconStyle}
                    normalHeight={20}
                    normalWidth={20}
                />

                <p>{formatedPrize?.toLocaleString("ar-EG")} {translate("currency_SR")}</p>
            </div>
          )
      }

    const RegistrationFee = (props: { fee: number }) =>
      <p>
        {
          props.fee === 0
        ?
          translate("common_free")
        :
          `${translate("common_entry")} ${formatNumber(props.fee, 1, dir)} ${translate("currency_SR")}`
        }
      </p>

    const Platform = (props: {platform: string}) => <p>{props.platform}</p>

    const TeamSize = (props: { teamSize: number }) => <p>{props.teamSize+"V"+props.teamSize}</p>

    const Participants = (props: { capacity: number, numParticipants: number }) =>
    {
      return (
        <div
          className="
          flex items-center
          gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44"
        >
          <ScaledIcon
            name={IconNames.users}
            className={iconStyle}
            normalHeight={20}
            normalWidth={20}
          />

          <p className="h-full text-center align-middle">{props.numParticipants}/{props.capacity}</p>
        </div>
      )
    }

  return (
    <footer className={`
          h-fit
          w-full
          flex flex-col sm:flex-row items-start sm:justify-between

          whitespace-nowrap
          font-regular

          defaultTheme:text-black50
          dark:text-white100/70

          sm:defaultTheme:text-white100/70
          sm:dark:text-white100/70

          sm:text-white100/70
          text-caption sm:text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle

          sm:bg-black100/50

          gap-16 sm:gap-0
          sm:py-16 4xl:py-[28px] 5xl:py-40 8xl:py-81
          sm:px-24 4xl:px-[28.44px] 5xl:px-[42.66px] 8xl:px-[85.33px]

          ${props?.className}
    `}
    >
      <div className="
            flex flex-row-reverse items-center
            gap-16 4xl:gap-[28px] 5xl:gap-[42px] 8xl:gap-81"
      >
        {
          props.prize > 0
        &&
          <div className="hidden sm:flex">
            <PrizePool prize={props.prize} />
          </div>
        }

        <RegistrationFee fee={props.registrationFee} />

        {
          props.platforms.length > 0
        &&
          <Platform
            platform={props.platforms.length > 1? t("platform_cross_platform"): t("platform_"+props.platforms[0])}
          />
        }

        {props.isTeamBased && !!props.teamSize &&  <TeamSize teamSize={props.teamSize} />}

        <Participants
          capacity={props.capacity}
          numParticipants={props.numParticipants}
        />
      </div>

      <div className="flex gap-16">

        {
          props.prize > 0
        &&
          <div className="flex sm:hidden">
            <PrizePool prize={props.prize} />
          </div>
        }

        <StartDate date={props.startDate} />
      </div>
    </footer>
  )
}

const TournamentCard = (props:
    {
      tournament: TournamentData,
      absoluteDistanceFromMiddle: number,
      highlightTournament: () => void
    }) =>
{
  const { currentBreakPoint } = useGetCurrentBreakPoint();

  const { tournament, absoluteDistanceFromMiddle: distanceFromMiddle, highlightTournament } = props;

  const prefs = useSelector((state: RootState) => state?.app);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  const isMiddle = distanceFromMiddle === 0;
  const isMobile = currentBreakPoint === "mobile";

  const cardWidth =
          isMobile
          ?
            "100%"
          :
            distanceFromMiddle === 0
          ?
            "76%"
          :
            distanceFromMiddle === 1
          ?
            "6.66%"
          :
            "1%"
  return (
      <motion.li
          key={dir}
          layout="position"
          className={`
            relative
            h-full
            flex flex-col
            gap-16
            snap-center
            flex-none
            ${(distanceFromMiddle !== 2 || isMobile) && "cursor-pointer"}
        `}
        initial={{ width: cardWidth }}
        animate={{ width: cardWidth }}

        transition={{ duration: 0.5 }}
        onClick={highlightTournament}
      >
          <section className="
                relative
                w-full
                h-[86%] sm:h-full
                rounded-[8px] 4xl:rounded-[14.22px] 5xl:rounded-[20px] 8xl:rounded-[43px]
                overflow-hidden
          ">
            <LazyLoadImage
                className={`z-0 absolute h-full w-full object-cover ${!isMiddle && "sm:grayscale"}`}
                src={tournament.banner_url}
                title={tournament.name}
                alt={tournament.name}
            />
              <motion.div
                layout
                className={`
                    z-0
                    absolute
                    bottom-0
                    h-full w-full
                      ${
                        isMiddle
                      ?
                        "sm:bg-gradient-to-t sm:from-purple sm:via-[#1F0439]/[0.50] sm:to-[#000000]/[0.0]"
                      :
                        isMobile
                      ?
                        "bg-gradient-to-t from-purple via-[#1F0439]/[0.50] to-[#000000]/[0.0]"
                      :
                        "sm:bg-black100/10"
                      }
                    `
                  }
              />

            <section
              className={`${isMiddle? "flex": " flex sm:hidden"} absolute flex-col justify-between h-full w-full  z-[10]`}
            >
              <CardHeader
                host={tournament.hosted_by}
                prize={tournament.prize}
              />

              <CardBody
                name={tournament.name}
                startDate={tournament.tournament_start_date}
                isMiddle={isMiddle}
              />

              <CardFooter
                dir={dir}
                className="hidden sm:flex"
                prize={tournament.prize}
                isTeamBased={tournament.is_team_based === 1}
                teamSize={tournament.team_size}
                registrationFee={tournament.registration_fee}
                capacity={tournament.max_number_of_participants}
                numParticipants={tournament.total_number_of_participants}
                platforms={tournament.platforms}
                startDate={tournament.tournament_start_date}
              />
            </section>
          </section>

          <CardFooter
              dir={dir}
              className="relative flex sm:hidden z-[10]"
              prize={tournament.prize}
              isTeamBased={tournament.is_team_based === 1}
              teamSize={tournament.team_size}
              registrationFee={tournament.registration_fee}
              capacity={tournament.max_number_of_participants}
              numParticipants={tournament.total_number_of_participants}
              platforms={tournament.platforms}
              startDate={tournament.tournament_start_date}
          />
    </motion.li>
  )
}

export default TournamentCard
