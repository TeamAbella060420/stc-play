import EmailField from "apps/fe-web/src/app/common/EmailField";

import useForm, { Form } from "../useForm";
import ContinueButton from "../../ContinueButton";
import Button from "apps/fe-web/src/app/components/Button";
import { useTranslation } from "react-i18next";

type Props =
{
  isLoading: boolean,
  apiErrorMessage: string,
  dir: string,

  goBack: () => void,
  editEmail: (form: Form) => void,
  resetAPIError: (key: string) => void
}

const EditEmailPhase = (props: Props) =>
{
  const { isLoading, apiErrorMessage , dir, goBack, editEmail, resetAPIError } = props;

  const { t } = useTranslation()
  const { form, isFormValid, editForm } = useForm();

  console.log("APIError: ", apiErrorMessage);

  console.log("isLoading: ", isLoading);


  return (
    <>
      <EmailField
        apiErrorMessage={apiErrorMessage}
        resetAPIError={() => resetAPIError("editEmail")}
        onChange={e => editForm('editEmail', e)}
      />

      <ContinueButton
        action={() => editEmail(form)}
        text={""+t("action_changePersona")}
        disabled={(!isFormValid || isLoading || !!apiErrorMessage )}
        isFirstPhase={false}
        disableSocialButtons={true}
      />


      <Button
          key={dir+"common_cancel_button"}
          text={t('action_cancel')}
          action={goBack}
          style={`
                mt-20 4xl:mt-36 5xl:mt-54 8xl:mt-100

                px-24 4xl:px-44 5xl:px-64 8xl:px-120
                py-8 4xl:py-16 5xl:py-20 8xl:py-44

                w-full
                text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
                font-medium
                text-sunset
                border-[1px] 4xl:border-[1.77px] 5xl:border-[2.66px] 8xl:border-[5.33px]
                border-sunset
              `}

          normalStyle={`
                ${dir === 'ltr' ? `after:bg-white100 before:bg-sunset` : `before:bg-white100 after:bg-sunset`}
                  hover:border-sunset hover:text-white100 rounded-sm
              `}
          disabled={false}
          isLoading={false}
        />

    </>
  );
};

export default EditEmailPhase;
