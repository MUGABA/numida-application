import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import PageContainer from "./PageContainer";

import BigCustomButton from "../custom/Buttons/BigCustomButton";
import Loader from "./Loader/Loader";

type Props = {
  title: string;
  children: React.ReactNode;
  buttonTitle: string;
  style?: StyleProp<ViewStyle>;
  actionFuntion: () => void;
  isLoading: boolean;
};

const ButtonContainer = ({
  title,
  children,
  buttonTitle,
  style,
  actionFuntion,
  isLoading,
}: Props) => {
  return (
    <ScrollView>
      <PageContainer>
        <View style={[styles.container, style]}>
          <Text style={styles.title}>{title}</Text>
          <View>{children}</View>
          <BigCustomButton
            buttonTitle={buttonTitle}
            actionFuntion={actionFuntion}
          />
        </View>
      </PageContainer>
      <Loader visible={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: "black",
    fontSize: 38,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 25,
    marginVertical: 10,
  },
});

export default ButtonContainer;
