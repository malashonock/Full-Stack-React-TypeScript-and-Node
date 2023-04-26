import { RequestHandler } from 'express';

import { ThreadCommentFields } from '@shared/types';
import {
  ValidationService,
  FormValidationSchema,
  isRequired,
  isNotLongerThan,
  isNotShorterThan,
} from '@shared/validation';

export const validateThreadCommentFields: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(
    req.body as ThreadCommentFields,
    {
      body: [isRequired, isNotShorterThan(10), isNotLongerThan(2500)],
    } as FormValidationSchema<ThreadCommentFields>,
  );

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};
