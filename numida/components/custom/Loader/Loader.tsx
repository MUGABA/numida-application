import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  visible?: boolean;
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
};

const Loader: React.FC<Props> = ({
  visible = true,
  size = "large",
  color = "#0000ff",
  style,
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.loaderContainer, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1000,
  },
});

export default Loader;
