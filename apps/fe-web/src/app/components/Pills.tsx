
import { twMerge } from 'tailwind-merge'

interface PillsProps {
    text: string;
    onClick?: () => void;
    className?: string
}

const Pills: React.FC<PillsProps> = ({
    text,
    onClick,
    className
}) => {
    const cssClassName = twMerge(`
        w-auto 
        min-h-[28px] 
        rounded-[2px] 
        8xl:rounded-[10.66px]
        bg-secondary/[0.05] 
        px-[12px] py-1 
        flex 
        items-center 
        text-secondary/50 
        font-regular 
        text-sm
        whitespace-nowrap`, className)
    return (
        <div className={cssClassName} onClick={onClick}>
            {text}
        </div>
    );
}
 
export default Pills;