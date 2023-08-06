import { ReactNode } from 'react';

interface DrawerProps {
    open: boolean;
    children?: ReactNode;
    className?: string;
}
const Drawer: React.FC<DrawerProps> = ({
    open = false,
    children,
    className
}) => {

    return (
        <div>
            <div className={`fixed left-0 z-20 w-full h-full transition-all duration-300 transform bg-primary shadow-lg ${open ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-full ${className}`}>
                { children }
            </div>
        </div>
    );
}

export default Drawer;
