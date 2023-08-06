import CryptoJS from 'crypto-js';
import { sha256 } from "js-sha256";
import { Validator } from './validators';

export function replaceStringsFromJson(jsonString: string, toBeReplaced: any) {
  var str = jsonString;
  for (let item of toBeReplaced) {
    Object.keys(item).forEach(key => {
      str = str.replace(key, item[key]);
    });
  }
  return str;
}

export const stringToHash256 = (value: string) => sha256(value);

export const getCurrentDate = (isSlashFormat = false, replaceSpace = false) =>
{
    const today = new Date();
    const yyyy = String(today.getFullYear()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const ii = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    let timeFormatted = "";

    if (isSlashFormat === true)
    {
        timeFormatted = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + ii + ':' + ss;
    }
    else if (replaceSpace === true)
    {
        timeFormatted = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + ii + ':' + ss;
    }
    else
    {
        timeFormatted = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' + ss;
    }
    
    return timeFormatted?.toString()
}

export const aesEnrypt = (data: any) => {
  const string = CryptoJS.AES.encrypt(JSON.stringify(data), 'stcplay').toString();
  return string;
}

export const aesDecrypt = (data: any) => {
  const bytes  = CryptoJS.AES.decrypt(data, 'stcplay');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const getPasswordStrength = (password: string) => {
  return  Validator.isPasswordStrengthFour(password) ? 3
          : Validator.isPasswordStrengthThree(password) ? 2
          : Validator.isPasswordStrengthTwo(password) ? 1
          : Validator.isPasswordStrengthOne(password) ? 0
          : password === '' ? -1
          : 0
}
