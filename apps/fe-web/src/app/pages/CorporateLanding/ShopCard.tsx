import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';

import { IMAGES } from '@fe-monorepo/assets';
import { IconNames } from '@fe-monorepo/helper';
import { RootState } from '@fe-monorepo/store';

import { useHeaderState } from '../../../lib/hooks/useHeaderState/useHeaderState';

import Icon from '../../common/Icon';
import Image from '../../components/Image';
import Text from '../../components/Text';

interface shopSectionProps {
  shopSectionRef: any;
  isBannerSectionAppear: boolean;
  isShopSectionAppear: boolean;
  isChatSectionAppear: boolean;
}

const HomePageShopSectionComponent = (props: shopSectionProps) => {
  const prefs = useSelector((state: RootState) => state?.app);
  const navigate = useNavigate();

  const innerWidth = useHeaderState().innerWidth;

  const goToShopPage = () => {
    navigate('/');
  };

  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  return (
    <div
      ref={props?.shopSectionRef}
      dir="ltr"
      className={`w-full z-[3] duration-[1s] ${
        props?.isChatSectionAppear
          ? `bg-black100`
          : props?.isShopSectionAppear
          ? `bg-purple`
          : props?.isBannerSectionAppear
          ? 'bg-white'
          : `bg-white`
      } h-[693px] sm:h-[793px] md:h-[893px] lg:h-[993px] xl:h-[1100px] 2xl:h-[1257px] 4xl:h-[1400px] 5xl:h-[2416px] 8xl:h-[5199px] relative `}
    >
      <div
        className={`flex items-center justify-center h-[693px] sm:h-[793px] md:h-[893px] lg:h-[993px] xl:h-[1100px] 2xl:h-[1257px] 4xl:h-[1400px] 5xl:h-[2416px] 8xl:h-[5199px]`}
      >
        <div className={`w-[300px] sm:w-[588px] 4xl:w-[1200px] 8xl:w-[3181px] text-center`}>
          <Text
            divStyle={`duration-[1s] ${
              props.isBannerSectionAppear ? `text-black100` : props?.isChatSectionAppear ? `text-white100` : `text-white100`
            }
            font-medium text-bigTitle sm:text-LPTitle 4xl:text-fourKTitle 8xl:text-eightKTitle tracking-[-1%]`}
            label={t('homePage_favProducts')}
          />

          <Text
            divStyle={`duration-[1s] ${
              props.isBannerSectionAppear ? `text-black70` : props?.isChatSectionAppear ? `text-white70` : `text-white70`
            }
            font-light mt-20 text-mobileSubtitle sm:text-subtitle 4xl:text-fourKSubtitle 8xl:text-eightKSubtitle tracking-[-1%]`}
            label={'homePage_equipYourself'}
          />
          <div className={`flex items-center justify-center`} onClick={goToShopPage}>
            <Text
              divStyle={`font-light pt-20 sm:pt-32 text-sunset flex items-center text-mobileSubtitle sm:text-subtitle 4xl:text-fourKSubtitle 8xl:text-eightKSubtitle rtl:flex-row-reverse hover:cursor-pointer underline-${dir}-animation after:bottom-[-0.5rem] after:bg-sunset`}
              label={'pageTitle_shop'}
              Icon={
                <Icon
                  className="ltr:ms-12 rtl:me-12 cursor-pointer fill-sunset rtl:rotate-180"
                  name={IconNames.arrow}
                  width={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 35 : 25}
                  height={innerWidth > 7679 ? 80 : innerWidth > 3839 ? 35 : 25}
                />
              }
            />
          </div>
        </div>
        <div className={`p-0 m-0 relative`}>
          <Parallax speed={6}>
            <Image
              img={IMAGES.GamingKeyboard}
              divStyle={`absolute
                                top-[-240px] left-[-338px]
                                sm:top-[-200px] sm:left-[-670px]
                                md:top-[-200px] md:left-[-690px]
                                lg:top-[-210px] lg:left-[-700px]
                                xl:top-[-280px] xl:left-[-790px]
                                2xl:top-[-280px] 2xl:left-[-890px]
                                4xl:top-[-480px] 4xl:left-[-1790px]
                                5xl:top-[-580px] 5xl:left-[-1890px]
                                8xl:top-[-1080px] 8xl:left-[-3990px]
                                `}
              imgStyle={`rounded-xl
                                aspect-square w-[57px]
                                sm:w-[90px]
                                md:w-[100px]
                                lg:w-[120px]
                                xl:w-[160px]
                                2xl:w-[160px]
                                4xl:w-[290px]
                                5xl:w-[378px]
                                8xl:w-[674.33px]
                                `}
            />
          </Parallax>

          <Parallax speed={9}>
            <div
              className={`absolute
                                aspect-square top-[-270px] left-[-230px] w-[28px]
                                sm:top-[-220px] sm:left-[-490px] sm:w-[40px]
                                md:top-[-230px] md:left-[-450px] md:w-[50px]
                                lg:top-[-240px] lg:left-[-480px] lg:w-[60px]
                                xl:top-[-350px] xl:left-[-570px] xl:w-[78px]
                                2xl:top-[-350px] 2xl:left-[-570px] 2xl:w-[78px]
                                4xl:top-[-550px] 4xl:left-[-1160px] 4xl:w-[100px]
                                5xl:top-[-800px] 5xl:left-[-1240px] 5xl:w-[161px]
                                8xl:top-[-1340px] 8xl:left-[-2740px] 8xl:w-[298px]
                                bg-moonlight`}
            />
          </Parallax>

          <Parallax speed={9}>
            <Image
              img={IMAGES.ItunesCard}
              divStyle={`absolute
                                top-[150px] left-[-333px]
                                sm:top-[150px] sm:left-[-560px]
                                md:top-[170px] md:left-[-610px]
                                lg:top-[190px] lg:left-[-645px]
                                xl:top-[170px] xl:left-[-730px]
                                2xl:top-[170px] 2xl:left-[-820px]
                                4xl:top-[170px] 4xl:left-[-1690px]
                                5xl:top-[350px] 5xl:left-[-1770px]
                                8xl:top-[750px] 8xl:left-[-3770px]
                                `}
              imgStyle={`rounded-md
                                aspect-[84/114] w-[84px]
                                sm:aspect-[100/140] sm:w-[120px]
                                lg:aspect-[150/190] lg:w-[150px]
                                xl:aspect-[180/230] xl:w-[180px]
                                2xl:aspect-[180/230] 2xl:w-[180px]
                                4xl:aspect-[180/230] 4xl:w-[350px]
                                5xl:aspect-[180/230] 5xl:w-[417px]
                                8xl:aspect-[180/240] 8xl:w-[681px]
                                `}
            />
          </Parallax>

          <Parallax speed={30}>
            <Image
              img={IMAGES.GamingHeadphones}
              divStyle={`absolute
                                top-[-100px] left-[-530px]
                                sm:top-[-10px] sm:left-[-793px]
                                md:top-[-10px] md:left-[-880px]
                                lg:top-[-10px] lg:left-[-950px]
                                xl:top-[-85px] xl:left-[-1050px]
                                2xl:top-[-120px] 2xl:left-[-1190px]
                                4xl:top-[-300px] 4xl:left-[-2200px]
                                5xl:top-[-300px] 5xl:left-[-2450px]
                                8xl:top-[-550px] 8xl:left-[-5050px]
                                `}
              imgStyle={`rounded-md
                                aspect-[205/238] w-[205px]
                                sm:aspect-[250/283] sm:w-[250px]
                                md:aspect-[300/333] md:w-[300px]
                                lg:aspect-[300/333] lg:w-[325px]
                                xl:aspect-[390/480] xl:w-[350px]
                                2xl:aspect-[456/529] 2xl:w-[390px]
                                4xl:aspect-[456/529] 4xl:w-[600px]
                                5xl:aspect-[456/529] 5xl:w-[800.67px]
                                8xl:aspect-[456/529] 8xl:w-[1521.85px]
                                blur-2xl`}
            />
          </Parallax>

          <Parallax speed={5}>
            <Image
              img={IMAGES.GamingKeyboard2}
              divStyle={`flex items-center justify-center absolute
                                top-[190px] left-[-130px] aspect-[70/81.33] w-[70px]
                                sm:top-[190px] sm:left-[-220px] sm:w-[70px] sm:aspect-[70/90.33]
                                md:top-[200px] md:left-[-200px] md:w-[90px] md:aspect-[90/120.33]
                                lg:top-[200px] lg:left-[-200px] lg:w-[110px] lg:w-[110px] lg:aspect-[110/140.33]
                                xl:top-[200px] xl:left-[-150px] xl:w-[130px] xl:aspect-[130/170.33]
                                2xl:top-[200px] 2xl:left-[-150px] 2xl:w-[171px] 2xl:aspect-[130/171.33]
                                4xl:top-[290px] 4xl:left-[-429px] 4xl:w-[230px] 4xl:aspect-[130/171.33]
                                5xl:top-[290px] 5xl:left-[-300px] 5xl:w-[350px] 5xl:aspect-[130/171.33]
                                8xl:top-[700px] 8xl:left-[-820px] 8xl:w-[761.02px] 8xl:aspect-[130/171.33]
                                bg-white100 blur-sm rounded-xl`}
              imgStyle={`rounded-md
                                aspect-[61.86/37.98] w-[61.86px]
                                md:w-[90px] md:aspect-[90/49]
                                lg:w-[100px] lg:aspect-[100/59]
                                xl:w-[120px] xl:aspect-[120/79]
                                2xl:w-[150.99px] 2xl:aspect-[120/79]
                                4xl:w-[180.99px] 4xl:aspect-[120/79]
                                5xl:w-[300.99px] 5xl:aspect-[120/79]
                                8xl:w-[636.36px] 8xl:aspect-[120/79]
                                `}
            />
          </Parallax>

          <Parallax speed={7}>
            <Image
              img={IMAGES.XboxBlack}
              divStyle={`absolute
                                top-[240px] left-[-200px]
                                sm:top-[250px] sm:left-[-310px]
                                md:top-[250px] md:left-[-310px]
                                lg:top-[250px] lg:left-[-310px]
                                xl:top-[250px] xl:left-[-310px]
                                2xl:top-[250px] 2xl:left-[-310px]
                                4xl:top-[390px] 4xl:left-[-670px]
                                5xl:top-[400px] 5xl:left-[-670px]
                                8xl:top-[1000px] 8xl:left-[-1570px]
                                `}
              imgStyle={`rounded-xl
                                aspect-square w-[87px]
                                sm:w-[110px]
                                md:w-[140px]
                                lg:w-[170px]
                                xl:w-[200px]
                                2xl:w-[242px]
                                4xl:w-[300px]
                                5xl:w-[470px]
                                8xl:w-[925px] 8xl:rounded-sm
                                `}
            />
          </Parallax>

          <Parallax speed={9}>
            <div
              className={`absolute blur-md
                            top-[210px] left-[-225px] w-[42px] aspect-square
                            sm:top-[270px] sm:left-[-340px] sm:w-[50px]
                            md:top-[270px] md:left-[-340px] md:w-[60px]
                            lg:top-[270px] lg:left-[-340px] lg:w-[70px]
                            xl:top-[270px] xl:left-[-370px] xl:w-[90px]
                            2xl:top-[320px] 2xl:left-[-370px] 2xl:w-[100px]
                            4xl:top-[490px] 4xl:left-[-750px] 4xl:w-[130px]
                            5xl:top-[550px] 5xl:left-[-750px] 5xl:w-[200px]
                            8xl:top-[1300px] 8xl:left-[-1850px] 8xl:w-[400px]
                            bg-darkPurple`}
            />
          </Parallax>

          <Parallax speed={8}>
            <Image
              img={IMAGES.Ps5Controller}
              divStyle={`absolute
                                top-[150px] left-[-30px] w-[118px]
                                sm:top-[90px] sm:left-[-20px] sm:w-[150px]
                                md:top-[90px] md:left-[-25px] md:w-[150px]
                                lg:top-[70px] lg:left-[50px] lg:w-[210px]
                                xl:top-[70px] xl:left-[130px] xl:w-[250px]
                                2xl:top-[70px] 2xl:left-[220px] 2xl:w-[300px]
                                4xl:top-[130px] 4xl:left-[260px] 4xl:w-[450px]
                                5xl:top-[130px] 5xl:left-[500px] 5xl:w-[580px]
                                8xl:top-[200px] 8xl:left-[500px] 8xl:w-[1290.81px]
                                `}
              imgStyle={`rounded-xl
                                w-[118px] aspect-square
                                sm:w-[150px]
                                md:w-[170px]
                                lg:w-[210px]
                                xl:w-[250px]
                                2xl:w-[300px]
                                4xl:w-[450px]
                                5xl:w-[580px]
                                8xl:w-[1290.81px]
                                `}
            />
          </Parallax>

          <Parallax speed={4}>
            <Image
              img={IMAGES.GamingMouse}
              divStyle={`flex items-center justify-center absolute
                                top-[-220px] left-[5px] w-[69.56px] aspect-[69.56/85.61]
                                sm:top-[-210px] sm:left-[0px] sm:aspect-[79.56/105.61] sm:w-[79.56px]
                                md:top-[-210px] md:left-[100px] md:aspect-[99.56/125.61] md:w-[99.56px]
                                lg:top-[-210px] lg:left-[84px] lg:aspect-[129.56/155.61] lg:w-[129.56px]
                                xl:top-[-260px] xl:left-[160px] xl:aspect-[149.56/195.61] xl:w-[149.56px]
                                2xl:top-[-260px] 2xl:left-[290px] 2xl:aspect-[169.56/215.61] 2xl:w-[169.56px]
                                4xl:top-[-400px] 4xl:left-[420px] 4xl:aspect-[169.56/215.61] 4xl:w-[269.56px]
                                5xl:top-[-400px] 5xl:left-[610px] 5xl:aspect-[169.56/215.61] 5xl:w-[349.56px]
                                8xl:top-[-1150px] 8xl:left-[750px] 8xl:aspect-[169.56/215.61] 8xl:w-[811.56px]
                                bg-white100 blur rounded-xl`}
              imgStyle={`rounded-xl
                                aspect-[53.86/60.98] w-[53.86px]
                                sm:w-[63.86px] sm:aspect-[63.86/78.98]
                                md:w-[83.86px] md:aspect-[83.86/93.98]
                                lg:w-[83.86px] lg:aspect-[83.86/113.98]
                                xl:w-[133.86px] xl:aspect-[133.86/138.98]
                                2xl:w-[143.86px] 2xl:aspect-[143.86/148.98]
                                4xl:w-[243.86px] 4xl:aspect-[143.86/148.98]
                                5xl:w-[300.86px] 5xl:aspect-[143.86/148.98]
                                8xl:w-[711.86px] 8xl:aspect-[143.86/148.98]
                                `}
            />
          </Parallax>

          <Parallax speed={6}>
            <Image
              img={IMAGES.Ps5Console}
              divStyle={`absolute
                                top-[-300px] left-[-30px] w-[85px]
                                sm:left-[-60px] sm:top-[-280px] sm:w-[97px]
                                md:left-[10px] md:top-[-300px] md:w-[120px]
                                lg:left-[-40px] lg:top-[-350px] lg:w-[160px]
                                xl:left-[-20px] xl:top-[-400px] xl:w-[200px]
                                2xl:left-[90px] 2xl:top-[-400px] 2xl:w-[239px]
                                4xl:left-[130px] 4xl:top-[-650px] 4xl:w-[339px]
                                5xl:left-[250px] 5xl:top-[-690px] 5xl:w-[439px]
                                8xl:left-[-80px] 8xl:top-[-1790px] 8xl:w-[1007.29px]
                                `}
              imgStyle={`rounded-xl
                                w-[85px] aspect-[85/109]
                                sm:aspect-[97/123] sm:w-[97px]
                                md:aspect-[120/146] md:w-[120px]
                                lg:aspect-[160/186] lg:w-[160px]
                                xl:aspect-[239/307] xl:w-[200px]
                                2xl:aspect-[239/307] 2xl:w-[239px]
                                4xl:aspect-[239/307] 4xl:w-[339px]
                                5xl:aspect-[239/307] 5xl:w-[439px]
                                8xl:aspect-[239/307] 8xl:w-[1007.29px]
                                `}
            />
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default HomePageShopSectionComponent;
