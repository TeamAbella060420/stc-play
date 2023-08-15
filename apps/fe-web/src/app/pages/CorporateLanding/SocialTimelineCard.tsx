/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { motion } from 'framer-motion';

import { IconNames, translate } from '@fe-monorepo/helper';
import { IMAGES } from '@fe-monorepo/assets';

import { useComponentIsAppear } from '../../../lib/hooks/useComponentIsAppear/useComponentIsAppear';

import Icon from '../../common/Icon';
import Text from '../../components/Text';
import Image from '../../components/Image';

interface TimeLineType {
  isChatSectionAppear: boolean;
  isBannerSectionAppear: boolean;
  isShopCardAppear: boolean;
}

const SocialTimelineCard = (props: TimeLineType) => {
  const prefs = useSelector((state: RootState) => state?.app);
  const [dir, setDir] = useState(prefs?.language === 'en' ? 'ltr' : 'rtl');
  const [shouldShowExplore, setShouldShowExplore] = useState<boolean>(false);
  const [shouldShowTellStory, setShouldShowTellStory] = useState<boolean>(false);
  const exploreRef = useRef(null);
  const tellStoryRef = useRef(null);

  const isExploreApper = useComponentIsAppear(exploreRef);
  const isTellStoryApper = useComponentIsAppear(tellStoryRef);

  useEffect(() => {
    if (isExploreApper.isIntersecting) {
      setShouldShowExplore(true);
    }

    if (isTellStoryApper.isIntersecting) {
      setShouldShowTellStory(true);
    }
  }, [isExploreApper.isIntersecting, isTellStoryApper.isIntersecting]);

  useEffect(() => {
    setDir(prefs?.language === 'en' ? 'ltr' : 'rtl');
  }, [prefs]);

  return (
    <div
      className={`duration-[1s] px-5 xl:px-120 5xl:px-[400px] 8xl:px-[800px] mx-auto py-24 lg:py-72 ${
        props?.isChatSectionAppear
          ? `bg-black100 text-white100`
          : props.isShopCardAppear
          ? `bg-purple text-white100`
          : 'bg-white text-black100'
      }`}
    >
      <div
        className={`font-medium
                text-bigTitle w-[300px] 
                sm:w-[500px] sm:text-mobileDynamic
                lg:text-huge lg:w-[600px]
                xl:w-[700px] xl:text-eightKSubtitle
                5xl:text-fourKTitle 5xl:w-[1300px]
                8xl:text-eightKTitle 8xl:w-[2800px]
            `}
      >
        {translate('onboarding_follow_title')}
      </div>
      <div
        ref={exploreRef}
        className={`
                mt-40 flex flex-col-reverse justify-between
                lg:mt-0 sm:flex-row
            `}
      >
        <motion.div
          className={`w-full relative`}
          initial={
            dir === 'ltr'
              ? {
                  left: shouldShowExplore ? 0 : '-150%',
                  right:`auto`
                }
              : {
                  right: shouldShowExplore ? 0 : '-150%',
                  left:`auto`
                }
          }
          animate={
            dir === 'ltr'
              ? {
                  left: shouldShowExplore ? 0 : '-150%',
                  right:`auto`
                }
              : {
                  right: shouldShowExplore ? 0 : '-150%',
                  left:`auto`
                }
          }
          transition={{ duration: 0.7 }}
        >
          <p
            className={`duration-[1s] font-light ${
              props?.isChatSectionAppear ? `text-white70` : props?.isShopCardAppear ? 'text-white70' : `text-black70`
            }
                        text-mobileSubtitle pt-50 w-full
                        lg:text-subtitle lg:w-[340px] lg:pt-64
                        xl:text-subtitle xl:w-[350px] xl:pt-64
                        4xl:text-fourKSubtitle 4xl:w-[700px] xl:pt-64
                        5xl:text-mobileDynamic 5xl:w-[900px]
                        8xl:text-eightKSubtitle 8xl:w-[1600px] 8xl:pt-200
                     `}
          >
            {translate('onboarding_follow_description')}
          </p>
          <div dir="ltr" className={`w-fit`}>
            <Text
              divStyle={`font-light pt-20 sm:pt-32 text-sunset flex items-center text-mobileSubtitle rtl:flex-row-reverse hover:cursor-pointer underline-${dir}-animation after:bottom-[-0.5rem] after:bg-sunset
                                    lg:text-subtitle 
                                    4xl:text-fourKSubtitle
                                    5xl:text-mobileDynamic
                                    8xl:text-eightKSubtitle 
                                `}
              label={'onboarding_explore_bits'}
              Icon={
                <Icon
                  className="ltr:ms-12 rtl:me-12 cursor-pointer fill-sunset rtl:rotate-180"
                  name={IconNames.arrow}
                  width={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 55 : innerWidth > 2559 ? 35 : 25}
                  height={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 55 : innerWidth > 2559 ? 35 : 25}
                />
              }
            />
          </div>
        </motion.div>
        <motion.div
          className={`w-full flex justify-center sm:justify-end relative`}
          initial={
            dir === 'ltr'
              ? {
                  right: shouldShowExplore ? 0 : '-150%',
                  left:`auto`
                }
              : {
                  left: shouldShowExplore ? 0 : '-150%',
                  right:`auto`
                }
          }
          animate={
            dir === 'ltr'
              ? {
                  right: shouldShowExplore ? 0 : '-150%',
                  left:`auto`
                }
              : {
                  left: shouldShowExplore ? 0 : '-150%',
                  right:`auto`
                }
          }
          transition={{ duration: 0.7 }}
        >
          <div className={`flex relative`}>
            <div
              className={`
                                relative aspect-[188/339] h-[339px]
                                lg:aspect-[141/241] lg:h-[432px]
                                xl:aspect-[141/241] xl:h-[482px]
                                4xl:aspect-[141/241] 4xl:h-[682px]
                                5xl:h-[1082px]
                                8xl:h-[2282px]
                            `}
            >
              <div
                className={`bg-black20 
                                hidden
                                sm:block sm:absolute sm:aspect-[188/339] sm:h-[339px] sm:rounded sm:right-[10px] sm:rtl:right-[-10px] sm:rotate-[-4.16deg] sm:rtl:rotate-[4.16deg]
                                lg:absolute lg:aspect-[141/241] lg:h-[432px] lg:rounded lg:right-[5px] lg:rtl:right-[-10px] lg:rotate-[-4.16deg] lg:rtl:rotate-[4.16deg]
                                xl:absolute xl:aspect-[141/241] xl:h-[482px] xl:rounded xl:right-[10px] xl:rtl:right-[-10px] xl:bottom-[-5px] xl:rotate-[-4.16deg] xl:rtl:rotate-[4.16deg]
                                4xl:absolute 4xl:aspect-[141/241] 4xl:h-[682px] 4xl:rounded 4xl:right-[20px] 4xl:rtl:right-[-10px] 4xl:bottom-[-5px] 4xl:rotate-[-3.5deg] 4xl:rtl:rotate-[3.5deg]
                                5xl:h-[1082px]
                                8xl:h-[2282px]
                            `}
              />
              <div
                className={`bg-[#A68F8F]
                                hidden
                                sm:block sm:absolute sm:aspect-[188/339] sm:h-[339px] sm:rounded sm:right-[10px] sm:rtl:right-[-10px] sm:rotate-[-1.87deg] sm:rtl:rotate-[1.87deg]
                                lg:absolute lg:aspect-[141/241] lg:h-[432px] lg:rounded lg:right-[5px] lg:rtl:right-[-10px] lg:rotate-[-1.87deg] lg:rtl:rotate-[1.87deg]
                                xl:absolute xl:aspect-[141/241] xl:h-[482px] xl:rounded xl:right-[10px] xl:rtl:right-[-10px] xl:bottom-[-5px] xl:rotate-[-1.87deg] xl:rtl:rotate-[1.87deg]
                                4xl:absolute 4xl:aspect-[141/241] 4xl:h-[682px] 4xl:rounded 4xl:right-[10px] 4xl:rtl:right-[-10px] 4xl:bottom-[-5px] 4xl:rotate-[-1.87deg] 4xl:rtl:rotate-[1.87deg]
                                5xl:h-[1082px]
                                8xl:h-[2282px]
                            `}
              />
              <Image
                img={IMAGES.SekiroGif}
                divStyle={``}
                imgStyle={`
                                    absolute aspect-[188/339] h-[339px] rounded
                                    lg:aspect-[141/241] lg:h-[432px]
                                    xl:aspect-[141/241] xl:h-[482px]
                                    4xl:aspect-[141/241] 4xl:h-[682px]
                                    5xl:h-[1082px]
                                    8xl:h-[2282px]
                                `}
              />
              <div
                className={`bg-moonlight absolute 
                                aspect-square w-[56.49px] bottom-[47px] left-[-10px] rtl:left-[140px]
                                aspect-square sm:w-[56.49px] sm:bottom-[47px] sm:left-[-30px] sm:rtl:left-[170px]
                                lg:aspect-square lg:w-[102px] lg:bottom-[58px] lg:left-[-40px] lg:rtl:left-[230px]
                                xl:aspect-square xl:w-[102px] xl:bottom-[40px] xl:left-[-70px] xl:rtl:left-[250px]
                                4xl:aspect-square 4xl:w-[132px] 4xl:bottom-[90px] 4xl:left-[-70px] 4xl:rtl:left-[330px]
                                5xl:w-[182px] 5xl:bottom-[140px] 5xl:left-[-70px] 5xl:rtl:left-[520px]
                                8xl:w-[382px] 8xl:bottom-[190px] 8xl:left-[-290px] 8xl:rtl:left-[1220px]
                            `}
              />
            </div>
            <div className={`w-full`}>
              <Image
                img={IMAGES.MohammedAdnann}
                divStyle={`
                                aspect-[151/160] w-[151px]
                                lg:aspect-[282/299] lg:w-[282px]
                                4xl:aspect-[282/299] 4xl:w-[482px]
                                5xl:w-[620px]
                                8xl:w-[1482px] 8xl:aspect-[500/491]
                            `}
                imgStyle={`rounded w-full h-full`}
              />
              <p
                className={`${props?.isShopCardAppear ? `text-white100` : `text-black100`}
                                text-bodyLarge p-20 font-regular
                                lg:text-subtitle lg:p-24
                                4xl:text-fourKSubtitle 4xl:p-24
                                5xl:p-38 5xl:text-mobileDynamic
                                8xl:text-eightKSubtitle 8xl:p-100
                            `}
              >
                {translate('homePage_mohammedAdnann')}
              </p>
              <p
                className={`text-sunset w-fit
                                flex
                                text-body mx-20 font-regular
                                lg:text-subtitle lg:mx-24
                                4xl:text-fourKSubtitle 4xl:mx-24
                                5xl:text-fourKSubtitle 5xl:mx-38
                                8xl:text-eightKSubtitle 8xl:mx-100
                            `}
              >
                {dir === 'ltr' ? '@mohadn' : 'mohadn@'}
              </p>
              <p
                className={`${props?.isShopCardAppear ? `text-white100` : `text-black100`}
                                text-body px-20 font-medium
                                lg:text-subtitle lg:px-24
                                4xl:text-fourKSubtitle 4xl:px-24
                                5xl:text-fourKSubtitle 5xl:px-38
                                8xl:text-eightKSubtitle 8xl:px-100
                            `}
              >
                {translate('homePage_1,5kfollowers')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div ref={tellStoryRef} className={`flex justify-center items-start flex-col sm:flex-row lg:justify-between mt-200 w-full`}>
        <motion.div
          className={`relative w-full items-center justify-center flex sm:aspect-[122/263] h-[263px] lg:aspect-[19409/42020] lg:h-[380.2px] xl:h-[420.2px] 4xl:h-[620.2px] 5xl:h-[1020.2px] 8xl:h-[2320.2px]`}
          initial={
            dir === 'ltr'
              ? {
                  left: shouldShowTellStory ? (innerWidth > 639 ? 0 : '-20%') : '-150%',
                  right:`auto`
                }
              : {
                  right: shouldShowTellStory ? (innerWidth > 639 ? 0 : '-20%') : '-150%',
                  left:`auto`
                }
          }
          animate={
            dir === 'ltr'
              ? {
                  left: shouldShowTellStory ? (innerWidth > 639 ? 0 : '-20%') : '-150%',
                  right:`auto`
                }
              : {
                  right: shouldShowTellStory ? (innerWidth > 639 ? 0 : '-20%') : '-150%',
                  left:`auto`
                }
          }
          transition={{ duration: 0.7 }}
        >
          <div
            className={`relative flex justify-center aspect-[122/263] h-[263px] lg:aspect-[19409/42020] lg:h-[380.2px] lg:h-[420.2px] 4xl:h-[620.2px] 5xl:h-[1020.2px] 8xl:h-[2320.2px] sm:w-full`}
          >
            <div
              className={`absolute bg-sunset
                            ${
                              dir === 'ltr' ? `left-[105px]` : `left-auto right-[105px]`
                            } aspect-[826936888888889/384000000000000] h-[33.75px] bottom-[40px]
                            ${
                              dir === 'ltr' ? `sm:left-[90px]` : `sm:right-[90px]`
                            } sm:aspect-[826936888888889/384000000000000] sm:h-[43.75px] sm:bottom-[35px]
                            ${
                              dir === 'ltr' ? `md:left-[90px]` : `md:right-[90px]`
                            } md:aspect-[826936888888889/384000000000000] md:h-[53.75px] md:bottom-[15px]
                            ${dir === 'ltr' ? `lg:right-[56px]` : `lg:left-[56px]`} lg:aspect-[209/65] lg:h-[65px] lg:bottom-[65px]
                            ${
                              dir === 'ltr' ? `xl:left-[145px] xl:right-auto` : `xl:right-[150px]`
                            } xl:aspect-[209/65] xl:h-[65px] xl:bottom-[30px]
                            ${dir === 'ltr' ? `4xl:left-[210px]` : `4xl:right-[210px]`} 4xl:aspect-[209/65] 4xl:h-[85px] 4xl:bottom-[69px]
                            ${dir === 'ltr' ? `5xl:left-[329px]` : `5xl:right-[392px]`} 5xl:h-[125px] 5xl:bottom-[129px]
                            ${dir === 'ltr' ? `8xl:left-[500px]` : `8xl:right-[500px]`} 8xl:h-[375px] 8xl:bottom-[220px]
                        `}
            />
            <Image
              img={IMAGES.MobileGamer}
              divStyle={`absolute 
                                aspect-[9489920000000000/7389696000000001] top-[50px] h-[144.33px]
                                ${dir === 'ltr' ? `left-[20px]` : `left-auto right-[20px]`}
                                sm:top-[50px] sm:h-[144.33px] ${dir === 'ltr' ? `sm:left-[20px]` : `sm:right-[20px]`}
                                md:aspect-[357/278] md:top-[40px] md:h-[170px] ${
                                  dir === 'ltr' ? `md:right-[-3px]` : `scale-x-[-1] md:left-[-3px]`
                                }
                                lg:aspect-[357/278] lg:top-[70px] lg:h-[227px] ${
                                  dir === 'ltr' ? `lg:right-[10px]` : `scale-x-[-1] lg:left-[10px]`
                                }
                                xl:aspect-[357/278] xl:top-[50px] xl:h-[280px] ${
                                  dir === 'ltr' ? `xl:right-[40px]` : `scale-x-[-1] xl:left-[40px]`
                                }
                                4xl:aspect-[357/278] 4xl:top-[100px] 4xl:h-[377px] ${
                                  dir === 'ltr' ? `4xl:left-[70px]` : `scale-x-[-1] 4xl:right-[70px]`
                                }
                                5xl:top-[140px] 5xl:h-[627px] ${dir === 'ltr' ? `5xl:left-[150px]` : `scale-x-[-1] 5xl:right-[150px]`}
                                8xl:top-[300px] 8xl:h-[1427px] ${dir === 'ltr' ? `8xl:right-[780px]` : `scale-x-[-1] 8xl:left-[780px]`}
                        `}
              imgStyle={`w-full h-full rounded`}
            />
            <Image
              img={dir === 'ltr' ? IMAGES.IosScreenSTCPlay : IMAGES.IosScreenSTCPlayAr}
              divStyle={`absolute aspect-[122/263] h-[263px] 
                            ${dir === 'ltr' ? `left-[175px]` : `left-auto right-[175px]`}
                            sm:aspect-[122/263] sm:h-[289px] ${dir === 'ltr' ? `sm:left-[180px]` : `sm:right-[180px]`}
                            md:aspect-[122/263] md:h-[289px] ${dir === 'ltr' ? `md:left-[200px]` : `md:right-[200px]`}
                            lg:aspect-[19409/42020] lg:h-[380.2px] ${dir === 'ltr' ? `lg:left-[270px]` : `lg:right-[270px]`}
                            xl:aspect-[19409/42020] xl:h-[420.2px] ${
                              dir === 'ltr' ? `xl:left-[340px] xl:right-auto` : `xl:right-[340px] xl:left-auto`
                            }
                            4xl:aspect-[19409/42020] 4xl:h-[620.2px] ${dir === 'ltr' ? `4xl:left-[480px]` : `4xl:right-[480px]`}
                            5xl:h-[1020.2px] ${dir === 'ltr' ? `5xl:left-[730px]` : `5xl:right-[730px]`}
                            8xl:h-[2320.2px] ${dir === 'ltr' ? `8xl:left-[1700px]` : `8xl:right-[1700px]`}
                            `}
              imgStyle={`h-full w-full
                        `}
            />
            <div
              className={`absolute bg-white shadow-[0_5px_100px_-15px_rgba(0,0,0,0.3)] text-center rounded
                            py-12 top-[5px] ${dir === 'ltr' ? `left-0` : `left-auto right-0`} w-[112.14px]
                            sm:top-[10px]
                            md:top-[0px]
                            lg:py-12 lg:top-[0px] lg:w-[176px]
                            xl:py-12 xl:top-[-20px] xl:w-[216px] 
                            4xl:w-[296px] 4xl:top-[10px] 4xl:py-20
                            5xl:w-[420px] 5xl:top-[-10px] 5xl:py-44
                            8xl:w-[1020px] 8xl:top-[-10px] 8xl:py-100 8xl:rounded-[20px]
                        `}
            >
              <div
                dir="ltr"
                className={`font-medium text-black
                                text-caption
                                lg:text-mobileSubtitle
                                xl:text-subtitle
                                4xl:text-bigTitle
                                5xl:text-mobileDynamic
                                8xl:text-eightKSubtitle
                            `}
              >
                {translate('homePage_lol')} 😂
              </div>
              <div className={`8xl:py-20`} />
              <div
                className={`text-black42 font-regular
                                text-caption
                                lg:text-mobileSubtitle
                                xl:text-mobileSubtitle
                                4xl:text-title
                                5xl:text-bigTitle
                                8xl:text-LPTitle
                            `}
              >
                {translate('homePage_1.7Mviews')}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`w-full flex flex-col justify-center self-center sm:ps-32 lg:ps-140 relative`}
          initial={
            dir === 'ltr'
              ? {
                  right: shouldShowTellStory ? 0 : '-150%',
                  left:`auto`
                }
              : {
                  left: shouldShowTellStory ? 0 : '-150%',
                  right:`auto`
                }
          }
          animate={
            dir === 'ltr'
              ? {
                  right: shouldShowTellStory ? 0 : '-150%',
                  left:`auto`
                }
              : {
                  left: shouldShowTellStory ? 0 : '-150%',
                  right:`auto`
                }
          }
          transition={{ duration: 0.7 }}
        >
          <div className={`w-full grid justify-center`}>
            <p
              className={`duration-[1s] font-light ${
                props?.isChatSectionAppear ? `text-white70` : props?.isShopCardAppear ? 'text-white70' : `text-black70`
              }
                            text-mobileSubtitle pt-32 w-full
                            lg:text-subtitle lg:w-[350px] lg:pt-64
                            4xl:text-fourKSubtitle 4xl:w-[600px] 4xl:pt-64
                            5xl:text-mobileDynamic 5xl:w-[900px]
                            8xl:text-eightKSubtitle 8xl:w-[1600px]
                        `}
            >
              {translate('onboarding_share_every_bit')}
            </p>
            <div dir="ltr" className={`w-fit`}>
              <Text
                divStyle={`font-light pt-20 sm:pt-32  flex items-center rtl:flex-row-reverse hover:cursor-pointer underline-${dir}-animation after:bottom-[-0.5rem] after:bg-sunset
                                    text-mobileSubtitle 
                                    4xl:text-fourKSubtitle
                                    5xl:text-mobileDynamic
                                    8xl:text-eightKSubtitle 
                                `}
                label={'onboarding_tell_story'}
                Icon={
                  <Icon
                    className="ltr:ms-12 rtl:me-12 cursor-pointer fill-sunset rtl:rotate-180"
                    name={IconNames.arrow}
                    width={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 55 : innerWidth > 2559 ? 35 : 25}
                    height={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 55 : innerWidth > 2559 ? 35 : 25}
                  />
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialTimelineCard;
