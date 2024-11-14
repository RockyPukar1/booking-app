import { createContext, useState } from "react";
import Toast from "../components/Toast";

interface IToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}

export interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<IToastMessage | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
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
