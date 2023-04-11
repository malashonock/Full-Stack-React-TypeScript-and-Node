import { RequestHandler } from 'express';
import { NewUserFields } from '../shared/dto/User.dto';
import ValidationService from '../services/validation.service';
import { containsDigits, containsLowercaseLetters, containsSpecialChars, containsUppercaseLetters, isLongEnough, isRequired, isValidEmail } from '../shared/validation/validators';
import { FormValidationSchema } from '../shared/validation/types';

export const validateNewUser: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(req.body as NewUserFields, {
    userName: isRequired,
    email: [isRequired, isValidEmail],
    password: [
      isRequired, 
      isLongEnough, 
      containsUppercaseLetters,
      containsLowercaseLetters,
      containsDigits,
      containsSpecialChars,
    ],
  } as FormValidationSchema<NewUserFields>);

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};