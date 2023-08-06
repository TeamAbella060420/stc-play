import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { t } from "i18next";
import { motion } from "framer-motion"

import { IconNames } from "@fe-monorepo/helper";
import { RootState } from "@fe-monorepo/store";
import { useHelper } from '../../../../../../libs/hooks/src/useHelper/useHelper'

import { useHeaderState } from "apps/fe-web/src/lib/hooks/useHeaderState/useHeaderState";
import { useComponentIsAppear } from "apps/fe-web/src/lib/hooks/useComponentIsAppear/useComponentIsAppear";

import DynamicBanner from "./DynamicBanner";


import Text from "../../components/Text";
import Icon from "../../common/Icon";
import Image from "../../components/Image";

import { useStatistics } from '@fe-monorepo/hooks';
import { useScrollDirection } from "../../hooks/useScrollDirection";

import GamingController from "../../../../../../libs/assets/src/images/GamingController.png"
import SmileFace from "../../../../../../libs/assets/src/images/SmileFace.png"
import GamingCup from "../../../../../../libs/assets/src/images/GamigCup.png"
import FirstChallenger from "../../../../../../libs/assets/src/images/FirstChallenger.png"
import SecondChallenger from "../../../../../../libs/assets/src/images/SecondChallenger.png"
import MysteryChallenger from "../../../../../../libs/assets/src/images/MysteryChallenger.png"



