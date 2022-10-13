import { Modal } from '@map3xyz/components';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface Map3InitConfig {
  element: string;
}

const TRANSITION = 300;

const Map3Sdk: React.FC<Props> = ({ onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION);
  };

  return (
    <div>
      <Modal
        closable
        onCancel={handleClose}
        title="Hello World"
        transition={TRANSITION}
        visible={open}
      >
        SDK
      </Modal>
    </div>
  );
};

type Props = {
  onClose: () => void;
};

export const initMap3Sdk = ({ element }: Map3InitConfig) => {
  const host = document.getElementById(element);

  if (!host) throw new Error(`Element ${element} not found`);

  const root = createRoot(host);
  root.render(<Map3Sdk onClose={() => root.unmount()} />);
};

export default Map3Sdk;
