import {  useEffect, useState } from 'react';
import { Switch } from '@headlessui/react'
import usePageLayout from '../hooks/usePageLayout';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  onChange?: (value: boolean) => void;
  value?: boolean;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChange = () => {},
  value = false
}) => {
  const { direction } = usePageLayout();
  const [toggle, setToggle] = useState(value);

  useEffect(() =>
  {
    onChange(toggle);
  }, [toggle])

  return (
    <motion.div
        className={`
          flex
          ${toggle? "bg-sunset":"bg-[#C4C4C4]"}
          relative
          items-center
          aspect-[9/5]
          h-20 4xl:h-36 5xl:h-54 8xl:h-100

          cursor-pointer
          rounded-full

          px-[3px] 4xl:px-[5.33px] 5xl:px-8 8xl:px-16
          border-transparent
         `}

        onClick={() =>  setToggle(!toggle)}
        style={{ justifyContent: toggle? "flex-end":"flex-start" }}
      >
        <motion.span
          layout
          layoutId={direction+'Toggle'}
          transition={{ duration: 0.45, type: "spring" }}
          aria-hidden='true'
          className={`
            aspect-square
            h-16 4xl:h-[28.44px] 5xl:h-[42.66px] 8xl:h-[85.33px]

            rounded-full bg-white shadow-lg`}
        />
    </motion.div>
  );
}

export default ToggleSwitch;
