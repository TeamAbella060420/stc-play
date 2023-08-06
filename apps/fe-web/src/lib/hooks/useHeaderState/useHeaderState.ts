import { useCallback, useEffect, useRef, useState } from 'react';
import { RootState, useAppDispatch } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useAppState } from 'libs/hooks/src/useAppState/useAppState';
import { useNavigate } from 'react-router-dom';

export const useHeaderState = () => {
  const { t, changeLanguage, changeHeaderColorState } = useAppState();
  const prefs = useSelector((state: RootState) => state?.app);
  const common_language = 'common_language';
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;
  const discoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const exitDiscoverRef = useRef(true);

  const [midSection, setMidSection] = useState('');
  const [isHeaderDark, setIsHeaderDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth);

  const signIn = () => navigate('/auth/signin', {
    state: { from: "landingPage" }
  });
  const changeSection = (section: string) => setMidSection(section);

  const changeLang = () => 
  {
    // window?.location?.reload();
    changeLanguage(prefs.language === 'en' ? 'ar' : 'en');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const calculateRootMargin = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1440) {
      return '0px 0px -70%';
    }

    if (windowWidth <= 2560) {
      return '0px 0px -60%';
    }

    return '0px 0px -20%';
  };

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => 
    {
      entries.forEach(entry => {
        console.log(entry, 'entry');
        if (entry.target === discoverRef.current) {
          if (entry.isIntersecting) {
            changeHeaderColorState(true);
          } else {
            changeHeaderColorState(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection);

    if (discoverRef.current) {
      observer.observe(discoverRef.current);
    }

    return () => {
      if (discoverRef.current) {
        observer.unobserve(discoverRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [innerWidth]);

  return {
    prefs,
    dir,
    midSection,
    isHeaderDark,
    sidebarOpen,
    common_language,
    signIn,
    t,
    changeSection,
    changeLang,
    toggleSidebar,
    innerWidth,
    discoverRef
  };
};
