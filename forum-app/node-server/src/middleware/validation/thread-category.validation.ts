import { RequestHandler } from 'express';
import { ThreadCategoryFields } from '../../shared/dto/ThreadCategory.dto';
import ValidationService from '../../services/validation.service';
import { isRequired, isNotLongerThan } from '../../shared/validation/validators';
import { FormValidationSchema } from '../../shared/validation/types';

export const validateThreadCategoryFields: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(req.body as ThreadCategoryFields, {
    name: [isRequired, isNotLongerThan(100)],
    description: [isNotLongerThan(150)],
  } as FormValidationSchema<ThreadCategoryFields>);

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};