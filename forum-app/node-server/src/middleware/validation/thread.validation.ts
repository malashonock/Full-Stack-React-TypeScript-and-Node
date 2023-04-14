import { RequestHandler } from 'express';
import { ThreadFields } from '../../shared/dto/Thread.dto';
import ValidationService from '../../services/validation.service';
import { isRequired, isNotLongerThan, isNotShorterThan } from '../../shared/validation/validators';
import { FormValidationSchema } from '../../shared/validation/types';

export const validateThreadFields: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(req.body as ThreadFields, {
    title: [isRequired, isNotShorterThan(5), isNotLongerThan(150)],
    body: [isRequired, isNotShorterThan(10), isNotLongerThan(2500)],
  } as FormValidationSchema<ThreadFields>);

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};