/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { RootState } from '@fe-monorepo/store';
import { IconNames, translate } from '@fe-monorepo/helper';
import { IMAGES } from '@fe-monorepo/assets';

import { useComponentIsAppear } from '../../../lib/hooks/useComponentIsAppear/useComponentIsAppear';
import { useHeaderState } from '../../../lib/hooks/useHeaderState/useHeaderState';

import Image from '../../components/Image';
import Icon from '../../common/Icon';
import Text from '../../components/Text';

type ConnectCardType = {
  ConnectSectionRef: any;
  isBannerSectionAppear: boolean;
  isShopSectionAppear: boolean;
  isChatSectionAppear: boolean;
};

const ConnectCard = (props: ConnectCardType) => {
  return (
    <div className={`pt-100 duration-[1s] 8xl:pt-370 ${
        props?.isChatSectionAppear
          ? `bg-black100`
          : props?.isShopSectionAppear
          ? `bg-purple`
          : props?.isBannerSectionAppear
          ? 'bg-white'
          : `bg-white`
      } `}>
      <div
        ref={props?.ConnectSectionRef}
        className={`w-full flex flex-col duration-[1s] items-center justify-center ${
          props?.isChatSectionAppear
            ? `bg-black100`
            : props?.isShopSectionAppear
            ? `bg-purple`
            : props?.isBannerSectionAppear
            ? 'bg-white'
            : `bg-white`
        } font-regular`}
      >
        <FirstSection />
        <div
          className={`flex justify-center h-[2px] bg-white10
                  w-[336px]
                  sm:w-[536px]
                  md:w-[636px]
                  lg:w-[900px]
                  xl:w-[1200px]
                  4xl:w-[1900px]
                  5xl:w-[3040px]
                  8xl:w-[6080px]
              `}
        />
        <SecondSection />
      </div>
    </div>
  );
};

