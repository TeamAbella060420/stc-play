import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SocialAuthentication from './SignUp/Phases/EmailPhase/SocialSignUp';

interface Props
{
  action: () => void,
  text?: string,
  disabled?: boolean,
  isLoading?: boolean,
  isFirstPhase?: boolean,
  authType?: "signup" | "signin",
  disableSocialButtons?: boolean,
  handleGTMEvent?: (event: string, {}: object) => void
}

const ContinueButton = (props: Props) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const { t } = useTranslation();

  const dir = prefs?.language === 'en' ? `ltr` : `rtl`

  return (
    <motion.div

        className='relative'
        layoutId={dir+'common_continue'}
        layout="preserve-aspect"
        initial={{
          transitionDuration: "0s",
        }}
        transition={{ duration: 0.35  }}

    >
      <Button
          key={dir+"common_continue_button"}
          text={props?.text? props.text: t('common_continue')}
          action={props.action}
          style={`
                px-24 4xl:px-44 5xl:px-64 8xl:px-120
                py-8 4xl:py-16 5xl:py-20 8xl:py-44
                w-full
                text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
                font-medium
                text-white100
                border-[1px]
                5xl:border-[2.66px]

                border-transparent
              `}
          normalStyle={`
                ${dir === 'ltr' ? `after:bg-sunset before:bg-white100` : `before:bg-sunset after:bg-white100`}
                  hover:border-[1px]
                  hover:5xl:border-[2.66px]
                  hover:border-sunset
                  hover:text-sunsetText rounded-sm
              `}
          disabled={props?.disabled}
          isLoading={props?.isLoading}
        />

      {
        !props.disableSocialButtons
      &&

        <SocialAuthentication
            isFirstPhase={props.isFirstPhase}
            authType={props?.authType}
            handleGTMEvent={props?.handleGTMEvent}
        />
      }

    </motion.div>
  );
}

export default ContinueButton
