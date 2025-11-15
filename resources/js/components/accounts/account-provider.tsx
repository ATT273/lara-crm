import { IAccountResponse } from "@/types/account.type";
import { createContext, useContext } from "react";

interface AccountContextProps {
  userAuth: IAccountResponse | null;
}

interface AccountProviderProps {
  children: React.ReactNode;
  userAuth: IAccountResponse | null;
}

export const AccountContext = createContext<AccountContextProps>({
  userAuth: null,
});

const AccountProvider = ({ children, userAuth }: AccountProviderProps) => {
  return (
    <AccountContext.Provider value={{ userAuth }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};

export default AccountProvider;