const FirstSection = () => {
  const firstSectionRef = useRef(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingReply, setIsTypingReply] = useState(true);
  const [isFirstSectionAppear, setIsFirstSectionAppear] = useState(false);
  const [isReplyAppear, setIsReplyAppear] = useState(false);
  const prefs = useSelector((state: RootState) => state?.app);
  const innerWidth = useHeaderState()?.innerWidth;

  const dir = prefs?.isRTL ? `rtl` : `ltr`;

  const isFirstComponentAppear = useComponentIsAppear(firstSectionRef);

  const iconsList = [
    { icon: IconNames?.speakerOutline, iconClass: `bg-purple` },
    { icon: IconNames?.microphoneOutline, iconClass: `bg-purple` },
    { icon: IconNames?.endCallOutline, iconClass: `bg-sunset` }
  ];

  const setIsTypingToFalse = () => {
    setIsTyping(false);
  };

  const setIsTypingReplyToFalse = () => {
    setIsTypingReply(false);
  };

  const setIsReplyAppearToTrue = () => {
    setIsReplyAppear(true);
    setTimeout(setIsTypingReplyToFalse, 1000);
  };

  useEffect(() => {
    if (isFirstComponentAppear.isIntersecting) {
      setIsFirstSectionAppear(true);
      setTimeout(setIsTypingToFalse, 1000);
      setTimeout(setIsReplyAppearToTrue, 1200);
    }
  }, [isFirstComponentAppear.isIntersecting]);

  return (
    <div dir="ltr" className={`flex flex-col items-center`}>
      <p
        className={`text-center text-white100 font-medium
                w-[335px] text-bigTitle
                sm:w-[575px] sm:text-mobileDynamic
                md:w-[575px] md:text-huge
                lg:w-[792px] lg:text-LPTitle
                5xl:w-[1292px] 5xl:text-fourKTitle
                8xl:w-[3292px] 8xl:text-eightKTitle
                ${
                  prefs?.isRTL
                    ? 'xs:leading-[1.4em] xsMax:leading-[1.4em] sm:leading-[1.4em] md:leading-[1.4em] lg:leading-[1.4em] 5xl:leading-[1.4em] 8xl:leading-[1.4em]'
                    : ''
                }
             `}
      >
        {translate('onboarding_connect_title')}
      </p>
      <div
        ref={firstSectionRef}
        className={`relative flex flex-col items-center overflow-hidden
                h-[512.26px] w-[341.68px] mt-64 mb-0
                sm:h-[612.26px] sm:w-[475px]
                md:h-[712.26px] md:w-[575px]
                lg:h-[459px] lg:w-[1110px] lg:mt-64 lg:mb-80
                4xl:h-[559px] 4xl:w-[1310px] 4xl:mt-64 4xl:mb-80
                5xl:h-[1133px] 5xl:w-[2583px] 5xl:mt-64 5xl:mb-80
                8xl:h-[2301px] 8xl:w-[5244px] 8xl:mt-240 8xl:mb-80
            `}
      >
        <span
          className={`absolute aspect-square bg-moonlight
                    h-[43px] left-[12px] top-[179px]
                    sm:h-[53px] sm:left-[40px] sm:top-[220px]
                    md:h-[63px] md:left-[71px] md:top-[239px]
                    lg:h-[70px] lg:left-[430px] lg:top-[30px]
                    xl:h-[70px] xl:left-[452px] xl:top-[30px]
                    4xl:h-[85px] 4xl:left-[527px] 4xl:top-[34px]
                    5xl:h-[125px] 5xl:left-[998px] 5xl:top-[167px]
                    8xl:h-[325px] 8xl:left-[2159px] 8xl:top-[335px]
                `}
        />
        <Image
          divStyle={`absolute 
                    h-[162px] w-[280px] left-[55px] top-[70px]
                    sm:h-[212px] sm:w-[380px] sm:left-[93px] sm:top-[70px]
                    md:h-[242px] md:w-[440px] md:left-[134px] md:top-[70px]
                    lg:h-[310px] lg:w-[508px] lg:left-[90px] lg:top-[100px]
                    xl:h-[340px] xl:w-[588px] xl:left-[50px] xl:top-[100px]
                    4xl:h-[440px] 4xl:w-[698px] 4xl:left-[40px] 4xl:top-auto 4xl:bottom-[0px]
                    5xl:h-[840px] 5xl:w-[1258px] 5xl:left-[130px]
                    8xl:h-[1640px] 8xl:w-[2758px] 8xl:left-[230px]
                `}
          img={IMAGES.ContentCreater}
          imgStyle={`w-full h-full`}
        />
        <Image
          divStyle={`absolute 
                    h-[162px] w-[280px] bottom-[128px] left-0
                    sm:h-[212px] sm:w-[380px] sm:bottom-[128px] sm:left-0
                    md:h-[242px] md:w-[440px] md:bottom-[168px] sm:left-0
                    lg:right-[102px] lg:h-[310px] lg:w-[508px] lg:bottom-auto lg:left-auto
                    xl:right-0 xl:h-[340px] xl:w-[588px] xl:bottom-auto xl:left-auto
                    4xl:right-0 4xl:h-[440px] 4xl:w-[698px] 4xl:bottom-auto 4xl:left-auto
                    5xl:h-[840px] 5xl:w-[1458px] 5xl:bottom-auto 5xl:left-auto
                    8xl:h-[1640px] 8xl:w-[2758px] 8xl:bottom-auto
                `}
          img={IMAGES.ChatGamer}
          imgStyle={`w-full h-full`}
        />
        <div
          className={`absolute flex items-center justify-center
                    left-[130px] bottom-[295px] gap-12
                    sm:left-[190px] sm:bottom-[350px]
                    md:left-[270px] md:bottom-[430px]
                    lg:left-[280px] lg:bottom-[60px] lg:gap-24
                    xl:left-[270px] xl:bottom-[30px]
                    5xl:left-[640px] 5xl:bottom-[40px] 5xl:gap-36
                    8xl:left-[1370px] 8xl:bottom-[40px] 8xl:gap-100
                `}
        >
          {iconsList?.map((item, index) => {
            return (
              <Icon
                className={`${item?.iconClass} fill-white100 flex items-center justify-center aspect-square rounded-full
                                    w-[29.5px]
                                    sm:w-[35px]
                                    md:w-[40px]
                                    lg:w-[48px]
                                    4xl:w-[58px]
                                    5xl:w-[108px]
                                    8xl:w-[228px]
                                `}
                key={index}
                name={item?.icon}
                width={
                  innerWidth > 7679
                    ? 100
                    : innerWidth > 3839
                    ? 45
                    : innerWidth > 2559
                    ? 25
                    : innerWidth > 1023
                    ? 20
                    : innerWidth > 767
                    ? 18
                    : innerWidth > 639
                    ? 16
                    : 12.17
                }
                height={
                  innerWidth > 7679
                    ? 100
                    : innerWidth > 3839
                    ? 45
                    : innerWidth > 2559
                    ? 25
                    : innerWidth > 1023
                    ? 20
                    : innerWidth > 767
                    ? 18
                    : innerWidth > 639
                    ? 16
                    : 12.17
                }
              />
            );
          })}
        </div>
        <motion.div
          initial={{
            left: isFirstSectionAppear
              ? innerWidth > 7679
                ? `100px`
                : innerWidth > 3839
                ? `90px`
                : innerWidth < 640 || innerWidth > 1279
                ? `20px`
                : innerWidth > 1023
                ? `50px`
                : innerWidth > 767
                ? `150px`
                : innerWidth > 639
                ? '90px'
                : '20px'
              : innerWidth > 7679
              ? `-2000px`
              : innerWidth > 3839
              ? `-1000px`
              : `-250px`
          }}
          animate={{
            left: isFirstSectionAppear
              ? innerWidth > 7679
                ? `100px`
                : innerWidth > 3839
                ? `90px`
                : innerWidth < 640 || innerWidth > 1279
                ? `20px`
                : innerWidth > 1023
                ? `50px`
                : innerWidth > 767
                ? `150px`
                : innerWidth > 639
                ? '70px'
                : '20px'
              : `-250px`
          }}
          transition={{ duration: 1 }}
          className={`absolute flex flex-col items-end 
                    top-[0px]
                    lg:top-[30px]
                    5xl:top-[120px]
                    8xl:top-[290px]
                `}
        >
          <div
            className={`bg-purple flex flex-col items-center justify-center rounded-l rounded-t
                        w-[154px] h-[80px]
                        sm:w-[174px] sm:h-[85px]
                        lg:w-[216px] lg:h-[102px]
                        4xl:w-[246px] 4xl:h-[122px]
                        5xl:w-[446px] 5xl:h-[222px] 5xl:rounded-l-xl 5xl:rounded-t-xl
                        8xl:w-[1046px] 8xl:h-[492px]
                    `}
            onClick={setIsTypingToFalse}
          >
            <div
              className={`relative text-center w-full flex items-center justify-center h-22 
                            text-bodyLarge
                            lg:text-subtitle
                            4xl:text-title
                            5xl:text-mobileDynamic
                            8xl:text-xlargeDynamic
                        `}
            >
              <motion.p
                initial={{ opacity: isTyping ? 1 : 0 }}
                animate={{ opacity: isTyping ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute text-white100`}
              >
                ...
              </motion.p>
              <motion.p
                initial={{ opacity: isTyping ? 0 : 1 }}
                animate={{ opacity: isTyping ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className={`absolute text-white100`}
              >
                {translate('homePage_lookAtThis')}
              </motion.p>
            </div>
            <p
              className={`text-white50 text-center h-22 font-thin
                            lg:text-mobileSubtitle
                            4xl:text-subtitle 4xl:pt-8
                            5xl:text-bigTitle 5xl:pt-32
                            8xl:text-eightKSubtitle 8xl:py-72
                        `}
            >
              {'@besttman'}
            </p>
          </div>
          <div
            className={`border-l-transparent border-r-[0px] border-purple border-t-[20px] border-l-[30px] 5xl:border-t-[40px] 5xl:border-l-[60px] 8xl:border-t-[80px] 8xl:border-l-[100px]`}
          />
        </motion.div>

        <motion.div
          initial={{
            right: isReplyAppear
              ? innerWidth > 3839
                ? `90px`
                : innerWidth > 1279
                ? `60px`
                : innerWidth > 1023
                ? `110px`
                : innerWidth > 767
                ? `125px`
                : innerWidth > 639
                ? `60px`
                : `5px`
              : innerWidth > 7679
              ? `-2000px`
              : innerWidth > 3839
              ? `-1000px`
              : `-250px`
          }}
          animate={{
            right: isReplyAppear
              ? innerWidth > 3839
                ? `220px`
                : innerWidth > 1279
                ? `60px`
                : innerWidth > 1023
                ? `110px`
                : innerWidth > 767
                ? `125px`
                : innerWidth > 639
                ? `60px`
                : `5px`
              : innerWidth > 7679
              ? `-2000px`
              : innerWidth > 3839
              ? `-1000px`
              : `-250px`
          }}
          transition={{ duration: 1 }}
          className={`absolute flex flex-col items-start 
                    top-[350px]
                    sm:top-[440px]
                    md:top-[490px]
                    lg:top-[280px]
                    xl:top-[290px]
                    4xl:top-[400px]
                    5xl:top-[750px]
                    8xl:top-[1450px]
                `}
        >
          <div
            className={`border-r-transparent border-l-[0px] border-purple border-b-[20px] border-r-[30px] 5xl:border-b-[40px] 5xl:border-r-[60px] 8xl:border-b-[80px] 8xl:border-r-[100px]`}
          />
          <div
            className={`bg-purple flex flex-col items-center justify-center rounded-r rounded-b 
                        w-[160px] h-[80px]
                        sm:w-[174px] sm:h-[85px]
                        lg:w-[216px] lg:h-[102px]
                        4xl:w-[246px] 4xl:h-[122px]
                        5xl:w-[446px] 5xl:h-[222px] 5xl:rounded-r-xl 5xl:rounded-b-xl
                        8xl:w-[1046px] 8xl:h-[492px]
                    `}
          >
            <div
              className={`relative text-center w-full flex items-center justify-center h-22
                            text-bodyLarge
                            lg:text-subtitle
                            4xl:text-title
                            5xl:text-mobileDynamic
                            8xl:text-xlargeDynamic
                        `}
            >
              <motion.p
                initial={{ opacity: isTypingReply ? 1 : 0 }}
                animate={{ opacity: isTypingReply ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute text-white100`}
              >
                ...
              </motion.p>
              <motion.p
                initial={{ opacity: isTypingReply ? 0 : 1 }}
                animate={{ opacity: isTypingReply ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className={`absolute text-white100`}
              >
                {translate('homePage_awesome')} 🤩
              </motion.p>
            </div>
            <p
              className={`text-white50 text-center h-22 font-thin
                            text-bodyLarge
                            lg:text-mobileSubtitle
                            4xl:text-subtitle 4xl:pt-8
                            5xl:text-bigTitle 5xl:pt-32
                            8xl:text-eightKSubtitle 8xl:py-72
                        `}
            >
              {'@huffmsae'}
            </p>
          </div>
        </motion.div>
      </div>
      <div dir={dir} className={`w-full flex flex-col items-center`}>
        <Text
          divStyle={`text-center text-white70 font-light
                        w-[291px] text-mobileSubtitle
                        sm:w-[390px] sm:text-subtitle
                        lg:w-[400px] 
                        4xl:text-title lg:w-[550px]
                        5xl:text-fourKSubtitle 5xl:w-[700px]
                        8xl:text-eightKSubtitle 8xl:w-[1600px]
                    `}
          label={'onboarding_connect_description'}
        />
        <Text
          divStyle={`text-sunset font-light w-fit underline-${dir}-animation after:bottom-[-0.1rem] after:bg-sunset cursor-pointer flex items-center justify-center text-center gap-12 mt-32 mb-80 
                    text-mobileSubtitle
                    sm:text-subtitle
                    4xl:text-title
                    5xl:text-fourKSubtitle
                    8xl:text-eightKSubtitle 8xl:gap-40 8xl:after:h-[10px] mb-240
                `}
          label={`action_chat`}
          Icon={
            <Icon
              name={IconNames?.arrow}
              className={`rtl:rotate-180 fill-sunset`}
              width={innerWidth > 7679 ? 90 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 29 : 22}
              height={innerWidth > 7679 ? 90 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 29 : 22}
            />
          }
        />
      </div>
    </div>
  );
};

const SecondSection = () => {
  const prefs = useSelector((state: RootState) => state?.app);
  const innerWidth = useHeaderState()?.innerWidth;

  const dir = prefs?.isRTL ? `rtl` : `ltr`;

  return (
    <div
      className={`flex flex-col  justify-between 
            mt-120 mb-180 h-[344px] w-[375px] flex-row
            sm:h-[344px] sm:w-[536px]
            lg:h-[344px] lg:w-[900px] lg:flex-row
            xl:h-[344px] xl:w-[1200px]
            4xl:h-[544px] 4xl:w-[1900px]
            5xl:w-[3040px] 5xl:h-[904px]
            8xl:w-[6040px] 8xl:h-[1444px] 8xl:mt-280 8xl:mb-370
        `}
    >
      <div className={`relative w-full h-full`}>
        <Image
          divStyle={`absolute blur-sm
                    bottom-[85px] ${dir === 'ltr' ? `left-[140px]` : `right-[140px]`}  w-[220px] h-[115px] 
                    sm:bottom-[50px] ${dir === 'ltr' ? `sm:left-[140px]` : `sm:right-[140px]`} sm:w-[334px] sm:h-[200px]
                    lg:bottom-[20px] ${dir === `ltr` ? `lg:left-[150px]` : `lg:right-[0px]`} lg:w-[334px] lg:h-[200px]
                    xl:bottom-[20px] xl:left-[290px] xl:w-[403px] xl:h-[210px]
                    4xl:bottom-[90px] 4xl:left-[440px] 4xl:w-[524px] 4xl:h-[300px]
                    5xl:bottom-[150px] 5xl:left-[600px] 5xl:w-[774px] 5xl:h-[390px]
                    8xl:bottom-[200px] 8xl:left-[1150px] 8xl:w-[1674px] 8xl:h-[720px]
                    
                `}
          img={IMAGES.GamerCard}
          imgStyle={``}
        />
        <div
          className={`relative 
                    h-[200px] w-[311px]
                    sm:h-[200px] sm:w-[384px]
                    4xl:h-[300px] 4xl:w-[524px]
                    5xl:h-[390px] 5xl:w-[774px]
                    8xl:h-[720px] 8xl:w-[1374px]
                `}
        >
          <div
            className={`absolute flex flex-col rounded h-full w-full bg-purple
                        ${dir === 'ltr' ? `left-[20px]` : `right-[20px]`} top-[0px]
                        ${dir === 'ltr' ? `lg:right-auto lg:left-auto` : `lg:right-[100px]`} lg:top-[40px]
                        ${dir === 'ltr' ? `xl:right-auto xl:left-[20px]` : `xl:right-[300px]`} xl:top-[40px]
                        ${dir === 'ltr' ? `4xl:right-auto 4xl:left-[20px]` : `4xl:right-[390px]`} 4xl:top-[40px]
                        ${dir === 'ltr' ? `5xl:right-auto 5xl:left-[20px]` : `5xl:right-[580px]`} 5xl:top-[220px]
                        ${dir === 'ltr' ? `8xl:right-auto 8xl:left-[220px]` : `8xl:right-[1280px]`} 8xl:top-[300px]
                    `}
          >
            <div className={`flex items-center`}>
              <Image
                divStyle={`
                                m-16 h-[95px] w-[98px]
                                lg:m-16 lg:h-[112px] lg:w-[115px]
                                4xl:m-24 4xl:h-[182px] 4xl:w-[185px]
                                5xl:m-24 5xl:h-[252px] 5xl:w-[255px]
                                8xl:m-48 8xl:h-[452px] 8xl:w-[455px]
                            `}
                img={IMAGES.VRGamer}
                imgStyle={`w-full h-full`}
              />
              <div dir={'ltr'} className={``}>
                <p
                  dir={dir}
                  className={`text-white100
                                    w-[130px] text-title
                                    ${dir === 'ltr' ? `lg:w-[130px]` : `lg:w-[208px]`}
                                    4xl:text-bigTitle ${dir === 'ltr' ? `4xl:w-[130px]` : `4xl:w-[260px]`}
                                    5xl:text-huge ${dir === 'ltr' ? `5xl:w-[130px]` : `5xl:w-[420px]`}
                                    8xl:text-xlargeDynamic ${dir === 'ltr' ? `8xl:w-[130px]` : `8xl:w-[720px]`}
                                `}
                >
                  {translate(`onboarding_connect_maxJohnson`)}
                </p>
                <p
                  className={`text-white50
                                    w-[130px] text-body
                                    lg:w-[130px]
                                    4xl:text-mobileSubtitle
                                    5xl:text-title 5xl:mt-20
                                    8xl:text-huge
                                `}
                >
                  {`@supergamer912`}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-16 text-white100 
                            text-body mt-12
                            lg:text-bodyLarge lg:mt-0
                            4xl:text-mobileSubtitle
                            5xl:text-title 5xl:mx-24 5xl:gap-32
                            8xl:text-mobileDynamic 8xl:mx-44 8xl:gap-44
                        `}
            >
              <p
                className={`flex items-center justify-center border rounded
                                w-[132.77px] h-[40px]
                                lg:w-[168px] lg:h-[40px]
                                4xl:w-[168px] 4xl:h-[50px]
                                5xl:w-full 5xl:h-[70px] 5xl:rounded-lg
                                8xl:w-full 8xl:h-[130px] 8xl:rounded-xl
                            `}
              >
                {translate('action_decline')}
              </p>
              <p
                className={`flex items-center justify-center bg-sunset rounded
                                w-[132.77px] h-[40px]
                                lg:w-[168px] lg:h-[40px]
                                4xl:w-[168px] 4xl:h-[50px]
                                5xl:w-full 5xl:h-[70px] 5xl:rounded-lg
                                8xl:w-full 8xl:h-[130px] 8xl:rounded-xl
                            `}
              >
                {translate('action_accept')}
              </p>
            </div>
          </div>

          <div
            className={`absolute blur-md aspect-square bg-darkPurple
                        ${dir === 'ltr' ? `right-[-10px]` : `left-[-10px]`} h-[44px] top-[-20px]
                        ${dir === 'ltr' ? `lg:right-[-50px]` : `lg:left-[250px]`} lg:h-[79px] lg:top-auto
                        ${dir === 'ltr' ? `xl:right-[-50px]` : `xl:left-[50px]`} xl:h-[79px] xl:top-auto
                        ${dir === 'ltr' ? `4xl:right-[-50px]` : `4xl:left-[100px]`} 4xl:h-[89px] 4xl:top-auto
                        ${dir === 'ltr' ? `5xl:right-[-80px]` : `5xl:left-[140px]`} 5xl:h-[139px] 5xl:blur-lg 5xl:top-[120px]
                        ${dir === 'ltr' ? `8xl:right-[-380px]` : `8xl:left-[0px]`} 8xl:h-[239px] 8xl:blur-xl 8xl:top-[120px]
                    `}
          />
        </div>
        <div
          className={`absolute flex items-center justify-center gap-18 aspect-square bg-white100 rounded
                    bottom-[65px] left-[100px] w-[192px] h-[48px]
                    sm:bottom-[60px] ${dir === `ltr` ? `sm:left-[130px]` : `sm:right-[130px]`} sm:w-[210px] sm:h-[53px]
                    lg:bottom-[10px] ${dir === `ltr` ? `lg:left-[10px]` : `lg:right-[230px]`} lg:w-[223px] lg:h-[56px]
                    xl:bottom-[0px] ${dir === `ltr` ? `xl:left-[130px]` : `xl:right-[340px]`} xl:w-[223px] 
                    4xl:bottom-[110px] ${dir === `ltr` ? `4xl:left-[200px]` : `4xl:right-[490px]`} 4xl:w-[323px] 4xl:h-[66px]
                    5xl:bottom-[120px] ${dir === `ltr` ? `5xl:left-[330px]` : `5xl:right-[690px]`} 5xl:w-[393px] 5xl:h-[96px]
                    8xl:bottom-[0px] ${dir === `ltr` ? `8xl:left-[650px]` : `8xl:right-[1430px]`} 8xl:w-[693px] 8xl:h-[196px] 8xl:rounded-xl
                `}
        >
          <Icon
            name={IconNames?.newBellOutline}
            height={innerWidth > 7679 ? 70 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 27 : 20}
            width={innerWidth > 7679 ? 70 : innerWidth > 3839 ? 40 : innerWidth > 2559 ? 27 : 20}
            className={`fill-sunset`}
          />
          <p className={`text-body sm:text-bodyLarge 4xl:text-subtitle 5xl:text-title 8xl:text-huge`}>
            {translate('homePage_friendInvite')}
          </p>
        </div>
      </div>
      <div className={`relative lg:w-full lg:h-full flex items-center justify-center top-40 lg:top-auto`}>
        <div className={`lg:relative lg:h-full flex items-center justify-center`}>
          <div
            className={`absolute h-full flex flex-col gap-32 justify-center text-white70 font-light
                        ${dir === 'ltr' ? `left-auto` : `right-auto`} bottom-0 w-[384px] text-mobileSubtitle text-center items-center
                        ${dir === 'ltr' ? `lg:left-[-140px]` : `lg:right-[-140px]`} lg:bottom-0 lg:w-[384px] sm:text-subtitle
                        lg:items-start lg:text-start
                        ${dir === 'ltr' ? `xl:left-[-100px]` : `xl:right-[-100px]`}
                        ${dir === 'ltr' ? `4xl:left-[-270px]` : `4xl:right-[-100px]`} 4xl:text-bigTitle 
                        ${dir === 'ltr' ? `5xl:left-[-400px]` : `5xl:right-[-100px]`} 5xl:text-fourKSubtitle
                        ${dir === 'ltr' ? `8xl:left-[-700px]` : `8xl:right-[-500px]`} 8xl:text-eightKSubtitle
                    `}
          >
            <Text
              divStyle={`w-[300px] sm:w-[384px] 4xl:w-[704px] 5xl:w-[854px] 8xl:w-[1700px]`}
              label={'onboarding_connect_inviteFriends'}
            />
            <Text
              divStyle={`text-sunset w-fit underline-${dir}-animation after:bottom-[-0.1rem] after:bg-sunset cursor-pointer flex items-center justify-start gap-12 8xl:after:h-[10px] 8xl:w-[720px] 8xl:gap-40`}
              label={`onboarding_connect_findFriends`}
              Icon={
                <Icon
                  name={IconNames?.arrow}
                  className={`rtl:rotate-180 fill-sunset`}
                  width={innerWidth > 7679 ? 90 : innerWidth > 2559 ? 35 : 22}
                  height={innerWidth > 7679 ? 90 : innerWidth > 2559 ? 35 : 22}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;
