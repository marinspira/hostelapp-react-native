import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, Text, Button, StyleSheet } from "react-native";
import Slide from "./Slide";

const sampleData = [
  { id: "1", text: "Slide 1" },
  { id: "2", text: "Slide 2" },
  { id: "3", text: "Slide 3" }
];

const SampleComponent = (item) => (
  <View style={styles.slide}>
    <Text style={styles.text}>{item.text}</Text>
  </View>
);

const RenderButtons = (isLastSlide, handleNextSlide) => (
  <View style={styles.buttonContainer}>
    {!isLastSlide && (
      <Button title="Next" onPress={handleNextSlide} />
    )}
  </View>
);

storiesOf("Slide", module)
  .add("Default", () => (
    <Slide data={sampleData} component={SampleComponent} renderButtons={RenderButtons} />
  ));

const styles = StyleSheet.create({
  slide: {
    width: 300,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  }
});
