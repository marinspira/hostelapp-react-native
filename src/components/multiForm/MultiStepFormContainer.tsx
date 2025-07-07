import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject } from "zod";
import { View, Button } from "react-native";

type Step = {
  id: string;
  component: React.ReactNode;
  schema: ZodObject<any>;
};

type MultiStepFormContainerProps = {
  steps: Step[];
  onSubmit: (data: any) => void;
};

export const MultiStepFormContainer: React.FC<MultiStepFormContainerProps> = ({
  steps,
  onSubmit,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const methods = useForm({
    resolver: zodResolver(
      z.object(
        steps.reduce((acc, step) => ({ ...acc, ...step.schema.shape }), {})
      )
    ),
    mode: "onTouched",
  });

  const handleNext = async () => {
    const isValid = await methods.trigger(
      Object.keys(currentStep.schema.shape)
    );

    if (isValid) {
      if (isLastStep) {
        onSubmit(methods.getValues());
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={{ padding: 20 }}>
        {currentStep.component}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          {currentStepIndex > 0 && (
            <Button title="Back" onPress={handleBack} />
          )}
          <Button title={isLastStep ? "Submit" : "Next"} onPress={handleNext} />
        </View>
      </View>
    </FormProvider>
  );
};
