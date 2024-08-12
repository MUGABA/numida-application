import { useColorTheme } from "@/hooks/context/colorContext";
import { default as React } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  header: string;
  message: string;
};

const ResponseGeneric = ({ header, message }: Props) => {
  const { theme } = useColorTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.primary }}>
      <Text style={{ ...styles.heading }}>{header}</Text>
      <Text style={{ ...styles.content, color: theme.secondary }}>
        {message}
      </Text>
    </View>
  );
};

export default ResponseGeneric;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 10,
    padding: 10,
  },

  heading: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    marginVertical: 5,
  },

  content: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    marginVertical: 5,
  },
});
