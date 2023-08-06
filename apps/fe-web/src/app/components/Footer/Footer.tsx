import { LazyLoadImage } from 'react-lazy-load-image-component';
import Container from '../Container';
import { IMAGES, SOCIALMEDIALINK } from '@fe-monorepo/assets';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app.routes.enum';
import './Footer.scss';
const Footer = () => {
    const { t } = useTranslation();
    const { QrCode, AppleStore, PlayStore } = IMAGES;
    const { facebook, twitter, instagram, youtube, linkedin} = SOCIALMEDIALINK;
   
    return (
        <footer className='cmp-footer w-full overflow-clip'>
            <section className='bg-static-secondary py-[40px] 4xl:py-[71.11px] 8xl:py-[213.33px] border-y border-solid border-white/20'>
                <Container className='bg-static-secondary'>
                    <div className='flex w-full bg-static-secondary gap-[30px] 4xl:gap-[53.33px] 8xl:gap-[160px] max-h-[130px] 4xl:max-h-[231.11px] 8xl:max-h-[693.33px]'>
                        <div className='qr-code h-[129px] w-[139px] p-[6px] rounded-[2px] hidden lg:inline-block 2xl:inline-block 3xl:inline-block 4xl:inline-block 5xl:inline-block 6xl:inline-block 8xl:inline-block
                            4xl:h-[229.33px]
                            4xl:w-[249.11px]
                            4xl:p-[10.66px]
                            8xl:h-[688px]
                            8xl:w-[741.33px]
                            8xl:p-[32px]
                            8xl:rounded-[10.66px]
                        '>
                            <LazyLoadImage
                                src={QrCode.toString()}
                                alt='QR Code'
                                className='w-full h-full'
                            />
                        </div>
                        <div className='flex flex-col gap-[16px] w-full h-full 4xl:gap-[28.44px] 8xl:gap-[85.33px]'>
                            <div className='flex-col hidden lg:flex 2xl:flex 3xl:flex 4xl:flex 5xl:flex 6xl:flex 8xl:flex 
                                4xl:h-[113.77px]
                                8xl:h-[341.33px]'>
                                <div className='text-white font-medium text-2xl 4xl:text-[42.66px] 8xl:text-[128px] h-full'>
                                    {t('footer_get_the')}
                                </div>
                                <div className='text-white font-medium text-2xl 4xl:text-[42.66px] 8xl:text-[128px]  h-full'>
                                    {t('footer_stc_play_app')}
                                </div>
                            </div>
                            <div className='w-full flex
                                flex-col
                                gap-[56px]
                                bg-static
                                sm:gap-[56px]
                                xs:gap-[56px]
                                xsMax:gap-[56px]
                                md:gap-[56px]
                                sm:flex-col
                                xs:flex-col
                                xsMax:flex-col
                                md:flex-col
                                lg:flex-row
                                2xl:flex-row
                                3xl:flex-row
                                4xl:flex-row
                                5xl:flex-row
                                6xl:flex-row
                                8xl:flex-row
                                lg:justify-between
                                2xl:justify-between
                                3xl:justify-between
                                4xl:justify-between
                                5xl:justify-between
                                6xl:justify-between
                                8xl:justify-between
                                8xl:gap-[298px]
                                4xl:gap-[99.55px]
                                
                            '>
                                <div className='flex gap-[16px] 4xl:gap-[28.44px] 8xl:gap-[85.33px]'>
                                    <LazyLoadImage
                                        src={AppleStore.toString()}
                                        className='4xl:w-[213.33px] 4xl:h-[71.11px] 8xl:w-[640px] 8xl:h-[213.33px]'
                                    />
                                    <LazyLoadImage 
                                        src={PlayStore.toString()}
                                        className='4xl:w-[213.33px] 4xl:h-[71.11px] 8xl:w-[640px] 8xl:h-[213.33px]'
                                    />
                                </div>
                                <div className='flex gap-[40px] items-center 4xl:gap-[71.11px] 8xl:gap-[213.33px]'>
                                    <Link to={facebook} reloadDocument>
                                        <FaFacebookF 
                                            className='text-white cursor-pointer 4xl:w-[42.66px] 4xl:h-[42.66px] 8xl:w-[128px] 8xl:h-[128px]' 
                                            size={24} 
                                        />
                                    </Link>
                                    <Link to={twitter} reloadDocument>
                                        <FaTwitter 
                                            className='text-white cursor-pointer 4xl:w-[42.66px] 4xl:h-[42.66px] 8xl:w-[128px] 8xl:h-[128px]'  
                                            size={24} 
                                        />
                                    </Link>
                                    <Link to={instagram} reloadDocument>
                                        <FaInstagram 
                                            className='text-white cursor-pointer 4xl:w-[42.66px] 4xl:h-[42.66px] 8xl:w-[128px] 8xl:h-[128px]'  
                                            size={24} 
                                        />
                                    </Link>
                                    <Link to={youtube} reloadDocument>
                                        <FaYoutube 
                                            className='text-white cursor-pointer 4xl:w-[42.66px] 4xl:h-[42.66px] 8xl:w-[128px] 8xl:h-[128px]'  
                                            size={24}
                                        />
                                    </Link>
                                    <Link to={linkedin} reloadDocument>
                                        <FaLinkedinIn 
                                            className='text-white cursor-pointer 4xl:w-[42.66px] 4xl:h-[42.66px] 8xl:w-[128px] 8xl:h-[128px]'  
                                            size={24}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className='bg-static-secondary'>
                <Container className='bg-static-secondary'>
                    <div className='flex bg-static-secondary py-[34px] w-full
                        sm:gap-[34px]
                        xs:gap-[34px]
                        xsMax:gap-[56px]
                        sm:flex-col
                        xs:flex-col
                        xsMax:flex-col
                        md:flex-row
                        lg:flex-row
                        2xl:flex-row
                        3xl:flex-row
                        4xl:flex-row
                        5xl:flex-row
                        6xl:flex-row
                        7xl:flex-row
                        md:justify-between
                        lg:justify-between
                        2xl:justify-between
                        3xl:justify-between
                        4xl:justify-between
                        5xl:justify-between
                        6xl:justify-between
                        8xl:justify-between
                        4xl:py-[60.44px]
                        8xl:py-[181.33px]
                    
                    '>
                        <div className='flex gap-[24px] 4xl:gap-[42.66px] 8xl:gap-[128px]'>
                            <Link className='text-white/70 text-xs font-regular cursor-pointer 4xl:text-[21.33px] 8xl:text-[64px]' to={AppRoutes.helpAndSupport}>{t('common_help&support')}</Link>
                            <Link className='text-white/70 text-xs font-regular cursor-pointer 4xl:text-[21.33px] 8xl:text-[64px]' to={AppRoutes.privacyPolicy}>{t('menu_privacy')}</Link>
                            <Link className='text-white/70 text-xs font-regular cursor-pointer 4xl:text-[21.33px] 8xl:text-[64px]' to={AppRoutes.termsAndConditions}>{t('terms_and_condition')}</Link>
                        </div>
                        <div className='text-white/70 text-xs font-regular 4xl:text-[21.33px] 8xl:text-[64px]'>
                            {t('common_copyright')}
                        </div>
                    </div>
                </Container>
            </section>
        </footer>
    );
}
 
export default Footer;