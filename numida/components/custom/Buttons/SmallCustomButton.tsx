import { useColorTheme } from "@/hooks/context/colorContext";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  buttonTitle: string;
  icon: HTMLImageElement;
};

const SmallCustomButton = ({ buttonTitle, icon }: Props) => {
  const { theme } = useColorTheme();
  return (
    <View>
      <Pressable style={{ ...styles.btn, borderColor: theme.primary }}>
        <View>
          <Text style={{ ...styles.btnTitle, color: theme.primary }}>
            {buttonTitle}
          </Text>
        </View>
        <View style={styles.icon}>
          <Image source={icon} />
        </View>
      </Pressable>
    </View>
  );
};

export default SmallCustomButton;

const styles = StyleSheet.create({
  btn: {
    width: 120,
    height: 21,
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
  },
  btnTitle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  icon: {
    paddingVertical: 10,
    paddingHorizontal: 3,
    fontSize: 20,
  },
});
