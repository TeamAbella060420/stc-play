import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app.routes.enum';
import { useTranslation } from 'react-i18next';
import HoverText from '../../common/HoverText';

export const navlinks =
[
    {
        label: 'discover',
        link: AppRoutes.discover
    },
    {
        label: 'compete',
        link: AppRoutes.compete
    },
    {
        label: 'shop',
        link: AppRoutes.shop
    }
];

const NavLinks = () =>
{
    const { t } = useTranslation();

    return (
      // gap-10 4xl:gap-[17.77px]
        <nav className={`
                  gap-[30px] 4xl:gap-54 5xl:gap-80 8xl:gap-160
                  hidden md:flex


                  `}>
            {
                navlinks.map(({label, link}) =>
                (
                    <Link
                        key={label}
                        to={link}
                        className={`group flex flex-col p-0 m-0 items-start justify-between text-secondary/50 h-full hover:cursor-pointer font-normal not-italic`}
                    >
                        <HoverText
                          className="
                            text-secondary/50 font-regular
                            text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                            "
                          hoverColor='text-secondary'
                          alwaysShowUnderline={false}
                          underlineStyle="
                                  z-1 static
                                  bg-secondary
                                  top-[26.375px] 4xl:top-[43px] 5xl:top-[65px] 8xl:top-[130px]
                                  h-2 4xl:h-[3.55px] 5xl:h-[5.33px] 8xl:h-[10.66px]"
                          text={t(label)}
                          onClick={() =>{}}
                        />
                    </Link>
                ))
            }
        </nav>
    );
}

export default NavLinks;
