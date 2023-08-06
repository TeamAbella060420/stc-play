import { useFormState } from 'apps/fe-web/src/lib/hooks/useFormState/useFormState';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PasswordField from '../../common/PasswordField';
import Button from '../../components/Button';
import ContinueButton from './ContinueButton';

import { motion } from 'framer-motion';

const PasswordPhase = (props: { dir: string; goNext: (form: any) => void; apiErrorMessage: string | undefined; isLoading?: boolean }) => {
  const { dir, goNext, isLoading } = props;
  const { form, isFormValid, editForm } = useFormState();
  const { t } = useTranslation();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='animate__animated animate__fadeIn mb-140 4xl:mb-240 5xl:mb-370 8xl:mb-[746px]'>
      <PasswordField
          onChange={e => editForm('Password', e)}
          apiErrorMessage={props.apiErrorMessage}
          validatePassword={false}
      />

      <div className="flex items-center justify-between
              text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
              font-light
              mb-22 4xl:mb-40 5xl:mb-56 8xl:mb-120"
      >
        <div className="flex items-center gap-12 4xl:gap-22 5xl:gap-32 8xl:gap-64">

            <input
              type="checkbox"
              id="rememberMe"
              className={`
                aspect-square
                h-18 4xl:h-32 5xl:h-48 8xl:h-100
                m-0

                border border-gray-300
                cursor-pointer
                rounded-sm
                accent-sunset
              `}

              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />

          <label htmlFor="rememberMe" >{t('formAttribute_remember_password')}</label>
        </div>

        <div>
          <label className="
                  block text-gray-500 font-bold
                  my-4 4xl:my-8 5xl:my-12 8xl:my-22"
          >
            <a href="#" className="cursor-pointer text-sunset font-light
                  border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                  border-sunset hover:border-sunset"
            >
              <span>{t('common_forgot_password')}</span>
            </a>
          </label>
        </div>
      </div>


      <ContinueButton
        action={() => goNext({...form, rememberMe: {value: isChecked}})}
        disabled={!isFormValid || isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PasswordPhase;
