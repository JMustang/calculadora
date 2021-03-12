import { StatusBar } from "react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const buttons = [
    "AC",
    "DEL",
    "%",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    3,
    2,
    1,
    "+",
    0,
    ".",
    "+/-",
    "=",
  ];
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(" ");
    const fistNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch (operator) {
      case "+":
        setCurrentNumber((fistNumber + lastNumber).toString());
        return;
      case "-":
        setCurrentNumber((fistNumber - lastNumber).toString());
        return;
      case "*":
        setCurrentNumber((fistNumber * lastNumber).toString());
        return;
      case "/":
        setCurrentNumber((fistNumber / lastNumber).toString());
        return;
    }
  }

  function handleInput(buttonPressed) {
    if (
      (buttonPressed === "+") |
      (buttonPressed === "-") |
      (buttonPressed === "*") |
      (buttonPressed === "/")
    ) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }
    switch (buttonPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "AC":
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case "+/-":
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }
  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: "100%",
      minHeight: 300,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    resultsText: {
      color: darkMode ? "#f5f5f5" : "#282f3b",
      marginRight: 25,
      fontSize: 60,
    },
    historyText: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      alignSelf: "flex-end",
      marginRight: 25,
      fontSize: 25,
    },
    themeButton: {
      backgroundColor: darkMode ? "#7b8884" : "#e5e5e5",
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "center",
      bottom: 80,
      margin: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      backgroundColor: "#000",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#000",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 90,
      minWidth: 90,
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 30,
      fontWeight: "bold",
    },
  });

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultsText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === "=" ? (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: "#8902a0" }]}
            >
              <Text
                style={[styles.textButton, { color: "#fff", fontSize: 50 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number"
                      ? darkMode === true
                        ? "#330072"
                        : "#c1c1c1"
                      : darkMode === true
                      ? "#1E4294"
                      : "#aaa",
                },
              ]}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
