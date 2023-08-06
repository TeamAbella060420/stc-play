import { useEffect, useState } from 'react';


import { motion } from "framer-motion"

interface PropType
{
  className?: string,
  hoverColor?: string,
  alwaysShowUnderline?: boolean,
  text: string,
  underlineStyle: string

  onClick?: () => void
}

const HoverText = (props: PropType)  =>
{
  const [isHover, setHover] = useState<boolean>(false)
  const [showUnderlineGap, setUnderlineGap] = useState<boolean>(false)
  const [initialRenderDone, setInitialRender] = useState<boolean>(false)

  useEffect(() =>
  {
    setTimeout(() => {
      setInitialRender(true)
    }, 500);
  }, []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative h-fit w-fit flex flex-col hover:cursor-pointer ${props?.className}`}>
      <span className=
        {`
            w-fit
            select-none

            hover:${props?.hoverColor}
        `}


        onClick={props?.onClick}
      >
        {props.text}
      </span>

      <div className='absolute w-full flex bottom-0 '>
        <motion.div
            className={`relative ${props.underlineStyle} `}

            initial={{
              width: 0,
            }}
            animate={{
              width: isHover ? "100%" : 0,
            }}
            transition={{
              duration: 0.25
            }}

            onAnimationStart={() => setUnderlineGap(true)}
            onAnimationComplete={() => setUnderlineGap(false)}
        />

        {
          props.alwaysShowUnderline
        &&
          <>
            <motion.div
                className='relative bg-transparent h-full '
                initial={{
                  width: 0,
                }}

                animate={{
                  width: initialRenderDone && showUnderlineGap? 10: 0,
                }}

                transition={{
                  duration: 0.2
                }}
            />

            <motion.div
              className={`relative ${props.underlineStyle}  `}

              initial={{
                width: "100%",
              }}

              animate={{
                width: isHover? 0: "100%",
              }}

              transition={{
                duration: 0.25
              }}

            />
          </>
        }

      </div>
    </div>
  );
}


export default HoverText;
