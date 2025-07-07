import React from "react";
import { View } from "react-native";

type MultiStepFormStepProps = {
  children: React.ReactNode;
};

export const MultiStepFormStep: React.FC<MultiStepFormStepProps> = ({ children }) => {
  return <View>{children}</View>;
};