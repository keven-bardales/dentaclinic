import { Toast, ToastMessage } from "primereact/toast";
import React, { useEffect } from "react";
import { ReactNode, createContext, useRef } from "react";

const ToastContext = createContext({
  showToast: (message: ToastMessage | ToastMessage[]) => {},
  handleActionResponse: (response: any) => {},
  handleErrorsList: (errors: string[]) => {},
});

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    if (!toastRef?.current) {
      return;
    }

    toastRef?.current?.show(message);
  };

  const handleActionResponse = (response: any) => {
    if (response?.errors) {
      const toastMessages: ToastMessage[] = response.errors.map((error: string) => ({
        severity: "error",
        detail: error,
        life: 3000,
      }));

      showToast(toastMessages);
    }

    if (response?.success) {
      showToast({
        severity: "success",
        detail: response.message,
        life: 3000,
      });
    }
  };

  const handleErrorsList = (errors: string[]) => {
    const toastMessages: ToastMessage[] = errors.map((error: string) => ({
      severity: "error",
      detail: error,
      life: 3000,
    }));

    showToast(toastMessages);
  };

  return (
    <ToastContext.Provider value={{ showToast, handleActionResponse, handleErrorsList }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const [IsClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!IsClient) {
    return { showToast: () => {}, handleActionResponse: () => {}, handleErrorsList: () => {} };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = React.useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }

  return context;
};
