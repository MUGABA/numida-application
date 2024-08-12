import { useColorTheme } from "@/hooks/context/colorContext";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  buttonTitle: string;
  actionFuntion: () => void;
};

const BigCustomButton = ({ buttonTitle, actionFuntion }: Props) => {
  const { theme } = useColorTheme();
  return (
    <View>
      <Pressable
        style={{ ...styles.btn, backgroundColor: theme.primary }}
        onPress={async () => {
          await actionFuntion();
        }}
      >
        <Text style={styles.btnTitle}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
};

export default BigCustomButton;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  btnTitle: {
    paddingHorizontal: 8,
    color: "white",
    fontSize: 18,
    paddingVertical: 12,
    borderRadius: 5,
    textTransform: "uppercase",
  },
});
