export const generateUserPassword = () => {
  const passwordConfigs = {
    maxLength: 50,
    minLength: 8,
    upperCaseMinCount: 2,
    lowerCaseMinCount: 3,
    numberMinCount: 2,
    specialMinCount: 1,
    UPPERCASE_RE: /([A-Z])/g,
    LOWERCASE_RE: /([a-z])/g,
    NUMBER_RE: /(\d)/g,
    SPECIAL_CHAR_RE: /([!@#$&*])/g,
  };

  const isStrongEnough = (password: string) => {
    const uc = password.match(passwordConfigs.UPPERCASE_RE);
    const lc = password.match(passwordConfigs.LOWERCASE_RE);
    const n = password.match(passwordConfigs.NUMBER_RE);
    const sc = password.match(passwordConfigs.SPECIAL_CHAR_RE);
    return password.length >= passwordConfigs.minLength &&
        uc && uc.length >= passwordConfigs.upperCaseMinCount &&
        lc && lc.length >= passwordConfigs.lowerCaseMinCount &&
        n && n.length >= passwordConfigs.numberMinCount &&
        sc && sc.length >= passwordConfigs.specialMinCount;
  };

  const shuffleRandomString = (stringAsArr: string[]) => {
    for (let i = stringAsArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stringAsArr[i], stringAsArr[j]] = [stringAsArr[j], stringAsArr[i]];
    }
  };

  const generateRandomString = (length: number) => {
    let stringAsArr = [];
    const alphabet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*';

    for (let i = 0; i < length; i++) {
      stringAsArr.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
    }

    shuffleRandomString(stringAsArr);
    return stringAsArr.join('');
  };

  const generateRandomStrOnCriteria = () => {
    const randomLength = Math.floor(Math.random() * (passwordConfigs.maxLength - passwordConfigs.minLength)) +
        passwordConfigs.minLength;

    let password = '';
    while (!isStrongEnough(password)) {
      password = generateRandomString(randomLength);
    }

    return password;
  };

  return generateRandomStrOnCriteria();
};
