import * as React from 'react';
import { useTranslation } from 'react-i18next';


const Or = () =>
{
  const { t } = useTranslation();

  return (
    <div className="
          w-full flex justify-center
          my-20 4xl:my-36 5xl:my-54 8xl:my-100"
      >
        <p className="
              text-black50
              text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
              font-regular select-none"
        >{t('common_or')}</p>
    </div>
  );
}

export default Or;
