import { useQuery } from "react-query";
import { createContext, useState } from "react";

import * as apiClient from "../api-client";

import Toast from "../components/Toast";

interface IToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}

export interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void;
  isLoggedIn: boolean;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<IToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
