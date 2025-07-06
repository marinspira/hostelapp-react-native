import { useState, useEffect, useCallback } from 'react';
import MultiStepForm from './presentational';
import { useForm, FormProvider } from 'react-hook-form';

const MultiStepFormContainer = ({ steps, onSubmit, defaultValues, sendBtnText }) => {
  const methods = useForm({
    defaultValues,
    mode: 'onChange', // Valida ao digitar
    // REMOVIDO: resolver: yupResolver(formValidationSchema),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const stepFields = steps[currentStep].fields.map(field => field.name).filter(Boolean);

  useEffect(() => {
    const checkStepValidity = () => {
      // Pega os erros do formState.errors
      const currentErrors = methods.formState.errors;

      // Verifica se todos os campos do passo atual estão preenchidos e sem erros de 'required'
      const isValid = stepFields.every(fieldName => {
        const fieldValue = methods.getValues(fieldName); // Obtém o valor atual do campo
        const fieldError = currentErrors[fieldName]; // Obtém o erro para este campo

        // Um campo é válido para o propósito do `isStepValid` se:
        // 1. Não houver erro para ele, OU
        // 2. Se houver erro, mas não for um erro de 'required' (o que indica que o campo foi preenchido, mas talvez com outro tipo de validação, que não estamos usando aqui).
        // E o valor não pode ser vazio se for 'required'.

        // Simplificando: o campo deve ter um valor "verdadeiro" (não vazio, null ou undefined)
        // E não deve haver um erro de 'required' para ele.
        const isFieldFilled = !!fieldValue; // Converte para booleano: true se tiver valor, false se vazio
        const hasRequiredError = fieldError && fieldError.type === 'required';

        // O campo é válido se está preenchido E NÃO tem um erro de required.
        // Se o campo não é required, ele sempre é válido aqui (já que não estamos usando outras regras).
        const isFieldRequired = steps[currentStep].fields.some(f => f.name === fieldName && f.required);

        if (isFieldRequired) {
            return isFieldFilled && !hasRequiredError;
        }
        // Se o campo não é required, ele é considerado válido para o `isStepValid`
        // desde que não tenha um erro específico (que não estamos gerando sem Yup).
        // Poderíamos retornar true aqui.
        return true;
      });
      setIsStepValid(isValid);
    };

    // Chame a validação inicial para o passo atual
    checkStepValidity();

    // Observe as mudanças nos valores e dispare a validação do passo
    const subscription = methods.watch(() => {
      // Ao observar mudanças, a validação interna do RHF já atualiza formState.errors
      // Então, basta chamar checkStepValidity novamente
      checkStepValidity();
    });

    return () => subscription.unsubscribe();
  }, [currentStep, methods, stepFields]); // Dependências

  // A função handleNext deve validar o passo atual antes de avançar
  const handleNext = useCallback(async () => {
    // Dispara a validação do RHF para os campos do passo atual
    const isValid = await methods.trigger(stepFields);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length, stepFields, methods]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const handleFormSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <MultiStepForm
        steps={steps}
        currentStep={currentStep}
        isStepValid={isStepValid}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleFormSubmit}
        sendBtnText={sendBtnText}
      />
    </FormProvider>
  );
};

export default MultiStepFormContainer;