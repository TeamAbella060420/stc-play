import { useCallback, useEffect, useState } from "react";

import { IconNames, TOURNAMENT_TYPES } from "@fe-monorepo/helper";
import ScaledIcon from "../../../../../common/ScaledIcon";
import Container from "../../../../../components/Container";

import { motion } from "framer-motion";
import useGetCurrentBreakPoint from "apps/fe-web/src/lib/hooks/useGetCurrentBreakPoint/useGetCurrentBreakPoint";
import useSlidingWindow from "../../../../../hooks/useSlidingWindow";
import { useSections } from "@fe-monorepo/hooks";
import { TournamentData } from "@fe-monorepo/models";
import TournamentCard from "./TournamentCard";
import { useSelector } from "react-redux";
import { RootState } from "@fe-monorepo/store";

const Tournaments = () =>
{
  const { currentBreakPoint } = useGetCurrentBreakPoint();
  const [featuredTournaments, setFeaturedTournaments] = useState<TournamentData[]>([]);
  const { sections, isLoading, getTournamentSections } = useSections();

  const
  {
      processedList: tournamentsCarousel,
      shiftLeft,
      shiftRight,
      expandList,
      shrinkList
  } = useSlidingWindow(featuredTournaments, 5, 0);

  const prefs = useSelector((state: RootState) => state?.app);
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  const chevronClassNames = "absolute hidden md:flex z-[1] fill-secondary/70  w-fit cursor-pointer";

  const goPrevious = () =>
  {
    if (dir === 'ltr')
    {
      shiftLeft()
    }
    else
    {
      shiftRight()
    }
  }

  const goNext = () =>
  {
    if (dir === 'ltr')
    {
      shiftRight()
    }
    else
    {
      shiftLeft()
    }
  }

  useEffect(() =>
  {
    getTournamentSections()
  }, []);

  useEffect(() =>
  {
    if (sections)
    {
      const tournaments  = sections
          .filter(section => TOURNAMENT_TYPES.FEATURED === section. section_code)
          .flatMap(section => section.list);

          setFeaturedTournaments(tournaments)
    }
  }, [sections])

  useEffect(() =>
  {
    if (currentBreakPoint === "mobile")
    {
      expandList()
    }
    else
    {
      shrinkList()
    }
  }, [currentBreakPoint])


  return (
      <Container className='flex bg-primary'>
        <div className='
                    relative
                    flex items-center
                    w-full
                    h-[516px] sm:h-[469px] 4xl:h-[833.77px] 5xl:h-[1250.66px] 8xl:h-[2502px]'
        >
            <ScaledIcon
              className={`
              -left-[40px] 4xl:-left-[72px] 5xl:-left-[106.66px] 8xl:-left-[213.33px] cursor-pointer rotate-180 ${chevronClassNames}`}
              name={IconNames.chevronRight}
              normalWidth={20}
              normalHeight={20}
              onClick={goPrevious}
            />

          <motion.ul
              layout
              // dir="ltr"
              className='
                  list-none
                  h-full w-full

                  flex sm:justify-center gap-[2%]
                  overflow-x-scroll sm:overflow-x-hidden
                  snap-x snap-mandatory sm:snap-none
                '
          >
            {tournamentsCarousel.map((tournament, index) =>
              {
                const distanceFromMiddle = Math.floor(tournamentsCarousel.length/2) - index;

                return (
                      <TournamentCard
                          key={tournament.tournament_id}
                          tournament={tournament}
                          absoluteDistanceFromMiddle={Math.abs(distanceFromMiddle)}
                          highlightTournament={() =>
                          {
                            if (distanceFromMiddle === 1)
                            {
                              shiftLeft()
                            }
                            else if (distanceFromMiddle === -1)
                            {
                              shiftRight()
                            }
                          }}
                      />
                )
              })
            }

          </motion.ul>

          <ScaledIcon
            className={`-right-[40px] 4xl:-right-[72px] 5xl:-right-[106.66px] 8xl:-right-[213.33px] ${chevronClassNames}`}
            name={IconNames.chevronRight}
            normalWidth={20}
            normalHeight={20}
            onClick={goNext}
          />
        </div>
      </Container>
  )
}

export default Tournaments;
