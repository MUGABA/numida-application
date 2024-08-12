import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import ButtonContainer from "../custom/ButtonContainer";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ColorThemeProvider>{ui}</ColorThemeProvider>);
};

describe("Button Container Component", () => {
  it(`renders correctly`, () => {
    const onClickMock = jest.fn();

    const { toJSON } = renderWithProvider(
      <ButtonContainer
        title="Dashboard"
        buttonTitle="Submit"
        actionFuntion={onClickMock}
        isLoading={false}
      >
        <Text>Another component</Text>
      </ButtonContainer>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
