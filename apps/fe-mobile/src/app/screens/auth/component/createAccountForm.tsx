import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Platform , Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/buttons'
import Textfield from '../../../components/textfield';
import { useSignUp, useGeo, useUser } from '@fe-monorepo/hooks';
import { AuthModel, CountryModel } from '@fe-monorepo/models';
import { CHANNEL } from '@fe-monorepo/helper'
import DropDownPicker from 'react-native-dropdown-picker';
import { getStyle } from '@fe-monorepo/themes';
import colors from 'libs/themes/src/colors';
import DefaultTextfield from '../../../components/textfield/default';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { Validator } from '@fe-monorepo/helper';

export interface CreateAccountFormProps {
  signUpCallBack: (isSuccessful: boolean) => void,   
  email: string, 
}

export const CreateAccountForm = ( props: CreateAccountFormProps) => {
  const { email, signUpCallBack } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [passwordVisiable, setPasswordVisiability] = useState<boolean>(false);
  const [contryCode, setCountryCode] = useState<string>('966');
  const [phoneLength, setPhoneLength] = useState<number>(13);
  const { userContext } = useSelector((state: RootState) => state.user);

  const [referalCode, setReferalCode] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>(null);
  const [errorUsername, setErrorUsername] = useState<string>(null);
  const [errorMobile, setErrorMobile] = useState<string>(null);
  const [errorReferralCode, setErrorCode] = useState<string>(null);
  const [validationFailed, setValidationFailed] = useState<boolean>(false);
  const [validateForm, setValidateForm] = useState<boolean[]>([]);
  const { t } = useTranslation()
  
  const [isButtonEnable, setButtonEnable] = useState<boolean>(false);

  /**Test drop dwon */
  const [open, setOpen] = useState(false);
  const [mobileCode, setPhoneCode] = useState(null);
  const [items, setItems] = useState([]);
  const countries = []

  /** end */

 
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const styles = createStyles(t)
  
  const { signUp, isSuccessful, errorMessage, errorCode: errorCodeSignUp } = useSignUp();
  const { 
    checkUserName, 
    checkMobileIsAvailable, 
    checkReferralCode, 
    isValidUser, 
    isValidatedUsername,
    isValidatedMobile, 
    setValidMobile,
    isValidatedReferralCode, 
    setValidReferralCode,  
    errorMessage: userNameError, 
    errorCode: errorCodeValidation 
  } = useUser();
  const { getAllCountries, countryData } = useGeo();
  
  const validateUsername = () => {
    if(username.length > 0) {
      if(!Validator.isValidUsernameLength(username))
      {
        setErrorUsername(t('validation_username_min_length'));
      }
      else
      {
        checkUserName({'username': username} as AuthModel)
      }
    } else {
      setErrorUsername('')
    }
  }

  const validateMobile =  async () =>
  {  
    if(phoneNumber.length > 0) {
      if(!Validator.isValidMobile(phoneNumber)){
        setErrorMobile(t('validation_mobile_invalid'))
      } else {
        await checkMobileIsAvailable({'mobile': phoneNumber} as AuthModel)
      }
    } else {
      setErrorMobile('')
    }
  }

  const validateReferralCode = async () =>
  {    
    if(referalCode !== null && referalCode.length > 0) {
      await checkReferralCode({'referral_code': referalCode} as AuthModel)
    } else {
      setErrorCode('')
    }
  }

  const ValidateSubmitData = () => {
    const validateForm = [false, false, phoneNumber === '', referalCode === ''];
    
    if(username !== ''){
      if(!Validator.isValidUsernameLength(username)) setErrorUsername(t('validation_username_min_length')) 
      setValidationFailed(true)
      validateForm[0] = false;
      setValidateForm(validateForm)
    }

    if (phoneNumber !== '') {
      const mobileCodeFormatted = ("00"+mobileCode);
      if(!Validator.isValidGlobalMobileLength((mobileCodeFormatted+phoneNumber), phoneLength)) setErrorMobile(t('validation_mobile_invalid')) 
      setValidationFailed(true)
      validateForm[2] = false 
      setValidateForm(validateForm)
    }

    if (referalCode !== '') {
      if(!Validator.isValidMobileLength(phoneNumber)) setErrorMobile(t('validation_mobile_invalid')) 
      setValidationFailed(true)
      validateForm[3] = false 
      setValidateForm(validateForm)
    }
  }

  const onSubmit = () => {  
    let validationFailed = false    
    
    if (!Validator.isValidUsernameLength(username)) {
      validationFailed = true
      setErrorUsername(t('validation_invalid_username'))
    }

    if (!Validator.isValidPasswordLength(password)) {
      validationFailed = true
      setErrorPassword(t('validation_empty_password')) 
    }
    else if(!Validator.isNotWhitespaced(password))
    {
      validationFailed = true
      setErrorPassword(t('validation_whitespaceNotAllowed')) 
    }

    if (phoneNumber !== '') {
      if(!Validator.isValidMobileLength(phoneNumber)) {
        validationFailed = true
        setErrorMobile(t('validation_mobile_invalid')) 
      }
    }

    if (isValidUser){
      validationFailed = true
    }

    if (!validationFailed) {
    
      const data: AuthModel = (
        {
         email: email,
         username: username, 
         password: password, 
         display_name: username,
         channel: CHANNEL.SMS,
         endpoint: Platform.OS, 
         regesteration_persona:'gamer',
         country_code: contryCode 
        }
      )

      if (phoneNumber !== '' && mobileCode !== '') {
        data.mobile_code = mobileCode
        data.mobile = mobileCode+phoneNumber
      }
      
      if (referalCode !== '') {
        data.referral_code = referalCode
      }
      
      if (userContext.token !== '') {
        signUpCallBack(true)
      } else {
        signUp(data)
      }
    }
  }

  useEffect(() => {  
    const errorCode = errorCodeValidation || errorCodeSignUp;
    if (errorCode !== '') {
      if(['2013'].includes(errorCode)) {
        setErrorUsername(t('validation_username_taken'))
      } else if(['2015', '3094'].includes(errorCode)) {
        setErrorMobile(t('validation_mobile_taken'))
      } else if(['2081', '2102', '3095'].includes(errorCode)) {        
        setErrorCode(t('validation_referral_code_invalid_expired'))
      }
    } 
  },[errorCodeValidation, errorCodeSignUp]) 


  useEffect(() => {
   if (isValidUser !== undefined) {
      if (isValidUser) {
        setErrorUsername(t('validation_username_taken'))
      } else {
        setErrorUsername('')
      }
   }
  },[isValidUser]) 

  useEffect(() => {
    getAllCountries()
  },[]) 

  useEffect(() => {
    if(username.length > 2 && password.length > 7) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  },[username, password]) 

  useEffect(() => {
    if (countryData !== undefined) {
      countryData.forEach((data: CountryModel, index: number) => {        
        countries.push({
          label: "+" + data.phone_code_iso, 
          value: data.phone_code_iso,
          index: index,
          countryCode: data.country_code_iso_2,
          phoneNumberLength: data?.phone_number_length,
        })
      })

      const resultCountryData = countryData.filter(i => i.phone_code_iso === '966')[0];
      setCountryCode(resultCountryData.country_code_iso_2)
      setPhoneCode(resultCountryData.phone_code_iso)
      setPhoneLength(resultCountryData.phone_number_length)
      setItems(countries)
    }
  },[countryData]) 

  useEffect(() =>
  {      
    if(isSuccessful !== undefined) {
      signUpCallBack(isSuccessful)
    }
  },[isSuccessful])

   const onIconPress = () => {
    setPasswordVisiability(!passwordVisiable)
  } 

  const onReferralCodeChange = (text) => {
    setReferalCode(text)
  } 

  const onPhoneNumberChange = (text) => {
    const mobileCodeFormatted = ("00"+mobileCode);
    if(Validator.isDigitsOnly(text) && Validator.isValidMobileMaxLength((mobileCodeFormatted+text))) {
      setPhoneNumber(text)
    }
  } 

  const onPasswordChangeChange = (text) => {
    if(Validator.isNotWhitespaced(text)) {
      setPassword(text)
    }
  } 

  const checkUsername = (text: string) => {
    setErrorUsername('')
    if(text.length <= 60) {
      setUsername(text)
    }
  }

  return (
    <View style={styles.container}> 
      <Textfield
        type={"default"}
        style={styles.textField}
        label={t('formAttribute_username')}
        iconName={'closeOutline'}
        value={username}
        onInputChange={(text) => { checkUsername(text)}}
        onIconPress={() => {setUsername(''); setErrorUsername(null)}}
        onEndEditing={(text)=> {validateUsername()}}
        errorMessage={errorUsername}
      />

      <Textfield
        checkPasswordStrength={true}
        style={styles.textField}
        type={"password"}
        label={t('formAttribute_password')}
        iconName={passwordVisiable ? 'eyeslash' : 'eye'}
        secureTextEntry={!passwordVisiable}
        value={password}
        onInputChange={(text) => {setErrorPassword(''); onPasswordChangeChange(text)}}
        onIconPress={() => {setErrorPassword(''); onIconPress()}}
        errorMessage={errorPassword}
      />

      <StyledText textStyle={{...Typography.bodySmallRegular, color: getStyle(theme).textColor50}} textAlign={t('config_align')}>{t('formPlaceholder_mobile')}</StyledText>

        <View>
          <View style={styles.phoneRowContainer} >
            <View style={styles.mobileCode}>
              <DropDownPicker
                open={open}
                value={mobileCode}
                placeholder={mobileCode}
                items={items}
                setOpen={setOpen}
                setValue={setPhoneCode}
                setItems={setItems}
                searchTextInputStyle={{borderWidth: 0}}
                containerStyle={{borderWidth: 0}}
                searchContainerStyle={styles.searchContainerStyle}
                style={styles.dropDownPicker}
                arrowIconContainerStyle={{bottom: Platform.OS === 'android' ? 0 : -5,}}
                searchable={true}
                listMode="MODAL"
                placeholderStyle={[styles.placeholderStyle]}
                labelStyle={[styles.labelStyle, {color: getStyle(theme).textColor,}]}
                rtl={isRTL}
                onSelectItem={(item)=> {
                  setCountryCode(item.countryCode)
                  setPhoneCode(item.value)
                  setPhoneLength(item.phoneNumberLength)
                }}
              />
            </View>

            <View style={styles.mobile}> 
              <DefaultTextfield
                  type='default'
                  keyboardType='number-pad'
                  placeholder={'00 000 0000'}
                  subValue={'966'}
                  value={phoneNumber}
                  onInputChange={(text) => { setErrorMobile(''); onPhoneNumberChange(text)}}
                  iconName={'icon_close'}
                  onIconPress={() => {setPhoneNumber(''); setErrorMobile(null)}}
                  onEndEditing={()=> validateMobile()}
                  errorMessage={errorMobile}
                />
            </View>
          </View>   
          <Text style={[Typography.captionRegular, styles.errorMessage]}>{errorMobile === '' ? "" : errorMobile}</Text>
        </View>

        <Textfield
          style={styles.textField}
          type='default'
          label={t('formPlaceholderReferal_code')}
          iconName={'closeOutline'}
          hasIcon
          value={referalCode}
          textIconName='icon_info'
          onInputChange={(text) => { setErrorCode(''); onReferralCodeChange(text)}}
          onIconPress={() => {setReferalCode(''); setErrorCode('')}}
          onEndEditing={()=> validateReferralCode()}
          errorMessage={errorReferralCode}
        />               
        <Button style={{marginTop: 60}} label={t('common_continue')} disabled={!isButtonEnable} type={(isButtonEnable) ? 'primary' : null} onPress={()=>{ onSubmit() }}/>
        
    </View>    
  );
};

