import { useEffect, useState } from 'react';

import { RootState } from '@fe-monorepo/store';

import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux';

import Header from './Header';
import Footer from './Footer';


import { IMAGES } from '@fe-monorepo/assets';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Body from './Body';
import Questionnaire from './Questionnaire';

import { motion, useAnimate, usePresence } from 'framer-motion';
import usePageRefreshDetection from '../../hooks/useDetectPageRefresh';
import { useUserProfile } from '@fe-monorepo/hooks';
import { AppRoutes } from '../../app.routes.enum';

const backgroundImages =
{
  'signup': IMAGES.SignUpBackground.toString(),
  'signin': IMAGES.SignInBackground.toString()
}

const AuthenticationScreen = () =>
{
  const { user } = useUserProfile();

  useEffect(() =>
  {
    if (user?.token && user?.is_2FA_required !== 1)
    {
      navigate(AppRoutes.home, { replace: true })
    }
  }, [user])
  
  const prefs = useSelector((state: RootState) => state.app);

  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate()

  const location = useLocation();
  const navigate = useNavigate()
  const { type } = useParams();

  const [isDoneSignup , setIsDoneSignup] = useState<boolean>(false);

  const { hasPageBeenRefreshed, reset: resetRefreshState } = usePageRefreshDetection()

  const getCurrentPath = (): 'signup' | 'signin' =>
  {
    console.log('type: ', type);

    if (!type || !['signup', 'signin'].includes(type))
    {
      navigate('/*')
    }

    return type as 'signup' | 'signin'
  }

  const [currentType, setType] = useState<'signup'|'signin'>(getCurrentPath());

  const toggleType = () => navigate( '/auth/'+(currentType === 'signup'? 'signin': 'signup'))



  useEffect(() => {
    setType(getCurrentPath());
  }, [location.pathname])

  // Applies animations imperatively
  useEffect(() =>
  {
    if (isPresent)
    {
      const enterAnimation = async () =>
      {
        animate(scope.current, { x: "0%" }, { duration: 0.6 })
        console.log("Auth is mounted");
      }

      if (!hasPageBeenRefreshed() && location.state?.from === "landingPage")
      {
        enterAnimation();
      }
      else
      {
        resetRefreshState()
      }
    }
    else
    {
      const exitAnimation = async () =>
      {
        console.log("present: exitAnimation!!!");

        await animate(scope.current, { x: "100%" }, { duration: 0.6 })
        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent]);

  return (
    <motion.div
        key={"auth"}
        ref={scope}
        className='top-0 min-h-screen min-w-screen flex flex-col sm:grid bg-cover bg-center bg-white100 z-[100]'
        initial={{
          opacity: 1,
          x:  (hasPageBeenRefreshed() || location.state?.from !== "landingPage") ? "0%":"100%"
        }}
    >
      <img
        className={`h-full w-full absolute z-[-1] object-cover ${prefs.language === "ar" && "scale-x-[-1]"}`}
        src={`${backgroundImages["signin"]}`}
        title='background'
        alt='background'
      />

      <motion.img
        className={`h-full w-full absolute z-[-1] object-cover ${prefs.language === "ar" && "scale-x-[-1]"}`}
        src={`${backgroundImages["signup"]}`}
        title='background'
        alt='background'

        initial={{ opacity: type === "signup"? 1 : 0 }}
        animate={{ opacity: type === "signup"? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <div className='bg-white100 overflow-y-scroll sm:bg-transparent absolute h-full w-full z-1'/>

      {
        isDoneSignup
        ?
          <div className={`flex items-center justify-center backdrop-brightness-50`}>
            <Questionnaire/>
          </div>
        :
          ['signup', 'signin'].includes(currentType)
        &&
          <>
            <Header />

            <Body setIsDoneSignup={setIsDoneSignup} type={currentType} toggleType={toggleType} />

            <Footer />
          </>
      }
    </motion.div>
  );
}


export default AuthenticationScreen
