import { useEffect, useState } from 'react';

export const useModalSize = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [modalSize, setModalSize] = useState<{
    height?: number;
    width?: number;
  }>({
    height: undefined,
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      if (!ref.current || !ref.current.getBoundingClientRect()) return;
      const { height, width } = ref.current.getBoundingClientRect();

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
