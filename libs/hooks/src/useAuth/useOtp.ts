import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { OTP_MUTATION } from '@fe-monorepo/data-access';
import { OtpModel, UserModel } from '@fe-monorepo/models';
import { useAppState } from '../index';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, setUser } from '@fe-monorepo/store';

/*** OTP ***/
type OtpResponse = {
  is_successful: boolean;
  error_code: string;
  error_msg: string;
  data: OtpData;
};

type ResetPasswordOtpResponse = {
  requestResetPasswordOTP: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: OtpData;
  };
};

type VerifiedOtpResponse = {
  verifyOTP: {
    is_successful: boolean;
    error_code: string;
    error_msg: string;
    data: OtpData;
  };
};

type OtpParams = {
  details: OtpModel;
};

type OtpData = {
  token: string;
};

export const useOtp = () =>
{
  const [isRequestStatus, setRequestStatus] = useState<boolean>();
  const [isVerifiedStatus, setVerifiedStatus] = useState<boolean>();
  const [requestOTPErrorMsg, setRequestOTPErrorMsg] = useState<string>('');
  const [verifyOTPErrorMsg, setVerifyOTPErrorMsg] = useState<string>('');
  const [verifiedErrorMsg, setVerifiedErrorMsg] = useState<string>('');
  const [tempToken, setTempToken] = useState<string>('');
  const [isServerError, setServerErrorStatus] = useState<boolean>(false);
  const [isOTPLocked, setOTPLockedStatus] = useState<boolean>(false);

  const { changeLoadingState } = useAppState();
  const dispatch = useAppDispatch();

  const { t } = useTranslation()

  const [requestOTPGql, { data: requestOTPResponse, error: requestOTPError, loading: requestOTPLoading }] = useMutation<
    OtpResponse,
    OtpParams
  >(OTP_MUTATION.requestOTP, {
    onError: error => {
      changeLoadingState(false);
      // This is required to prevent unhandled promise errors due to network and invalid token errors
    }
  });

  const [requestResetPasswordOTPGql, { data: requestResetPasswordOTPResponse, error: requestResetPasswordOTPError, loading: requestResetPasswordOTPLoading }] = useMutation<
    ResetPasswordOtpResponse,
    OtpParams
  >(OTP_MUTATION.requestResetPasswordOTP, {
    onError: error => {
      changeLoadingState(false);
      // This is required to prevent unhandled promise errors due to network and invalid token errors
    }
  });

  const [verifyOTPGql, { data: verifyOTPResponse, error: verifyOTPError, loading }] = useMutation<VerifiedOtpResponse, OtpParams>(
    OTP_MUTATION.verifyOTP,
    {
      onError: error => {
        console.log('error: ', error);
        changeLoadingState(false);
        setServerErrorStatus(true);
        // This is required to prevent unhandled promise errors due to network and invalid token errors
      }
    }
  );

  const deleteOTPError = () => {
    setVerifiedErrorMsg('');
    setOTPLockedStatus(false);
  };

  const requestOTP = async (model: OtpModel) => {
    changeLoadingState(true);
    setOTPLockedStatus(false);
    requestOTPGql({
      variables: { details: model }
    });
  };

  const requestResetPasswordOTP = async (model: OtpModel) => {
    changeLoadingState(true);
    setOTPLockedStatus(false);
    requestResetPasswordOTPGql({
      variables: { details: model }
    });
  };

  const verifyOTP = async (model: OtpModel) => {
    changeLoadingState(true);
    setServerErrorStatus(false);
    deleteOTPError();
    return verifyOTPGql({
      variables: { details: model }
    });
  };

  useEffect(() => {
    if (requestOTPError) {
      setRequestOTPErrorMsg(requestOTPError?.message ? requestOTPError?.message : '');
      setRequestStatus(false);
    }
  }, [requestOTPError]);

  useEffect(() => {
    // console.log(verifyOTPError, 'verifyError');
    if (verifyOTPError) {
      setVerifyOTPErrorMsg(verifyOTPError?.message ? verifyOTPError?.message : '');
      setVerifiedStatus(false);
    }
  }, [verifyOTPError]);

  useEffect(() => {
    if (requestOTPResponse) {
      setRequestOTPErrorMsg(requestOTPResponse.error_msg);
      setRequestStatus(requestOTPResponse.is_successful);
      changeLoadingState(loading);
      setRequestStatus(true);
    }
  }, [requestOTPResponse]);

  useEffect(() => {
    if (requestResetPasswordOTPResponse) {
      const response = requestResetPasswordOTPResponse.requestResetPasswordOTP
      setRequestOTPErrorMsg(response.error_msg);
      setRequestStatus(response.is_successful);
      setTempToken(response.data.token)
      changeLoadingState(loading);
      setRequestStatus(true);
    }
  }, [requestResetPasswordOTPResponse]);

  useEffect(() => {
    if (verifyOTPResponse)
    {
      const response = verifyOTPResponse.verifyOTP;

      console.log("response: ", response);

      if (response.error_code === '429')
      {
        console.log("Heeelloooo");

        const errorMessage = t("validation_exceeded_attempts");

        console.log("errorMessage: ", errorMessage);

        setVerifiedErrorMsg(errorMessage);
        setOTPLockedStatus(true);
      } else {
        setVerifiedErrorMsg(response.error_msg);
      }
      setVerifiedStatus(response.is_successful);
      changeLoadingState(false);
    }
  }, [verifyOTPResponse]);

  useEffect(() => {
    if (requestOTPError || verifyOTPError || requestResetPasswordOTPError) {
      // ADD CODE HERE
      changeLoadingState(loading);
      // console.log('verifyOTPError', verifyOTPError);
    }
  }, [requestOTPError, verifyOTPError, requestResetPasswordOTPError]);

  return {
    requestOTP,
    requestResetPasswordOTP,
    verifyOTP,
    deleteOTPError,
    tempToken,
    isRequestStatus,
    isVerifiedStatus,
    requestOTPErrorMsg,
    verifyOTPErrorMsg,
    verifyOTPError,
    verifiedErrorMsg,
    isServerError,
    isOTPLocked
  };
};
