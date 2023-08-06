
import ToggleSwitch from '../ToggleSwitch';
import useTheme, { theme } from '../../hooks/useTheme';
import React from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import useMobileDetect from '../../hooks/useMobileDetect';
import ScaledIcon from '../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';
interface ThemeTogglerProps {
    textCssClassName?: string;
    cssClassName?: string;
    text?: any;
    iconSize?: number;
}
const ThemeToggle: React.FC<ThemeTogglerProps> = ({
    textCssClassName,
    cssClassName,
    text,
    iconSize = 20
}) => {
    const isMobile = useMobileDetect();
    const { setTheme, isDarkTheme } = useTheme();
    const handleToggleChange = (value: boolean) => {
        setTheme(value ? theme.dark : theme.light);
    }
    return (
        <div className={`flex items-center justify-between w-full ${cssClassName}`}>
            <div className={`flex items-center ${isMobile ? 'gap-[14px]' : 'gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44 '}`}>
            <ScaledIcon
                className={`
                  fill-secondary
                  animate__animated animate__fadeIn`
                }
                name={IconNames.moon}
                normalWidth={24}
                normalHeight={24}
                onClick={() => handleToggleChange(isDarkTheme)}
            />
                <span className={`text-secondary text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle`}>{text}</span>
            </div>
            <div className='flex items-center gap-20 4xl:gap-36 5xl:gap-54 8xl:gap-100'>
                <ToggleSwitch onChange={handleToggleChange} value={isDarkTheme}/>
            </div>
        </div>
    );
}

export default ThemeToggle;
