export type Props = {};

export type LoanDetails = {
  name: string;
  email: string;
  amount: number;
  loanPurpose: string;
};

export type LoanDetailsErrors = {
  name?: string;
  email?: string;
  amount?: string;
  loanPurpose?: string;
};

export type ValidateAndLoad = {
  message: string;
  showMessage: boolean;
  loading: boolean;
};
