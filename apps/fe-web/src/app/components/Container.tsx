import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';


interface ContainerProps {
    children?: ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({
    children,
    className
}) => {
    const cssClassName = twMerge(`
        w-full
        h-full
        px-20
        md:px-64
        lg:px-120
        4xl:px-160
        5xl:px-320
        8xl:px-655
    `, className)
    return (
        <div className={cssClassName}>
            {children}
        </div>
    );
}

export default Container;
