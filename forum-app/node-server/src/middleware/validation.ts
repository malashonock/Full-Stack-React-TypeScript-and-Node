import { RequestHandler } from 'express';
import { UserFields } from '../shared/dto/User.dto';
import ValidationService from '../services/validation.service';
import { containsDigits, containsLowercaseLetters, containsSpecialChars, containsUppercaseLetters, isLongEnough, isRequired, isValidEmail } from '../shared/validation/validators';
import { FormValidationSchema } from '../shared/validation/types';

export const validateNewUser: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(req.body as UserFields, {
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
  } as FormValidationSchema<UserFields>);

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};

export const validateUpdatedUser: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(req.body as UserFields, {
    userName: req.body.userName ? isRequired : null,
    email: req.body.email ? [isRequired, isValidEmail] : null,
    password: req.body.password ? [
      isRequired, 
      isLongEnough, 
      containsUppercaseLetters,
      containsLowercaseLetters,
      containsDigits,
      containsSpecialChars,
    ] : null,
  } as FormValidationSchema<UserFields>);

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};