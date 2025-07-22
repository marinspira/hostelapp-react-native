import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodObject } from "zod";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";
import { Colors } from "@/src/constants/Colors";
import Feather from '@expo/vector-icons/Feather';

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
  onSubmit
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const combinedSchema = z.object(
    steps.reduce((acc, step) => ({ ...acc, ...step.schema.shape }), {})
  );
  type FormData = z.infer<typeof combinedSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onTouched",
  });

  const handleNext = async () => {
    const isValid = await methods.trigger(
      Object.keys(currentStep.schema.shape) as (keyof FormData)[]
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

  const dynamicStyles = useTheme()

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.content}>{currentStep.component}</View>

        <View style={styles.navigation}>
          {currentStepIndex > 0 ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {isLastStep ? (
            <TouchableOpacity
              onPress={handleNext}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 40,
    paddingRight: 10
  },
});