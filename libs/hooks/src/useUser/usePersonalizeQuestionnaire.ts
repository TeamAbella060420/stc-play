import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ACCOUNT_MUTATION } from '@fe-monorepo/data-access';
import { QuestionnaireModel } from '@fe-monorepo/models';
import { useAppState } from '../index';

type submitQuestionnaireObjects = {
  is_successful: boolean;
  error_code: string;
  error_msg: string;
};

type QuestionnaireResponseData = { submitPersonalizationQuestionnaire: submitQuestionnaireObjects };

type QuestionnaireParams = {
  details: QuestionnaireModel;
};

export const usePersonalizeQuestionnaire = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { changeLoadingState } = useAppState();

  const [submitQuestionnaire, { data: questionnaireData, error: questionnaireError }] = useMutation<
    QuestionnaireResponseData,
    QuestionnaireParams
  >(ACCOUNT_MUTATION.submitPersonalizationQuestionnaire, {
    onError: e => {
      console.log(e);
      changeLoadingState(false);
    }
  });

  const submit = async (model: QuestionnaireModel) => {
    // changeLoadingState(true);
    changeLoadingState(false);
    submitQuestionnaire({
      variables: { details: model }
    });
  };

  useEffect(() => {
    if (questionnaireData) {
      const data = questionnaireData;
      setErrorMessage(data.submitPersonalizationQuestionnaire.error_msg);
      changeLoadingState(false);
    }
  }, [questionnaireData]);

  useEffect(() => {
    if (questionnaireError) 
    {
      changeLoadingState(false);
    }
  }, [questionnaireError]);

  return { submit, questionnaireData, errorMessage };
};
