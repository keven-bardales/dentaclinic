import React, { useEffect, useRef } from "react";
import { Dialog, DialogProps } from "primereact/dialog";

export type ModalChildProps<T, K> = {
  data: T | null;
  onHide: (data?: K) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  primeReactDialogProps?: Omit<DialogProps, "onHide">;
};

export type BaseModalComponent<T, K> = React.ComponentType<ModalChildProps<T, K>>;

export type BaseModalProps<T, K> = {
  component: BaseModalComponent<T, K>;
  data?: T;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onOpen?: () => void;
  primeReactDialogProps?: Omit<DialogProps, "onHide">;
  onClose?: (data?: K) => void;
  children?: React.ReactNode;
};

export default function BaseModal<T, K>({
  component: ModalComponent,
  data,
  visible,
  onOpen,
  onClose,
  setVisible,
  primeReactDialogProps,
  children,
}: BaseModalProps<T, K>) {
  useEffect(() => {
    if (onOpen) {
      onOpen();
    }
  }, [visible, onOpen]);

  const handleHide = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleClose = (data?: K) => {
    setVisible(false);

    if (onClose) {
      onClose(data);
    }
  };

  return (
    <Dialog {...primeReactDialogProps} visible={visible} onHide={handleHide}>
      <ModalComponent
        primeReactDialogProps={primeReactDialogProps}
        data={data ?? null}
        onHide={handleClose}
        visible={visible}
        setVisible={setVisible}
      />
    </Dialog>
  );
}
