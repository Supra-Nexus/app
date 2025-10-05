import { submitFeedback as submitFeedbackApi } from '@supraai/supra-message-ts/api/external-services/index';

import { type SubmitFeedbackInput } from './types';

export const submitFeedback = async ({
  feedback,
  contact,
}: SubmitFeedbackInput) => {
  return await submitFeedbackApi({
    feedback,
    contact,
  });
};
