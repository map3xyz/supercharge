export type EvmMethodProviderProps = {
  amount: string;
  disabled: boolean;
  isConfirming: boolean;
  loading?: boolean;
  setFormError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
};
