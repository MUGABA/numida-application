import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { render } from "@testing-library/react-native";
import React from "react";
import SmallCustomButton from "../custom/Buttons/SmallCustomButton";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ColorThemeProvider>{ui}</ColorThemeProvider>);
};

describe("Small Button Component", () => {
  it("It renders button title collectly", () => {
    const { getByText } = renderWithProvider(
      <SmallCustomButton
        buttonTitle="Learn More"
        icon={require("../../assets/images/Vector.png")}
      />
    );
    expect(getByText("Learn More")).toBeTruthy();
  });

  it(`renders correctly`, () => {
    const onClickMock = jest.fn();
    const { toJSON } = render(
      <ColorThemeProvider>
        <SmallCustomButton
          buttonTitle="Submit"
          icon={require("../../assets/images/Vector.png")}
        ></SmallCustomButton>
      </ColorThemeProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