const CompeteCard = (props: { hideDynamicBanner: boolean })=>
{
    const helper = useHelper()

    const [ isAgainstMystery, setIsAgainstMystery ] = useState<boolean>(false);
    const [ isMouseEnter , setIsMouseEnter ] = useState<boolean>(false);
    const competeRef = useRef(null)
    const dynamicRef = useRef(null)

    const dynamicComponent = useComponentIsAppear(dynamicRef);
    const competeCardComponent = useComponentIsAppear(competeRef);
    const scrollDirection = useScrollDirection()

    const statistics = useStatistics();

    const innerWidth = useHeaderState().innerWidth;
    const dir = useSelector((state: RootState) => state?.app.language) === "en" ? "ltr" : "rtl";

    const [isDynamicAppear, setIsDynamicAppear] = useState(dynamicComponent?.isIntersecting);

    const spring =
    {
        type: "spring",
        stiffness: 100,
        damping: 20
    };

    useEffect(() =>
    {
        const handleScroll =()=>
        {
            if(isMouseEnter || competeCardComponent?.isIntersecting)
            {
                if(scrollDirection === "down")
                {
                    setIsAgainstMystery(true)
                }
                else
                {
                    setIsAgainstMystery(false)
                }
            }
        }
        window.addEventListener("scroll",handleScroll);
        return () =>
        {
            window.removeEventListener("scroll",handleScroll);
        };
    }, [scrollDirection]);


    useEffect(()=>
    {
        setIsDynamicAppear(dynamicComponent?.isIntersecting)
    },[dynamicComponent?.isIntersecting])

    useEffect(()=>
    {
        statistics.getAllTournamentStatistecs();
    },[])

    return(
            <div
              className={`z-[0] flex items-center justifyl-center bg-purple w-full`}
              onMouseEnter={()=>setIsMouseEnter(true)}
              onMouseLeave={()=>setIsMouseEnter(false)}

            >
                <motion.div ref={competeRef}
                 className={`relative bg-white100 rounded-lg z-[2] w-full`}
                 initial={
                    {
                        top: "0px",
                        marginLeft:isDynamicAppear ? '4%' : 0,
                        marginRight:isDynamicAppear ? '4%' : 0,
                    }
                }

                  animate={
                        innerWidth > 7679
                    ?
                        {
                            top: isDynamicAppear ? '-770px' : "",
                            marginLeft:isDynamicAppear ? '4%' : 0,
                            marginRight:isDynamicAppear ? '4%' : 0,
                        }
                    :
                        innerWidth > 767
                    ?
                        {
                            top: isDynamicAppear ? '-451px' : "",
                            marginLeft:isDynamicAppear ? '4%' : 0,
                            marginRight:isDynamicAppear ? '4%' : 0,
                        }
                    :
                        {
                            top: isDynamicAppear ? '-451px' : "",
                            marginLeft:isDynamicAppear ? '0%' : 0,
                            marginRight:isDynamicAppear ? '0%' : 0,
                        }
                }

                  transition={{ duration: 0.9 }}>
                    <div className={`bg-white100 w-full flex flex-col items-center justify-center rounded-lg z-[2]
                            px-5
                            sm:px-5
                            xl:px-120 xl:pb-120
                            5xl:px-[400px]
                            8xl:px-[800px]
                        `}>
                        <div className={`flex flex-col pb-10 items-start justify-start w-full
                                pt-120 xl:pb-81
                                8xl:pt-490
                            `}>
                            <div className={`text-black100 font-medium
                                text-bigTitle w-full
                                sm:w-[500px] sm:text-mobileDynamic
                                lg:text-huge lg:w-[600px]
                                xl:w-[800px] xl:text-LPTitle
                                5xl:text-fourKTitle 5xl:w-[1300px]
                                8xl:text-eightKTitle 8xl:w-[2800px]
                            `}>
                                {t("homePage_neverMissChance")}
                            </div>
                        </div>
                        <div className={`font-light flex flex-col-reverse justify-between w-full items-center xl:flex-row overflow-hidden `}>
                            <motion.div className={`relative w-[50%]
                                    self-start
                                    ${isAgainstMystery ? "xl:self-start" :"xl:self-end"} xl:pt-0
                                `}
                                layout
                                transition={spring}
                            >
                                <div className={`relative ${isAgainstMystery ? `xl:bottom-[]` : `xl:bottom-[140px] 4xl:bottom-[170px] 5xl:bottom-[210px] 8xl:bottom-[430px]`}
                                pt-10
                                sm:pt-40
                                xl:me-80 xl:pt-0`}>
                                    <div className={`relative w-full h-[300px] flex-col items-start justify-center
                                        w-full h-[200px]
                                        xl:h-full xl:h-full xl:w-[330px]
                                        4xl:w-[400px]
                                        5xl:w-[700px]
                                        8xl:w-[1500px]
                                    `}>

                                        <motion.div className={`absolute font-light text-black70 absolute ${isAgainstMystery ? `left-[-1000px] xl:left-auto xl:top-[-200px] 5xl:top-[-300px] 8xl:top-[-500px]` : `right-0 xl:left-0 xl:top-[0px]`}
                                                    text-mobileSubtitle
                                                    w-[350px]
                                                    sm:w-[490px] sm:text-subtitle
                                                    xl:w-[255px] xl:me-72 xl:mx-0
                                                    4xl:text-title 4xl:w-[320px]
                                                    5xl:text-fourKSubtitle 5xl:w-[600px]
                                                    8xl:text-eightKSubtitle 8xl:w-full
                                                    `}
                                                    initial={
                                                        innerWidth > 1279
                                                        ?
                                                            {}
                                                        :
                                                        dir === "ltr"
                                                        ?
                                                            {
                                                                left:isAgainstMystery ? `-1000px` : `0px`
                                                            }
                                                        :
                                                            {
                                                                right:isAgainstMystery ? `-1000px` : `0px`
                                                            }
                                                    }
                                                    animate={
                                                        innerWidth > 1279
                                                        ?
                                                            {}
                                                        :
                                                        dir === "ltr"
                                                        ?
                                                            {
                                                                left:isAgainstMystery ? `-2000px` : `0px`
                                                            }
                                                        :
                                                            {
                                                                right:isAgainstMystery ? `2000px` : `0px`
                                                            }
                                                    }
                                                    transition={{duration:1}}
                                                    >
                                            {t("homePage_levelUpByCompeting")}
                                            <div className={`font-light absolute w-fit text-sunset flex items-center rtl:flex-row-reverse hover:cursor-pointer
                                                        text-mobileSubtitle mt-6
                                                        sm:text-subtitle
                                                        xl:text-mobileSubtitle xl:me-80 xl:rtl:me-0 xl:mt-8
                                                        4xl:text-title 4xl:mt-20
                                                        5xl:text-fourKSubtitle 5xl:mt-20
                                                        8xl:text-eightKSubtitle`}>
                                                <div className={`underline-${dir}-animation 8xl:after:h-[9px] after:bottom-[-0.3rem] after:bg-sunset flex items-center`}>
                                                        {t("tabTitle_tournaments")}
                                                    <Icon
                                                        className="cursor-pointer fill-sunset rtl:rotate-180 ms-4 5xl:ms-20"
                                                        name={IconNames.arrow}
                                                        width={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 50 :  innerWidth > 2559 ? 30 :25 }
                                                        height={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 50 :  innerWidth > 2559 ? 30 :25 }
                                                        />
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div className={`absolute font-light text-black70 absolute ${isAgainstMystery ? `left-0 xl:left-auto xl:top-[0] right-0` : ` left-[3000px] xl:left-auto xl:top-[200px] 5xl:top-[300px] 8xl:top-[500px]`}
                                                    text-mobileSubtitle
                                                    w-[350px]
                                                    sm:w-[490px] sm:text-subtitle
                                                    xl:w-[250px] xl:me-80 xl:mx-0
                                                    4xl:text-title 4xl:w-[320px]
                                                    5xl:text-fourKSubtitle 5xl:w-[600px]
                                                    8xl:text-eightKSubtitle 8xl:w-[1400px]
                                                    `}
                                                    initial={
                                                        innerWidth > 1279
                                                        ?
                                                            {}
                                                        :
                                                        dir === "ltr"
                                                        ?
                                                            {
                                                                left:isAgainstMystery ? `0px` : `2000px`
                                                            }
                                                        :
                                                            {
                                                                right:isAgainstMystery ? `0px` : `-2000px`
                                                            }
                                                    }
                                                    animate={
                                                        innerWidth > 1279
                                                        ?
                                                            {}
                                                        :
                                                        dir === "ltr"
                                                        ?
                                                            {
                                                                left:isAgainstMystery ? `0px` : `2000px`
                                                            }
                                                        :
                                                            {
                                                                right:isAgainstMystery ? `0px` : `-2000px`
                                                            }
                                                    }
                                                    transition={{duration:1}}
                                        >
                                            {t("homePage_youNeverKnow")}
                                            <div className={`font-light absolute w-fit text-sunset flex items-center rtl:flex-row-reverse hover:cursor-pointer
                                                        text-mobileSubtitle mt-6
                                                        sm:text-subtitle
                                                        xl:text-mobileSubtitle xl:me-80 xl:rtl:me-0 xl:mt-8
                                                        4xl:text-title 4xl:mt-20
                                                        5xl:text-fourKSubtitle
                                                        8xl:text-eightKSubtitle
                                                    `}>
                                                <div className={`underline-${dir}-animation 8xl:after:h-[9px] after:bottom-[-0.3rem] after:bg-sunset flex items-center`}>
                                                        {t("tabTitle_matchmaking")}
                                                    <Icon
                                                        className="cursor-pointer fill-sunset rtl:rotate-180 ms-4 5xl:ms-20"
                                                        name={IconNames.arrow}
                                                        width={innerWidth > 7679 ? 80 :innerWidth > 3839 ? 50 : innerWidth > 2559 ? 30 :25 }
                                                        height={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 50 : innerWidth > 2559 ? 30 :25 }
                                                        />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                            </motion.div>
                                <div className={`relative flex scrollable-x left-0 right-0 items-center justify-center overflow-hidden
                                    aspect-[5/4] h-full
                                    md:aspect-[447/326] md:h-full
                                    xl:mx-0
                                    4xl:aspect-[2041/1489]
                                    5xl:aspect-[4549/3319]
                                    8xl:aspect-[4549/3319] 8xl:h-full 8xl:w-full
                                `}>
                                    <motion.div dir="ltr" className={`absolute left-0 right-0 bottom-0 flex items-end justify-center h-full text-white100
                                        `}
                                        initial={
                                            {
                                                left: "0",
                                            }}
                                            animate={
                                                {
                                                    left:isAgainstMystery ? "-350%" : "0%",
                                                }}
                                                transition={{duration:1}}>
                                        <div className={`flex items-center justify-center overflow-hidden
                                            xl:mb-40
                                        `}>
                                            <div className={`grid grid-cols-7 z-[2] justify-items-center content-end overflow-hidden
                                                text-caption
                                                sm:text-bodySmall
                                                lg:text-bodyLarge
                                                4xl:text-subtitle
                                                5xl:text-bigTitle
                                                8xl:text-LPTitle
                                            `}>
                                                <div className={`bg-purple col-start-1 col-end-4 w-full`}>
                                                    <div className={`bg-purple mt-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        @assaf
                                                    </div>

                                                    <div className={`my-2 xl:my-8 border-b-2 border-sunset flex items-center justify-center`}/>

                                                    <div className={`bg-purple mb-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        Wariors
                                                    </div>
                                                </div>
                                                <div className={`col-start-4 col-end-5 flex items-center justify-center bg-sunset w-full font-medium
                                                    text-bodyLarge px-20
                                                    sm:text-subtitle sm:px-32
                                                    lg:text-title
                                                    xl:px-32
                                                    2xl:text-bigTitle
                                                    5xl:mx-8 5xl:text-LPTitle
                                                    8xl:mx-64 8xl:text-fourKTitle
                                                `}>
                                                    VS
                                                </div>
                                                <div className={`bg-purple col-start-5 col-end-8 w-full`}>
                                                    <div className={`bg-purple mt-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        @salemfahad
                                                    </div>

                                                    <div className={`my-2 xl:my-8 border-b-2 border-sunset flex items-center justify-center`}/>

                                                    <div className={`bg-purple mb-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        Power Gaming
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div dir="ltr" className={`absolute right-[-100%] left-0 flex items-end justify-center h-full bottom-0 text-white100
                                    `}
                                        initial={
                                            {
                                                right: "-350%",
                                            }}
                                            animate={
                                                {
                                                    right:isAgainstMystery ? "0%" : "-350%"
                                                }}
                                                transition={{duration:1}}>
                                        <div className={`flex items-center justify-center overflow-hidden w-[-100%]
                                            xl:mb-40
                                        `}>
                                            <div className={`grid grid-cols-7 z-[2] justify-items-center content-end overflow-hidden
                                                text-caption w-[-100%]
                                                sm:text-bodySmall
                                                lg:text-bodyLarge
                                                4xl:text-subtitle
                                                5xl:text-bigTitle
                                                8xl:text-LPTitle
                                            `}>
                                                <div className={`bg-purple col-start-1 col-end-4 w-full`}>
                                                    <div className={`bg-purple mt-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        @assaf
                                                    </div>

                                                    <div className={`my-2 xl:my-8 border-b-2 border-sunset flex items-center justify-center`}/>

                                                    <div className={`bg-purple mb-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        Wariors
                                                    </div>
                                                </div>
                                                <div className={`col-start-4 col-end-5 flex items-center justify-center bg-sunset w-full font-medium
                                                    text-bodyLarge px-20
                                                    sm:text-subtitle sm:px-32
                                                    lg:text-title
                                                    xl:px-32
                                                    2xl:text-bigTitle
                                                    5xl:mx-8 5xl:text-LPTitle
                                                    8xl:mx-64 8xl:text-fourKTitle
                                                `}>
                                                    VS
                                                </div>
                                                <div className={`bg-purple col-start-5 col-end-8 w-full`}>
                                                    <div className={`bg-purple mt-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        ???
                                                    </div>

                                                    <div className={`my-2 xl:my-8 border-b-2 border-sunset flex items-center justify-center`}/>

                                                    <div className={`bg-purple mb-8 flex items-center justify-center 5xl:py-16 8xl:py-32`}>
                                                        ???
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <div className={`h-full w-full flex flex-row`}>
                                        <motion.div dir="ltr" className={`relative w-full ${isAgainstMystery ? `left-[-50%]` : `left-0`} flex`}
                                        initial={
                                            {
                                                left: "0px",
                                            }}
                                            animate={
                                                {
                                                    left:isAgainstMystery ? "-50%" : "0"
                                                }}
                                                transition={{duration:1}}>
                                                <img src={FirstChallenger} className={`h-full w-[50%] relative z-0 rounded-sm overscroll-none flex-shrink-1`} />
                                                <img src={SecondChallenger} className={`h-full w-[50%] relative z-0 rounded-sm overscroll-none flex-shrink-1`} />
                                                <img src={MysteryChallenger} className={`h-full w-[50%]  relative z-0 rounded-sm overscroll-none flex-shrink-0`} />
                                                <div className={`absolute font-medium text-center text-white
                                                    top-[35%] text-subtitle left-[109%] w-[30%]
                                                    sm:w-[30%] sm:text-title
                                                    md:w-[32%]
                                                    lg:text-huge
                                                    xl:text-bigTitle
                                                    2xl:left-[114%] 2xl:w-[24%]
                                                    4xl:text-LPTitle
                                                    5xl:text-eightKSubtitle
                                                    8xl:text-fourKTitle
                                                    `}>
                                                    {t("homePage_areYouNext")}
                                                </div>
                                        </motion.div>
                                    </div>
                                </div>
                        </div>

                        <div dir={"ltr"} className={`w-full flex items-center justify-center xl:hidden`}>
                            <div className={`h-[2px] w-[24px] cursor-pointer ${isAgainstMystery ? `bg-[#D9D9D9]` : `bg-sunset` }`} onClick={()=> setIsAgainstMystery(false)}/>
                            <div className={`mx-8`} />
                            <div className={`h-[2px] w-[24px] ${isAgainstMystery ? `bg-sunset` : `bg-[#D9D9D9]` }`} onClick={()=> setIsAgainstMystery(true)}/>
                        </div>

                        <div className={`
                            w-full
                            mt-160
                            xl:mt-200
                            flex flex-col lg:flex-row justify-around font-medium items-center
                            5xl:px-765
                            8xl:px-1050 8xl:pb-490
                        `}>
                            <div className={`flex flex-col justify-center items-center`}>
                                <div>
                                    <Image img={GamingController} divStyle={`
                                        h-[72px] w-[72px]
                                        5xl:h-[120px] 5xl:w-[120px]
                                        8xl:h-[200px] 8xl:w-[200px]
                                    `} imgStyle=""/>
                                </div>
                                <div className={`pt-24
                                    text-LPTitle
                                    5xl:text-xlargeDynamic
                                    8xl:text-fiveKDynamic
                                `}>
                                    {helper?.abbrNum(statistics.statisticsData?.active_tournaments,2)}
                                </div>
                                <div className={`pt-24 font-light
                                    text-subtitle
                                    5xl:text-fourKSubtitle
                                    8xl:text-eightKSubtitle
                                `}>
                                    {t("tabTitle_tournaments")}
                                </div>
                            </div>
                            <div className={`flex flex-col justify-center items-center`}>
                                <div>
                                    <Image img={SmileFace} divStyle={`
                                        h-[72px] w-[72px]
                                        5xl:h-[120px] 5xl:w-[120px]
                                        8xl:h-[200px] 8xl:w-[200px]
                                    `} imgStyle=""/>
                                </div>
                                <div className={`pt-24
                                    text-LPTitle
                                    5xl:text-xlargeDynamic
                                    8xl:text-fiveKDynamic
                                `}>
                                    {helper?.abbrNum(statistics.statisticsData?.active_participants,1)}
                                </div>
                                <div className={`pt-24 font-light
                                    text-subtitle
                                    5xl:text-fourKSubtitle
                                    8xl:text-eightKSubtitle
                                `}>
                                    {t("formAttribute_players")}
                                </div>
                            </div>
                            <div className={`flex flex-col justify-center items-center`}>
                                <div>
                                    <Image img={GamingCup} divStyle={`
                                        h-[72px] w-[72px]
                                        5xl:h-[120px] 5xl:w-[120px]
                                        8xl:h-[200px] 8xl:w-[200px]
                                    `} imgStyle=""/>
                                </div>
                                <div className={`pt-24
                                    text-LPTitle
                                    5xl:text-xlargeDynamic
                                    8xl:text-fiveKDynamic
                                `}>
                                    {helper?.abbrNum(statistics.statisticsData?.active_prizes,2)}
                                </div>
                                <div className={`pt-24 font-light
                                    text-subtitle
                                    5xl:text-fourKSubtitle
                                    8xl:text-eightKSubtitle
                                `}>
                                    {t("common_awards")}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>


                <div ref={dynamicRef} className={`w-full bg-white100 absolute bottom-[662px] md:bottom-[434px] 5xl:bottom-[570px] 8xl:bottom-[1065px] z-[1]`}>
                   {!props.hideDynamicBanner && <DynamicBanner/>}
                </div>
            </div>
    )
}

export default CompeteCard;
