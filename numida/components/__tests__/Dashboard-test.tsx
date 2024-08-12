import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import Dashboard from "../Dashboard/dashboard";

const GET_LOAN_PRODUCTS = gql`
  query {
    loanProducts {
      id
      name
      interestRate
      maximumAmount
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_LOAN_PRODUCTS,
    },
    result: {
      data: {
        loanProducts: [
          {
            id: 1,
            name: "Tom's Loan",
            interestRate: 5.0,
            maximumAmount: 10000,
            __typename: "LoanProduct",
          },
        ],
      },
    },
  },
];

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useSegments: jest.fn(() => ["home"]),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ColorThemeProvider>{ui}</ColorThemeProvider>);
};

describe("Dashboard Component", () => {
  it("Displays loan products from GraphQL", async () => {
    renderWithProvider(
      <MockedProvider mocks={mocks} addTypename={true}>
        <Dashboard />
      </MockedProvider>
    );
    await waitFor(() => expect(screen.getByText("Tom's Loan")).toBeTruthy());
  });

  it("Navigates to Loan Application screen on button click", async () => {
    renderWithProvider(
      <MockedProvider mocks={mocks} addTypename={true}>
        <Dashboard />
      </MockedProvider>
    );

    fireEvent.press(screen.getByText("Apply for a loan"));

    await waitFor(() => {
      expect(screen.getByText("Apply for a loan")).toBeTruthy();
    });
  });

  it(`renders correctly`, async () => {
    const { toJSON } = renderWithProvider(
      <MockedProvider mocks={mocks} addTypename={true}>
        <Dashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
