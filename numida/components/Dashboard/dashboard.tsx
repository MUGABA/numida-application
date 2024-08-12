import ButtonContainer from "@/components/custom/ButtonContainer";
import Card from "@/components/custom/Card/Card";
import { useColorTheme } from "@/hooks/context/colorContext";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import ResponseGeneric from "../Response/ResponseGeneric";

type Props = {};

type LoanProduct = {
  id: number;
  name: string;
  interestRate: number;
  maximumAmount: number;
};

type LoanProducts = {
  loanProducts: LoanProduct[];
};

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

const Dashboard = (props: Props) => {
  const router = useRouter();
  const { theme } = useColorTheme();

  const { loading, error, data } = useQuery<LoanProducts>(GET_LOAN_PRODUCTS);

  const handleRedirectTOApplyForLoanScreen = () => {
    router.push("/loanApplication");
  };

  const loanProducts = !loading && data?.loanProducts;

  if (error) {
    return (
      <ButtonContainer
        title="Loan Application Dashboard"
        buttonTitle="Apply for a loan"
        style={{ flex: 1 }}
        actionFuntion={handleRedirectTOApplyForLoanScreen}
        isLoading={loading}
      >
        <ResponseGeneric
          header="No Loan Products Found"
          message="Please contact support for more details, You can go ahead and apply for a loan"
        />
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer
      title="Loan Application Dashboard"
      buttonTitle="Apply for a loan"
      style={{ flex: 1 }}
      actionFuntion={handleRedirectTOApplyForLoanScreen}
      isLoading={loading}
    >
      <View>
        {loanProducts &&
          loanProducts.map((item, i) => (
            <Card
              key={i}
              interest={item.interestRate}
              amount={item.maximumAmount}
              title={item.name}
              color={i % 2 === 0 ? theme.secondary : "white"}
              amountSign="$"
            />
          ))}
      </View>
    </ButtonContainer>
  );
};

export default Dashboard;
