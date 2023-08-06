export const Validator = {
  isNotNullorUndefined: function (string: string) {
    return string !== null && string !== undefined;
  },

  isNotEmptyOrWhitespaced: function (string: string) {
    return /(?!^$)([^\s])/.test(string);
  },

  isNotWhitespaced: function (string: string) {
    return !string.includes(' ');
  },

  isValidEmail: function (email: string) {
    return /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      email
    );
  },

  isPartialValidEmail: function (email: string) {
    return /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9]{2,}[.\/0-9=?A-Z^_a-z`{|}~]+$/.test(email);
  },

  isValidMobile: function (mobile: string) {
    return /^\d+$/.test(mobile);
  },

  isValidGlobalMobileLength: function (mobile: string, length: number) {
    return mobile.length <= 15 && mobile.length >= length;
  },

  isValidMobileLength: function (mobile: string) {
    return mobile.length <= 15 && mobile.length >= 8;
  },

  isValidMobileMinLength: function (mobile: string) {
    return mobile.length >= 9;
  },

  isValidMobileMaxLength: function (mobile: string) {
    return mobile.length <= 15;
  },

  isValidPassword: function (value: string) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{0,}$/.test(value);
  },

  isValidUsername: function (value: string) {
    return /^[a-zA-Z0-9_\d!&.@#]{0,}$/.test(value);
  },

  isValidPasswordMinLength: function (value: string)
  {
    return value?.length >= 8
  },

  isValidPasswordMaxLength: function (value: string)
  {
    return value?.length <= 30;
  },

  isValidPasswordLength: function (value: string)
  {
    return value?.length >= 8 && value?.length <= 30
  },

  isPasswordStrengthOne: function (password: string) {
    return (( /^(?=.*?[a-z]).{0,}$/.test(password) || /^(?=.*?[0-9]).{0,}$/.test(password)));
  },

  isPasswordStrengthTwo: function (password: string) {
    return (password?.length >= 8 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$/.test(password));
  },

  isPasswordStrengthThree: function (password: string) {
    return (password?.length >= 10 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{0,}$/.test(password));
  },

  isPasswordStrengthFour: function (password: string) {
    return (password?.length >= 12 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{0,}$/.test(password));
  },

  isValidUsernameMaxLength: function (value: string)
  {
    return value?.length <= 60
  },

  isValidUsernameLength: function (value: string)
  {
    return value?.length >= 3 && value?.length <= 60
  },

  isValidEmailMinLength: function (value: string): boolean
  {
    if (value?.length >= 4)
    {
      return true;
    }

    return false;
  },


  isValidEmailLength: function (value: any)
  {
    return value?.length <= 320;
  },


  hasNumberAndDigits: function (code: string) {
    return /[a-z0-9]/i.test(code);
  },

  isValidCode: function (code: string) {
    return /^[a-z0-9_\d]+$/i.test(code);
  },

  isValidOTP: function (code: string) {
    return /^[0-9]+$/i.test(code) && code.length === 6;
  },


  isNotEmpty: function (string: string) {
    return string !== '';
  },

  isLengthAccepeted: function (string: string, length: number) {
    return string?.length <= length;
  },

  isFloat: function (number: number) {
    return !isNaN(number);
  },

  isDigitsOnly: function (number: string) {
    return /^[0-9]*$/.test(number);
  },

  isValidDate: function (date: string) {
    const dateArray = date.split('-');

    if (dateArray.length !== 3) {
      return false;
    } else {
      if (!this.isNotEmpty(dateArray[0]) || !this.isDigitsOnly(dateArray[0]) || dateArray[0].length !== 4) {
        return false;
      } else if (!this.isNotEmpty(dateArray[1]) || !this.isDigitsOnly(dateArray[1]) || dateArray[1].length !== 2) {
        return false;
      } else if (!this.isNotEmpty(dateArray[2]) || !this.isDigitsOnly(dateArray[2]) || dateArray[2].length !== 2) {
        return false;
      }

      return true;
    }
  }
};
