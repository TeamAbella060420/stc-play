import { useState } from 'react';
import { RootState } from '@fe-monorepo/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppState } from '@fe-monorepo/hooks';
const usePageLayout = () => {
    const { changeLanguage } = useAppState()
    const prefs = useSelector((state: RootState) => state.app);
    const [direction, setDirection] = useState('ltr');
    const { language } = prefs;
    const btnClass = direction === 'ltr' ? `hover:border-sunset hover:text-sunset rounded-sm after:bg-sunset before:bg-white100` 
    : `hover:border-sunset hover:text-sunset rounded-sm before:bg-sunset after:bg-white100`;
    const handleLanguageToggle = (lang: string = language) => {
        changeLanguage(lang);
    }
    useEffect(() => {
        setDirection(language === 'en' ? 'ltr' : 'rtl');
    }, [language]);

    return {
        direction,
        language,
        handleLanguageToggle,
        btnClass
    }
}
 
export default usePageLayout;