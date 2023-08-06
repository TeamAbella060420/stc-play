import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../../components/Header/Header';
import usePageLayout from '../../hooks/usePageLayout';
import Footer from '../../components/Footer/Footer';

import { AppRoutes } from '../../app.routes.enum';
import useTheme, { theme } from '../../hooks/useTheme';

const DashboardScreenLayout = () => {
  const { direction } = usePageLayout();
  const location = useLocation();
  const { setTheme } = useTheme();
  useEffect(() => {
    const HTMLTAG = document.getElementsByTagName('html')[0];
    const attr = document.createAttribute('dir');
    attr.value = direction;
    HTMLTAG.setAttributeNode(attr);
  }, [direction]);

  useEffect(() => {
    if ([AppRoutes.home as string].includes(location.pathname)) {
      setTheme(theme.dark);
    }
  }, [location.pathname]);
  return (
    <main className="mx-auto h-full">
      <Header />

      <div className="flex flex-col min-h-screen justify-between bg-primary w-full">
        <section className="mb-auto h-full flex-1 overflow-x-clip w-full overflow-y-auto">
          <Outlet />
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default DashboardScreenLayout;
