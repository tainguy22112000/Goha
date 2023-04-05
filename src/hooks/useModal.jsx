import {
  useContext,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const ModalContext = createContext();

export const ModalManager = ({ children }) => {
  const [modal, setModal] = useState({});
  const [visible, setVisible] = useState(true);

  const openModal = useCallback((ModalComponent, props) => {
    setModal({
      ModalComponent,
      props,
    });
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => setVisible(false), []);
  const destroyModal = useCallback(() => setModal({}), []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      destroyModal,
    }),
    [openModal, closeModal, destroyModal]
  );

  const { ModalComponent, props } = modal;

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      {ModalComponent && (
        <ModalComponent
          onOk={closeModal}
          onCancel={closeModal}
          {...props}
          open={visible}
          afterClose={destroyModal}
        />
      )}
    </>
  );
};

export default function useModal() {
  return useContext(ModalContext);
}
