import { default as React } from "react";
import {
  KeyboardType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

type Props = {
  placeholder: string;
  label: string;
  keyBoardType: KeyboardType;
  inputKey: string;
  onChangeText: (key: string, value: string | number) => void;
  errors: Record<string, string>;
};

const CustomTextInput = ({
  placeholder,
  label,
  keyBoardType,
  inputKey,
  onChangeText,
  errors,
}: Props) => {
  return (
    <ScrollView>
      <Text style={{ paddingHorizontal: 12, fontWeight: "600" }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyBoardType}
        onChangeText={(text) => onChangeText(inputKey, text)}
      />
      {errors[inputKey] ? (
        <Text style={styles.error}>{errors[inputKey]}</Text>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 52,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 18,
    paddingHorizontal: 22,
    marginHorizontal: 12,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "transparent",
  },

  error: {
    color: "red",
    paddingHorizontal: 12,
    marginTop: -10,
  },
});

export default CustomTextInput;
