import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import BigCustomButton from "../custom/Buttons/BigCustomButton";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ColorThemeProvider>{ui}</ColorThemeProvider>);
};

describe("MyComponent", () => {
  it("It renders button title collectly", () => {
    const { getByText } = renderWithProvider(
      <BigCustomButton
        buttonTitle="Apply for a loan"
        actionFuntion={() => {}}
      />
    );
    expect(getByText("Apply for a loan")).toBeTruthy();
  });

  it("It works collectly of a button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = renderWithProvider(
      <BigCustomButton
        buttonTitle="Apply for a loan"
        actionFuntion={onClickMock}
      />
    );

    const button = getByText("Apply for a loan");

    fireEvent.press(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it(`renders correctly`, () => {
    const onClickMock = jest.fn();
    const { toJSON } = render(
      <ColorThemeProvider>
        <BigCustomButton
          buttonTitle="Submit"
          actionFuntion={onClickMock}
        ></BigCustomButton>
      </ColorThemeProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
