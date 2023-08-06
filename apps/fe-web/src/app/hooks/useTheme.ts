import { useEffect } from 'react';

export enum theme  {
    dark = 'dark',
    light = 'defaultTheme'
}

const useTheme = () => {
    const setTheme = (value: theme) => {
        window.localStorage.setItem('theme', value);
        window.document.body.className = '';
        window.document.body.classList.add(value);
    }
    useEffect(() => {
        setTheme(window.localStorage.getItem('theme') as theme ?? theme.light);
    }, [])
    return {
        setTheme,
        theme: window.localStorage.getItem('theme') as theme ?? theme.light,
        isDarkTheme: window.localStorage.getItem('theme') as theme === theme.dark
    }
}

export default useTheme;
