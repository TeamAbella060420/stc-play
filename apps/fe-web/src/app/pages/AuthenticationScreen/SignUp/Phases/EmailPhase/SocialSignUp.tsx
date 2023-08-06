import { useEffect, useRef, useState } from 'react';

import { IconNames, LOGIN_TYPES } from "@fe-monorepo/helper";

import { usePresence, useAnimate } from 'framer-motion';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useWebSocialMedia } from 'apps/fe-web/src/lib/hooks/useWebSocialMedia/useWebSocialMedia';
import { useAuth } from '@fe-monorepo/hooks';
import { LoginModel } from '@fe-monorepo/models';
import { motion } from 'framer-motion';

import AppleLogin from 'react-apple-login';
import uniqid from 'uniqid';

import Or from '../../../Or';

import { getBaseURL, ENDPOINTS } from "../../../../../../../../fe-api/src/app/common/endpoints"

import SocialMediaAuthButton from 'apps/fe-web/src/app/common/SocialMediaAuthButton';

import useSocialMediaAuthArray from '../../../useSocialMediaAuthArray';
import SocialMediaAuthentication from 'apps/fe-web/src/lib/types/socialMediaType';


const AppleComponent = (props: {
          authType?: "signup" | "signin",
          value: SocialMediaAuthentication,
          handleGTMEvent?: (event: string, {}: object) => void
    }) =>
  {
    const { value } = props;
    const { appleLoginUser } = useAuth();

    if (props.authType === "signup")
    {
      const AppleSignUpURL = getBaseURL() + ENDPOINTS.User.AppleSignupWeb;

      return (
        <AppleLogin
          clientId="com.stcplay.xplay"
          redirectURI={AppleSignUpURL}
          scope="name email"
          usePopup={false}
          nonce={uniqid()}
          state="signup"
          responseType="code"
          render={({ onClick }) => {
            return <SocialMediaAuthButton key={value.text} value={value} onClick={onClick} />;
          }}
          responseMode="query"
          callback={cb =>
          {
            if (cb?.authorization)
            {
              appleLoginUser({ code: cb?.authorization?.code });
            }
          }}
        />
      )
    }
    else
    {

      const AppleSignInURL = getBaseURL() + ENDPOINTS.User.AppleLoginWeb;

      console.log("AppleSignInURL: ", AppleSignInURL);

      // "https://api-dev.stcplay.gg/v3/crm/user/access/appleLoginWeb"
      return (
        <AppleLogin
        clientId="com.stcplay.xplay"
        redirectURI={AppleSignInURL}
        scope="name email"
        usePopup={false}
        nonce={uniqid()}
        state="signin"
        responseType="code"
        render={({ onClick }) => {
          return (
            <SocialMediaAuthButton
                key={value.text}
                value={value}
                onClick={onClick}
            />
          );
        }}
        responseMode="query"
        callback={cb => {
          console.log('cbbbbb', cb);
          if (cb?.authorization) {
            appleLoginUser({
              code: cb?.authorization?.code
            });

            if (props?.handleGTMEvent)
            {
              props?.handleGTMEvent('login', { loginMethod: LOGIN_TYPES.APPLE });
            }
          } else
          {
            if (props?.handleGTMEvent)
            {
              props?.handleGTMEvent('login_failed', { loginMethod: LOGIN_TYPES.APPLE });
            }
          }
        }}
      />
      )
    }
  }

const SocialAuthentication = (props: {
    isFirstPhase?: boolean, authType?: "signup" | "signin",
    handleGTMEvent?: (event: string, {}: object) => void
  }) =>
{
  const prefs = useSelector((state: RootState) => state.app);
  const { createAccessLink, linkData, errorMessage, appleLoginUser } =  useAuth();
  const { getMediaLink } = useWebSocialMedia()
  const [currentProvider, setCurrentProvider] = useState<string>('');
  const [hasLanguageChanged, setHasLanguageChanged] = useState<boolean>(false);
  const signupSocial = (provider: LOGIN_TYPES) =>
  {
    console.log("Signup provider: ", provider);

    setCurrentProvider(provider)
    createAccessLink({ provider: provider, type: "signup" } as LoginModel)
  }

  const socialMedia = useSocialMediaAuthArray(
    {
      authenticate: props.authType === "signup"?
      {
        google: () => signupSocial(LOGIN_TYPES.GOOGLE),
        facebook: () => signupSocial(LOGIN_TYPES.FACE_BOOK),
        twitter: () => signupSocial(LOGIN_TYPES.TWITTER)
      }
      :
      {
        google: () =>
        {
          setCurrentProvider(LOGIN_TYPES.GOOGLE);
          createAccessLink({
            provider: LOGIN_TYPES.GOOGLE,
            type: 'signin'
          } as LoginModel);

            if (props?.handleGTMEvent)
            {
              props.handleGTMEvent('login', { loginMethod: LOGIN_TYPES.GOOGLE });
            }

        },

        facebook: () =>
        {
          setCurrentProvider(LOGIN_TYPES.FACE_BOOK);
          createAccessLink({
            provider: LOGIN_TYPES.FACE_BOOK,
            type: 'signin'
          } as LoginModel);

          if (props?.handleGTMEvent)
          {
            props.handleGTMEvent('login', { loginMethod: LOGIN_TYPES.FACE_BOOK });
          }
        },
        twitter: () => {
          setCurrentProvider(LOGIN_TYPES.TWITTER);
          createAccessLink({
            provider: LOGIN_TYPES.TWITTER,
            type: 'signin'
          } as LoginModel);

          if (props?.handleGTMEvent)
          {
            props.handleGTMEvent('login', { loginMethod: LOGIN_TYPES.TWITTER });
          }
        }
      }
    }
  )

  useEffect(() =>
  {
    if (linkData !== undefined)
    {
      if (linkData?.url?.length > 0)
      {
        getMediaLink(linkData.url, currentProvider);
      }
    }
  }, [linkData, currentProvider, errorMessage]);



  console.log("hasLanguageChanged: ", hasLanguageChanged);

  return (
    <motion.div
      key={"socialMediaAuth"}
      className='w-full'
      layoutId={'socialMediaAuth'}
      initial={{
        position: props?.isFirstPhase? "relative": "absolute",
        x: "0%", y: "0%",
      }}

      animate={{
        opacity: props?.isFirstPhase? 1:0,
        transition:{ duration: 0.35 },
        transitionEnd:
        {
          display: !props?.isFirstPhase? "none": "initial",
        }
      }}
    >
        <Or />

        {socialMedia.map(value =>
          {
            if (value.icon.name === IconNames.appleFill)
            {
              return <AppleComponent authType={props.authType} value={value} handleGTMEvent={props.handleGTMEvent} />
            }
            else
            {
              return <SocialMediaAuthButton key={value.text} value={value} />;
            }
          })
        }
      </motion.div>
  );
};

export default SocialAuthentication;
