import { Colors } from "@/src/constants/Colors";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MultiStepFormStepProps = {
  children: React.ReactNode;
  title: string
};

export const MultiStepFormStep: React.FC<MultiStepFormStepProps> = ({ children, title }) => {
  const dynamicStyles = useTheme()

  return (
    <View>
      <Text style={[dynamicStyles.title, styles.title]}>{title}</Text>
      {children}
    </View>
  )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 40,
        paddingRight: 10
    },
});