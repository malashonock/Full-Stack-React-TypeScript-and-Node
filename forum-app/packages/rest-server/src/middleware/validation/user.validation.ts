import { RequestHandler } from 'express';

import { UserFields } from '@shared/types';
import {
  ValidationService,
  FormValidationSchema,
  CharacterClass,
  containsCharClass,
  isNotShorterThan,
  isRequired,
  isValidEmail,
} from '@shared/validation';

export const validateUserFields: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(
    req.body as UserFields,
    {
      userName: req.body.userName ? isRequired : null,
      email: req.body.email ? [isRequired, isValidEmail] : null,
      password: req.body.password
        ? [
            isRequired,
            isNotShorterThan(8),
            containsCharClass(CharacterClass.UpperCaseLetters),
            containsCharClass(CharacterClass.LowerCaseLetters),
            containsCharClass(CharacterClass.Digits),
            containsCharClass(CharacterClass.SpecialCharacters),
          ]
        : null,
    } as FormValidationSchema<UserFields>,
  );

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};
