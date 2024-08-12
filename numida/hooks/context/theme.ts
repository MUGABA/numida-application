export type Theme = {
  background: string;
  primary: string;
  secondary: string;
  text: string;
  buttonText: string;
  border: string;
};

export const lightTheme: Theme = {
  background: "#ffffff",
  primary: "#30C2E3",
  secondary: "#D4FAF5",
  text: "",
  buttonText: "",
  border: "",
};

export const darkTheme: Theme = {
  background: "#121212",
  primary: "#bb86fc",
  secondary: "#03dac6",
  text: "#ffffff",
  buttonText: "#000000",
  border: "#333333",
};
