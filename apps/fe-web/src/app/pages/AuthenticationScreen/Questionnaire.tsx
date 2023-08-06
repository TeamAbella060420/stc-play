import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import {usePersonalizeQuestionnaire, useUser} from '@fe-monorepo/hooks';

import { t } from 'i18next';
import Icon from '../../common/Icon';
import { IconNames } from '@fe-monorepo/helper';
import { useHeaderState } from 'apps/fe-web/src/lib/hooks/useHeaderState/useHeaderState';

type Props = {}

interface DataType
{
   personal_questionnare_id:number,
   name_ar?:string,
   name_en?:string
}

function getQuestionnaireData():DataType[]
{
   return new Array(
      {
         personal_questionnare_id: 1,
         name_en: "To stay up-to-date with the latest gaming news",
         name_ar: "للبقاء على اطلاع بأحدث أخبار الألعاب",
     },
     {
         personal_questionnare_id: 2,
         name_en: "To climb on top of the leaderboards as a gamer",
         name_ar: "للصعود إلى قمة لوحات الصدارة كلاعب",
     },
     {
         personal_questionnare_id: 3,
         name_en: "To buy top-of-the-line gear that fits my needs",
         name_ar: "لشراء أفضل المعدات التي تناسب احتياجاتي",
      },
      {
         personal_questionnare_id: 4,
         name_en: "To excel as a group leaders to inspire others to join",
         name_ar: "التفوق كقائد مجموعة لإلهام الآخرين للانضمام",
     },
     {
         personal_questionnare_id: 5,
         name_en: "To connect with friends and feel part of the community",
         name_ar: "للتواصل مع الأصدقاء والشعور بأنك جزء من المجتمع",
     }
   )
}



export default function Questionnaire({}: Props)
{

   const navigate = useNavigate();

   const innerWidth = useHeaderState().innerWidth

   const [answer, setAnswer] = useState<number>(0);
   const questions:DataType[] = getQuestionnaireData();

   const prefs = useSelector((state: RootState) => state.app);
   const lang:string = useSelector((state: RootState) => state?.app.language);

   const dir:string = (lang?.toLowerCase() === 'en') ? 'ltr' : 'rtl';
   const keyName:string = (lang?.toLowerCase() === 'en') ? 'name_en' : 'name_ar';

   const Questionnaire = usePersonalizeQuestionnaire()

   const sendAnswer = async () =>
   {
      await Questionnaire.submit({personal_questionnaire_code:answer})

      if(Questionnaire.questionnaireData?.submitPersonalizationQuestionnaire?.is_successful)
      {
         navigate("/home")
      }
   }

  return (
   <div className="relative bg-white100 pt-[72px] flex flex-col rounded-[8px] overflow-hidden
      w-full h-full
      sm:w-[588px] sm:h-auto
      4xl:w-[670px]
      5xl:w-[1100px] 5xl:h-[1160px]
      8xl:w-[2300px] 8xl:pt-200  8xl:h-[2400px]
   ">
      <div className="mb-32 px-[40px]">
         <p className="text-black100 font-medium text-center
            text-subtitle
            sm:text-title
            4xl:text-bigTitle
            5xl:text-mobileDynamic
            8xl:text-fourKTitle
         ">
            <div className="mx-38 5xl:mx-140">
               {t('questionnaire_title')}
            </div>
         </p>
         <p className='mt-12 text-black42 font-light text-center
            text-caption
            sm:text-bodySmall
            4xl:text-bodyLarge
            5xl:text-title 5xl:mx-140
            8xl:text-huge
         '>
            {t('questionnaire_description')}
         </p>
      </div>

      <div className="mt-4 mb-32 px-[40px]">
         {
            questions?.map((question:any)=>
            {
               return(
                  <div
                     className={`flex items-center justify-center border px-24 rounded-[4px] cursor-pointer
                     ${(question?.personal_questionnare_id === answer)
                        ? 'bg-lightSunset text-black100 border-sunset'
                        : 'bg-white text-black50'}
                        py-16 my-16
                        4xl:py-32 4xl:px-38
                        8xl:my-72 8xl:px-100  8xl:mx-160
                     `}
                     onClick={() => setAnswer(question?.personal_questionnare_id)}
                  >

                     <Icon name={IconNames.checkFill}
                        width={innerWidth > 7679 ? 60 : innerWidth > 3839 ? 36 : 20}
                        height={innerWidth > 7679 ? 60 : innerWidth > 3839 ? 36 : 20}
                        className={`cursor-pointer absolute mx-8 ${(parseInt(question?.personal_questionnare_id) === answer) ? 'visible' : 'invisible'}
                           ${dir === "ltr" ? `left-[37px] sm:left-[60px]` : `right-[37px] sm:right-[60px]` }
                           ${dir === "ltr" ? `sm:left-[60px] 8xl:left-[240px]` : `8xl:right-[240px]` }
                        `}
                     />

                        <p className="font-regular text-center
                           text-caption
                           sm:text-bodySmall
                           4xl:text-bodyLarge
                           5xl:text-title
                           8xl:text-huge
                        ">
                           {question?.[keyName]}
                        </p>
                  </div>
               )
            })
         }
      </div>

      <div className="h-full w-full flex flex-col items-center border-t">
         <hr className=""/>
         <div className="px-[48px] py-[20px] w-full h-full flex justify-between items-center 8xl:mx-160 8xl:px-220 8xl:py-100">
            <p className={`underline-${dir}-animation after:bottom-[-0.25rem] after:bg-sunset text-sunset cursor-pointer font-regular 
               text-body
               4xl:text-mobileSubtitle
               5xl:text-title
               8xl:text-huge
            `} onClick={()=>navigate("/home")}>
               {t('action_skip')}
            </p>
            <Button
               text={t('action_submit')}
               action={sendAnswer}
               style={`px-24 py-8 8xl:px-48 8xl:py-12 font-medium gap-[8px] hover:border-[1px] hover:border-sunset hover:text-sunsetText rounded-sm leading-6 z-1 text-white100 border-[1px] border-transparent rounded before:bg-sunset after:bg-white100 hover:text-sunsetText rounded-sm undefined button-animation-rtl before:bg-sunset before:text-white after:bg-white100 after:text-sunset
                  text-body
                  4xl:text-mobileSubtitle
                  5xl:text-title 5xl:py-18
                  8xl:text-huge 8xl:py-32
               `}
               // isLoading={prefs?.isLoading}
               disabled={(answer === 0)}
            />
         </div>
      </div>
   </div>
  )
}
