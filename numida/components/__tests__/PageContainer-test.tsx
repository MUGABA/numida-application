// Card.test.tsx
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import PageContainer from "../custom/PageContainer";

describe("PageContainer Component", () => {
  it("renders children correctly", () => {
    render(
      <PageContainer>
        <Text>One Child component</Text>
      </PageContainer>
    );

    expect(screen.getByText("One Child component")).toBeTruthy();
  });

  it("renders multiple children correctly", () => {
    render(
      <PageContainer>
        <Text>First Component</Text>
        <Text>Second Componet</Text>
      </PageContainer>
    );

    expect(screen.getByText("First Component")).toBeTruthy();
    expect(screen.getByText("First Component")).toBeTruthy();
  });
});
