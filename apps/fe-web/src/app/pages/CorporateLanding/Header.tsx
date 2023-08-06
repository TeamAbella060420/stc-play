import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { IconNames } from '@fe-monorepo/helper';
import { useHeaderState } from '../../../lib/hooks/useHeaderState/useHeaderState';
import { headerConstants } from '../../../lib/constant/headerConstant';
import Button from '../../components/Button';
import Icon from '../../common/Icon';

function Header() {
  const { t, dir, midSection, signIn, changeSection, common_language, changeLang, toggleSidebar, sidebarOpen, innerWidth } =
    useHeaderState();
  const isHeaderDark = useSelector((state: RootState) => state.app.headerColorChange);

  console.log('isHeaderDark: ', isHeaderDark);

  return (
    <div
      className={`text-white50 h-full top-0 px-5 xl:px-120 5xl:px-[400px] 8xl:px-[800px] mx-auto sticky font-light z-30 border-b-[1px] border-solid
      ${isHeaderDark ? `border-white20` : `border-black20`} ${isHeaderDark ? `bg-purple` : `bg-white`} ${
        isHeaderDark ? `text-white50` : `text-black50`
      } ${isHeaderDark ? `border-white20` : `border-black20`}`}
    >
      <div className={`grid grid-cols-2 lg:grid-cols-3 gap-5`}>
        <div>
          {/*
                TODO: A flickering effect happens to this stc play logo whenever
                the user exists the auth screens back to the corporate landing page.

                My guess is that the isHeaderDark state is the culprit.

                I removed the isHeaderDark and made the fill color constant. The flickering stops when I do that.


                The value of isHeaderDark seems to toggle whenever the user exists the auth screens back to the corporate landing page.
          */}
          <Icon
            className={`py-[17px] 5xl:py-[39px] 8xl:py-[64.5px] cursor-pointer ${isHeaderDark ? `fill-white100` : `fill-purple`}`}
            name={IconNames.stcPlay}
            width={innerWidth >= 7680 ? 441.04 : innerWidth >= 3840 ? 198.42 : 110.2}
            height={innerWidth >= 7680 ? 263.85 : innerWidth >= 3840 ? 54.01 : 30}
          />
        </div>
        <div
          className={`flex-row gap-5 md:gap-[16px] 5xl:gap-[32.4px] 8xl:gap-[72px] md:py-20 5xl:py-44 8xl:pt-72 8xl:pb-81 justify-center whitespace-nowrap items-center sm:order-1 hidden sm:hidden md:hidden lg:flex  ${
            isHeaderDark ? `text-white70` : `text-black70`
          }`}
        >
          {headerConstants.map(items => (
            <Link key={items.id} to={'/'}>
              <div
                className={`text-center text-[16px] 5xl:text-[28px] 8xl:text-[64px] cursor-pointer duration-[0.25s] after:bottom-[-1.3rem] 5xl:after:bottom-[-0.5rem] ${
                  midSection === items.midSection ? `${isHeaderDark ? `text-white100` : `text-black100`}` : ``
                } ${isHeaderDark ? `after:bg-white70` : `after:bg-black70`} ${
                  isHeaderDark ? `hover:text-white100` : `hover:text-black100`
                } underline-${dir}-animation`}
                onClick={() => changeSection(items.midSection)}
              >
                {t(items.translation)}
              </div>
            </Link>
          ))}
        </div>
        <div
          className={`gap-5 5xl:gap-[36px] 8xl:gap-[80px] items-center justify-end text-[16px] 5xl:text-[28px] 8xl:text-[64px] sm:order-2 hidden sm:hidden md:hidden lg:flex ${
            dir === 'ltr' ? 'justify-end' : 'justify-start'
          } `}
        >
          <div
            className={`leading-6 cursor-pointer duration-[0.25s] after:bottom-[-0.1rem]  ${
              isHeaderDark ? `after:bg-white70` : `after:bg-black70`
            } ${isHeaderDark ? `text-white70` : `text-black70`} ${
              isHeaderDark ? `hover:text-white100` : `hover:text-black100`
            } underline-${dir}-animation`}
            onClick={() => changeLang()}
          >
            {t(common_language)}
          </div>
          <div>
            <Button
              text={t('action_signin')}
              action={signIn}
              style={`px-24 py-8 8xl:px-48 8xl:py-12 font-medium gap-[8px] z-1 text-white100 border-[1px] border-transparent rounded-sm ${
                isHeaderDark
                  ? dir === 'ltr'
                    ? `after:bg-sunset before:bg-white100`
                    : `before:bg-sunset after:bg-white100`
                  : `${
                      dir === 'ltr' ? `after:bg-sunset before:bg-white100` : `before:bg-sunset after:bg-white100`
                    }
                    hover:border-[1px] hover:border-sunset`
              } hover:text-sunsetText rounded-sm`}
              disabled={false}
            />
          </div>
        </div>
        <div
          className={`inline-flex sm:inline-flex md:inline-flex lg:hidden items-center justify-end text-sm ${
            dir === 'ltr' ? `justify-start` : `justify-end`
          } `}
        >
          <button
            onClick={toggleSidebar}
            data-drawer-target="cta-button-sidebar"
            data-drawer-toggle="cta-button-sidebar"
            aria-controls="cta-button-sidebar"
            type="button"
            className={`border-transparent cursor-pointer ${isHeaderDark ? `fill-white600` : `fill-darkPurple`}`}
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill={`${isHeaderDark ? `white` : `black`}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Sidebar */}
      <aside
        id="cta-button-sidebar"
        className={`block lg:hidden overflow-y-auto font-regular fixed top-0 left-0 z-40 w-screen justify-between ${
          sidebarOpen
            ? `w-[100%] translate-x-[0%]`
            : dir === 'ltr'
            ? `w-[0%] translate-x-[100%] transition-transform duration-[1s]`
            : `w-[0%] translate-x-[-100%] transition-transform duration-[1s]`
        }`}
        aria-label="Sidebar"
      >
        <div className="h-screen px-[20px] py-24 overflow-y-auto overflow-x-hidden flex flex-col justify-between bg-white">
          <div className={``}>
            <div
              className={`pb-[85px] translate-x-[-10%] ${
                dir === 'ltr' && innerWidth < 768
                  ? 'transition-transform duration-[1s] transform-origin-justify-start translate-x-[97%]'
                  : 'transition-transform duration-[1s] transform-origin-justify-end translate-x-[-97%]'
              }`}
            >
              <button
                onClick={toggleSidebar}
                data-drawer-target="cta-button-sidebar"
                data-drawer-toggle="cta-button-sidebar"
                aria-controls="cta-button-sidebar"
                type="button"
              >
                <Icon
                  className={`cursor-pointer ${isHeaderDark ? `fill-white100` : `fill-darkPurple`}`}
                  name={IconNames.close_xbutton}
                  width={14}
                  height={14}
                />
              </button>
            </div>
            <div className="px-[50px]">
              {headerConstants.map(items => (
                <div
                  className={`${
                    dir === 'rtl' && innerWidth < 768
                      ? 'transition-transform duration-[1s] transform-origin-justify-end translate-x-[50px]'
                      : 'transition-transform duration-[1s] transform-origin-justify-start translate-x-[-50px]'
                  }`}
                >
                  <Link key={items.id} to={'/'} className={`flex flex-col text-[#171619] hover:text-gray-900 text-2xl mb-40`}>
                    {t(items.translation)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className={`flex justify-center items-center mb-100`}>
            <div className="container text-center items-center justify-center">
              <button
                type="button"
                className={`text-[16px] text-[#171619b3] leading-6 cursor-pointer underline-${dir}-animation`}
                onClick={() => changeLang()}
              >
                {t(common_language)}
              </button>
            </div>
            <div className="container text-center">
              <Button
                text={t('action_signin')}
                action={signIn}
                style={`px-24 py-8 text-[16px] font-medium gap-[8px] leading-6 z-1 text-white100 border-[1px] border-transparent  ${
                  isHeaderDark
                    ? dir === 'ltr'
                      ? `after:bg-sunset before:bg-white100`
                      : `before:bg-sunset after:bg-white100`
                    : `${
                        dir === 'ltr' ? `after:bg-sunset before:bg-white100` : `before:bg-sunset after:bg-white100`
                      } hover:border-[1px] hover:border-sunset`
                } hover:text-sunsetText rounded-sm`}
                disabled={false}
                fullWidth
              />
            </div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" />}
    </div>
  );
}

export default Header;
