import { useUserProfile } from '@fe-monorepo/hooks';
import useDrawerToggle from '../../hooks/useDrawerToggle';
import Drawer from '../Drawer';
import UserProfile from './UserProfile';
import { navlinks } from './NavLinks';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePageLayout from '../../hooks/usePageLayout';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdLanguage } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';
import Button from '../Button';
import { AppRoutes } from '../../app.routes.enum';

const MobileDrawer = () => {
    const navigate = useNavigate();
    const { handleLanguageToggle, direction, btnClass, language } = usePageLayout();
    const { t } = useTranslation();
    const { user } = useUserProfile()
    const [open, toggleDrawer] = useDrawerToggle(state => [state.open, state.toggleDrawer]);
    return (

        <Drawer open={open} className='border-t border-secondary/20 mt-[30px]'>
            <section className={`h-[calc(100vh-35px)] px-[20px] ${!user?.username ? 'my-[60px] mt-[20px]' : 'pt-[20px] mb-[60px]'} pb-[60px] divide-y-[1px] divide-secondary/20 flex flex-col gap-[40px] overflow-y-auto`}>
                {
                    !!user?.username && <UserProfile/>
                }

                <div className={`flex flex-col items-start h-[200px] gap-[40px]`}>
                    {
                        navlinks.map(({label, link}, index) => (
                            <Link
                                onClick={() => toggleDrawer(!open)}
                                to={link}
                                key={label}
                                className={`font-regular flex items-center text-secondary h-full hover:cursor-pointer font-normal not-italic text-lg w-full ${user?.username && index === 0 ? 'mt-[40px]' : ''}`}>
                                {t(label)}
                            </Link>
                        ))
                    }
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex items-center justify-between mt-[40px]'>
                        <div className='flex items-center gap-[14px]'>
                            <MdLanguage className='font-semibold text-secondary' size={24}/>
                            <span className='font-regular text-secondary text-lg'>{t('menu_changeLanguage')}</span>
                        </div>
                        <div className='flex items-center gap-[20px]' onClick={() =>  handleLanguageToggle(language === 'en' ? 'ar' : 'en')}>
                                <span className='font-regular text-secondary/50 text-lg'>{t('choose_language_option')}</span>
                                {
                                direction === 'rtl' ? <MdOutlineArrowBackIos className='font-semibold text-secondary' size={16}/>
                                : <MdOutlineArrowForwardIos className='font-semibold text-secondary' size={16}/>
                                }
                        </div>
                    </div>

                    <ThemeToggle
                        cssClassName='mt-[40px]'
                        textCssClassName='text-lg'
                        text={t('dark_mode')}
                        iconSize={24}
                    />
                </div>
                {!user?.username && <div key={direction}>
                    <Button
                        text={t('action_signin')}
                        style={`
                        px-24 py-8
                        w-full
                        text-body
                        font-medium
                        text-white100
                    `}
                        normalStyle={btnClass}
                        onClick={() => navigate(AppRoutes.authSignIn)}
                    />
                </div>}
            </section>
        </Drawer>
    );
}

export default MobileDrawer;
