import { twMerge } from 'tailwind-merge'

interface SpinnerProps {
    className?: string;
}

const Spinner:React.FC<SpinnerProps> = ({
    className
}) => {
    return (
        <div
          className={twMerge(`
            inline-block
            h-20 4xl:h-36 5xl:h-54 8xl:h-100

            aspect-square
            animate-spin
            rounded-full
            border-[4px] 4xl:border-[8px] 5xl:border-[12px] 8xl:border-[22px]
            border-solid
            border-current
            border-r-transparent
            align-[-0.125em]
            text-neutral-100
            motion-reduce:animate-[spin_1.5s_linear_infinite]`, className)}
          role='status'>
          <span
            className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
          >
            Loading...
          </span>
        </div>
    );
}

export default Spinner;
