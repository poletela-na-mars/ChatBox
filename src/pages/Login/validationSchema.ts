import * as yup from 'yup';
import { IntlShape } from 'react-intl/src/types';

export const validationSchema = (intl: IntlShape) => yup.object({
  password: yup
      .string().matches(
          /^(?=.*[A-ZЁА-Я].*[A-ZЁёА-Я])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-zёа-я].*[a-zёа-я].*[a-zёа-я]).{8,}$/,
          {message: intl.formatMessage({id: 'login.validation.password.regexp'})})
      .required(intl.formatMessage({id: 'login.validation.password.req'})),
  name: yup
      .string()
      .min(2, intl.formatMessage({id: 'login.validation.name.short'}))
      .max(50, intl.formatMessage({id: 'login.validation.name.long'}))
      .required(intl.formatMessage({id: 'login.validation.name.req'})),
});