const createStyles = (translate: any) => {
 return StyleSheet.create({
  container: {
    marginTop: 20
  },

  phoneRowContainer: {
    flexDirection: 'row',
    marginTop: 4,
    alignContent: 'flex-end',
  },

  mobileCode: {
    flex: 2.3,
    alignSelf: 'flex-end',
    borderWidth: 0, 
    borderBottomWidth: 1,
    borderBottomColor: colors.black20,
  },

  mobile: {
    flex: 5.7,
    alignSelf: 'flex-end',
    marginLeft: 5,
    marginTop: 0,
  },

  textField: {
    marginTop: 5,
  },

  dropDownPicker: {
    backgroundColor: 'transparent', 
    borderWidth: 0, 
    borderRadius: 0, 
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'android' ? -25 : 0,
    bottom: Platform.OS === 'android' ? 0 : 5,
    alignItems: 'center'
  },

  searchContainerStyle: {
    borderWidth: 0, 
    borderBottomWidth: 1,
    borderBottomColor: colors.black20,
  },

  labelStyle: {
   bottom: Platform.OS === 'android' ? 0 : -5,
    ...Typography.bodyRegular,
    lineHeight: Platform.OS === 'ios' ? 0 : 24 
  },

  searchTextInputStyle: {
    ...Typography.bodyRegular
  },

  placeholderStyle: {
    ...Typography.bodyRegular,
    color: colors.black50
  },

  errorMessage:
    {
        paddingVertical: 4,
        color: colors.red,
        alignSelf: translate('config_flex'),
        flexDirection: translate('config_row'),
    },

 })
}
