import ButtonContainer from "@/components/custom/ButtonContainer";
import CustomTextInput from "@/components/custom/inputs/CustomTextInput";
import { useColorTheme } from "@/hooks/context/colorContext";
import { postRequest } from "@/Services/httpService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  LoanDetails,
  LoanDetailsErrors,
  Props,
  ValidateAndLoad,
} from "./types";

const LoanApplication = (props: Props) => {
  const { theme } = useColorTheme();
  const router = useRouter();
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    name: "",
    email: "",
    amount: 0,
    loanPurpose: "",
  });

  const [loanErrors, setLoanErrors] = useState<LoanDetailsErrors>({});
  const [validate, setValidation] = useState<ValidateAndLoad>({
    message: "You have some missing field(s)",
    showMessage: false,
    loading: false,
  });

  const handleChange = (
    key: keyof LoanDetailsErrors | string | any,
    value: string | number
  ): void => {
    handleBasicErrors(key, value);

    setLoanDetails({ ...loanDetails, [key]: value });
  };

  const handleBasicErrors = (
    key: keyof LoanDetailsErrors,
    value: string | number
  ): void => {
    if (String(value).length === 0) {
      setLoanErrors({ ...loanErrors, [key]: `This field is required` });
      return;
    } else {
      const { [key]: _, ...others } = loanErrors;

      setLoanErrors({ ...others });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const { name, email, amount, loanPurpose } = loanDetails;
    if (amount <= 0) {
      setLoanErrors({
        ...loanErrors,
        amount: `Amount can not be less or equal to zero`,
      });
      return;
    }

    if (!name.length || !email.length || !amount || !loanPurpose.length) {
      setValidation({ ...validate, showMessage: !validate.showMessage });
      return;
    }

    setValidation({ ...validate, loading: !validate.loading });

    try {
      const response = await postRequest("/apply-loan", {
        full_name: name,
        email,
        loan_amount: amount,
        loan_purpose: loanPurpose,
      });

      setTimeout(() => {
        setValidation({ ...validate, loading: false });

        router.push("/response");
      }, 1000);
    } catch (error) {
      setValidation({
        ...validate,
        message: "Error! Loan Application failed! Please contact support",
        showMessage: !validate.showMessage,
        loading: false,
      });
    }
  };

  return (
    <ButtonContainer
      title="Apply for a loan"
      buttonTitle="Submit"
      actionFuntion={handleSubmit}
      isLoading={validate.loading}
    >
      {validate.showMessage ? (
        <Text style={styles.textError}>{validate.message}</Text>
      ) : null}
      <CustomTextInput
        placeholder="Enter your full name"
        label="Full Name"
        keyBoardType="default"
        inputKey="name"
        onChangeText={handleChange}
        errors={loanErrors}
      />
      <CustomTextInput
        placeholder="yourname@example.com"
        label="Email"
        keyBoardType="email-address"
        inputKey="email"
        onChangeText={handleChange}
        errors={loanErrors}
      />
      <CustomTextInput
        placeholder="UGX"
        label="Loan Amount"
        keyBoardType="numeric"
        inputKey="amount"
        onChangeText={handleChange}
        errors={loanErrors}
      />
      <CustomTextInput
        placeholder="Purpose"
        label="Loan Purpose"
        keyBoardType="default"
        inputKey="loanPurpose"
        onChangeText={handleChange}
        errors={loanErrors}
      />
    </ButtonContainer>
  );
};

export default LoanApplication;

const styles = StyleSheet.create({
  textError: {
    color: "red",
    paddingHorizontal: 10,
    fontSize: 20,
    paddingVertical: 1,
  },
});
