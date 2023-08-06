import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './Carousel.scss';
import usePageLayout from '../../hooks/usePageLayout';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Container from '../Container';
interface CarouselProps {
    children?: ReactNode;
    className?: string;
}
const Carousel: React.FC<CarouselProps> = ({
    children,
    className
}) => {
    const { direction } = usePageLayout();
    const parentElement = useRef<HTMLDivElement>(null);
    const listElement = useRef<HTMLDivElement>(null);
    const [activeScroll, setActiveScroll] = useState('');
    const cssClassName = twMerge(`
        h-full w-screen 
        relative
    `, className);
    const leftFade = `scroll-container__left`;
    const rightFade = `scroll-container__right`;
    const watchScroll = () => {
        const firstListItem = listElement.current?.querySelector('.scroll-container__list-item:first-child') as Element;
        const lastListItem = listElement.current?.querySelector('.scroll-container__list-item:last-child') as Element;
        const customClassLeftFade = direction === 'ltr' ? 'before:bg-gradient-to-r' : 'after:bg-gradient-to-l';
        const customClassRightFade = direction === 'ltr' ? 'after:bg-gradient-to-l' : 'before:bg-gradient-to-r';
        const observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
              const scrollClass = entry.target === firstListItem ? direction === 'ltr' ? leftFade : rightFade : direction === 'ltr' ? rightFade : leftFade;
              const bgClass = entry.target === firstListItem ? customClassLeftFade : customClassRightFade;
              const mergeClasses = [scrollClass, bgClass, 'drop-shadow-2xl', 'from-brand'];
              if (entry.intersectionRatio != 1) {
                if (!parentElement.current?.classList.contains(scrollClass)) {
                    parentElement.current?.classList.add(...mergeClasses);
                    setActiveScroll(scrollClass);
                }
              } else {
                parentElement.current?.classList.remove(scrollClass); 
                setActiveScroll('');
              }
            });
          }, {threshold: 1});
          if (firstListItem) {
            observer.observe(firstListItem);
          }
          if (lastListItem) {
            observer.observe(lastListItem);
          }
    }
    useEffect(() => {
        watchScroll();
    }, [children]);
    return (
        <div className={cssClassName} ref={parentElement}>
            <div className='w-screen flex flex-nowrap overflow-x-scroll gap-7 4xl:gap-[66.88px] 8xl:gap-[149.33px]' ref={listElement}>
                { children }
            </div>
            <div className='absolute w-full  top-2/4'>
                <Container className='flex w-full items-center justify-between'>
                  {

                  }
                  <MdArrowBackIos size={20} className={`${activeScroll === leftFade ? 'text-secondary' : 'text-secondary/70'}
                    ${direction === 'rtl' && 'rotate-180'}
                  `}/>
                  <MdArrowForwardIos size={20} className={`${activeScroll === rightFade ? 'text-secondary' : 'text-secondary/70'}
                    ${direction === 'rtl' && 'rotate-180'}
                  `}/>
                </Container>
            </div>
        </div>
    );
}
 
export default Carousel;