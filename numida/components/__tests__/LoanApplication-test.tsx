import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { postRequest } from "@/Services/httpService";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import LoanApplication from "../LoanApplication/loanApplication";

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

jest.mock("@/Services/httpService", () => ({
  postRequest: jest.fn(),
}));

describe("LoanApplication", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProvider(<LoanApplication />);
    expect(getByText("Apply for a loan")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  it("submits the form correctly", async () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <LoanApplication />
    );

    fireEvent.changeText(
      getByPlaceholderText("Enter your full name"),
      "Mugaba Muhamad"
    );
    fireEvent.changeText(
      getByPlaceholderText("yourname@example.com"),
      "mugabamuha@gmail.com"
    );
    fireEvent.changeText(getByPlaceholderText("UGX"), 5000);
    fireEvent.changeText(getByPlaceholderText("Purpose"), "Bussiness Loan");

    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith("/apply-loan", {
        full_name: "Mugaba Muhamad",
        email: "mugabamuha@gmail.com",
        loan_amount: 5000,
        loan_purpose: "Bussiness Loan",
      });
    });
  });

  it("handles errors on submission", async () => {
    (postRequest as jest.Mock).mockRejectedValue(new Error("Error"));
    const { getByPlaceholderText, getByText, findByText } = renderWithProvider(
      <LoanApplication />
    );

    fireEvent.changeText(
      getByPlaceholderText("Enter your full name"),
      "John Doe"
    );
    fireEvent.changeText(
      getByPlaceholderText("yourname@example.com"),
      "john@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("UGX"), "5000");
    fireEvent.changeText(getByPlaceholderText("Purpose"), "Education");

    fireEvent.press(getByText("Submit"));

    const errorMessage = await findByText(
      "Error! Loan Application failed! Please contact support"
    );
    expect(errorMessage).toBeTruthy();
  });

  it("displays validation errors for empty fields", async () => {
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <LoanApplication />
    );

    fireEvent.changeText(
      getByPlaceholderText("Enter your full name"),
      "Muhamad Mugaba"
    );
    fireEvent.changeText(
      getByPlaceholderText("yourname@example.com"),
      "mugabamuha@gmail.com"
    );
    fireEvent.changeText(getByPlaceholderText("UGX"), 1000);
    fireEvent.changeText(getByPlaceholderText("Purpose"), "");

    fireEvent.press(getByText("Submit"));

    expect(screen.getByText("You have some missing field(s)")).toBeTruthy();
  });
});
