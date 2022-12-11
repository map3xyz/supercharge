import { useEffect, useState } from 'react';

export const useModalSize = () => {
  const [modalSize, setModalSize] = useState<{
    height?: number;
    width?: number;
  }>({
    height: undefined,
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      const modal = document.getElementById(
        'map3-modal-stepper'
      ) as HTMLElement;
      const { height, width } = modal.getBoundingClientRect();

      setModalSize({
        height: height,
        width: width,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...modalSize };
};
