import { useState, useEffect } from "react";

import useForm, { Form } from "../../useForm";

import { useTranslation } from "react-i18next";

import Icon from "../../../../../common/Icon"

import { IconNames, LOGIN_TYPES } from "@fe-monorepo/helper";

import AppleLogin from 'react-apple-login';
import uniqid from 'uniqid';

import EmailField from "../../../../../common/EmailField";
import { useAuth } from "@fe-monorepo/hooks";
import { LoginModel } from "@fe-monorepo/models";
import { useWebSocialMedia } from "apps/fe-web/src/lib/hooks/useWebSocialMedia/useWebSocialMedia";
import SocialMediaAuthentication from "apps/fe-web/src/lib/types/socialMediaType";
import useSocialMediaAuthArray from "../../../useSocialMediaAuthArray";
import SocialMediaAuthButton from "apps/fe-web/src/app/common/SocialMediaAuthButton";
import ContinueButton from "../../../ContinueButton";
import Or from "../../../Or";

import { AnimatePresence, motion } from "framer-motion";
import SocialAuthentication from "./SocialSignUp";

type Props =
{
  isLoading: boolean,
  APIError: { [index: string]: string },
  dir: string,

  goNext: (form: Form) => void,
  resetAPIError: (key: string) => void
}

const EmailPhase = (props: Props) =>
{
  const { isLoading, APIError , dir, goNext, resetAPIError } = props;

  const { form, isFormValid, editForm } = useForm();

  const doAPIErrorMessagesExist = Object.values(APIError).some(error => error);

  return (
    <>
      <EmailField
        apiErrorMessage={APIError.email}
        resetAPIError={() => {
          resetAPIError("email")
        }}
        onChange={e => editForm('email', e)}
      />

      <ContinueButton
        action={() => goNext(form)}
        disabled={(!isFormValid || isLoading || doAPIErrorMessagesExist)}
        isFirstPhase={true}
        authType={"signup"}
      />
    </>
  );
};

export default EmailPhase;
