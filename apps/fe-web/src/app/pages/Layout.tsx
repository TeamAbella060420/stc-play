import { useEffect } from 'react';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import '../assets/css/theme-light.scss';
import Footer from './CorporateLanding/Footer';
import { useComponentIsAppear } from '../../lib/hooks/useComponentIsAppear/useComponentIsAppear';
import { setUser, useAppDispatch } from '@fe-monorepo/store';
import { UserModel } from '@fe-monorepo/models';
import { AppRoutes } from '../app.routes.enum';
import CorporateLanding from './CorporateLanding/CorporateLanding';
import { AnimatePresence } from 'framer-motion';
import usePageRefreshDetection from '../hooks/useDetectPageRefresh';

const Layout = () =>
{
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const dispatch = useAppDispatch();
  const isLogout = queryParameters.get('logout');
  const prefs = useSelector((state: RootState) => state.app);
  const outlet = useOutlet();

  const location = useLocation();

  const { hasPageBeenRefreshed, reset: resetRefreshState } = usePageRefreshDetection()

  useEffect(() =>
  {
    if (isLogout && ['true', true].includes(isLogout)) {
      dispatch(
        setUser({
          userId: '',
          firstName: '',
          lastName: '',
          email: '',
          token: '',
          username: '',
          display_name: '',
          avatar_url: '',
          is_2FA_required: 1,
          mobile: '',
          identifier: ''
        } as UserModel)
      )
      navigate(AppRoutes.home);
    }
  }, [])

  const showLandingPage = location.pathname === "/" ||
    (
      location.pathname.includes("/auth")
    &&
      (!hasPageBeenRefreshed()
    &&
      (location.state?.from === "landingPage") && history.length > 2));

  if (location.pathname === "/")
  {
    resetRefreshState()
  }
  // TODO: find a good fix to stop the user from scrolling on the corporate landing page whenever the auth page is on top.
  // If you can't find a good and simple solution, you can probably stop the scrolling events via javascript.
  return (
    <div dir={`${prefs?.language === 'en' ? `ltr` : `rtl`}`}  className={`${!!outlet && "h-full"} w-full`}>
      {
        showLandingPage
      &&
        <div className={`z-0 static ${!!outlet && "max-h-screen overflow-y-hidden"} `}>
          <CorporateLanding hideDynamicBanner={!!outlet} />
        </div>
      }

      {
        !!outlet
      &&
        <div className='min-h-screen h-full fixed top-0 z-[500] w-full overflow-y-scroll'>
          <Outlet />
        </div>
      }
    </div>
  );
};

export default Layout;
