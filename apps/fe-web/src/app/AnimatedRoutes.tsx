import React, { Suspense, lazy } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Routes, Route, useLocation } from 'react-router-dom';

import Layout from './pages/Layout';

import DashboardScreenLayout from './pages/DashboardScreen/Layout';

import { AppRoutes } from './app.routes.enum';

import Page404 from './pages/Page404';
import CallbackPage from './pages/CallbackPage';
import SearchPage from './pages/Search';
import useTheme from './hooks/useTheme';
import Container from './components/Container';


const Home  = lazy(() => import('./pages/DashboardScreen/Home'));
const Cart  = lazy(() => import('./pages/Cart'));
const Discover  = lazy(() => import('./pages/Discover'));
const Compete  = lazy(() => import('./pages/Compete'));
const Shop  = lazy(() => import('./pages/Shop/index'));
const HelpAndSupport  = lazy(() => import('./pages/HelpAndSupport'));
const PrivacyAndPolicy  = lazy(() => import('./pages/PrivacyAndPolicy'));
const TermsAndConditions  = lazy(() => import('./pages/TermsAndConditions'));
const CorporateLanding = lazy(() => import('./pages/CorporateLanding/CorporateLanding'));
const AuthenticationScreen = lazy(() => import('./pages/AuthenticationScreen/AuthenticationScreen'))

const AnimatedRoutes = () =>
{
  const location = useLocation();

  useTheme();

  return (
    <AnimatePresence>
      <Routes
        location={location}
        key={location.pathname.includes("auth")? "auth": location.pathname}
      >
        <Route path='/' element={<Layout />}>
          {/* <Route index={true} element={
          <Suspense fallback={<>Loading.....</>}>
            <CorporateLanding/>
          </Suspense>
          }/> */}
          <Route path={AppRoutes.shopMain} element={<DashboardScreenLayout />}>
            <Route index={true} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                  <Shop/>
              </Suspense>
            }/>
          </Route>
          <Route path={AppRoutes.home} element={<DashboardScreenLayout />}>
            <Route index={true} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                  <Home/>
              </Suspense>
            }/>
            <Route path={AppRoutes.cart} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <Cart/>
              </Suspense>
            }/>
            <Route path={AppRoutes.discover} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <Discover/>
              </Suspense>
            }/>
            <Route path={AppRoutes.compete} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <Compete/>
              </Suspense>
            }/>
            <Route path={AppRoutes.shop} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <Shop/>
              </Suspense>
            }/>
            <Route path={AppRoutes.search} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <SearchPage/>
              </Suspense>
            }/>
            <Route path={AppRoutes.helpAndSupport} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <HelpAndSupport/>
              </Suspense>
            }/>
            <Route path={AppRoutes.privacyPolicy} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <PrivacyAndPolicy/>
              </Suspense>
            }/>
            <Route path={AppRoutes.termsAndConditions} element={
              <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
                <TermsAndConditions/>
              </Suspense>
            }/>
          </Route>

          <Route path={AppRoutes.callback} element={<CallbackPage />} />
          <Route path={AppRoutes.auth} element={
            <Suspense fallback={<Container className='bg-primary'>Loading.....</Container>}>
              <AuthenticationScreen />
            </Suspense>
          } />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
      </AnimatePresence>
  );
}


export default AnimatedRoutes
