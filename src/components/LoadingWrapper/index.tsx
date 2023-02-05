import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingWrapper: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-64 w-full items-center justify-center text-sm">
      <div className="flex flex-col items-center justify-center gap-2 font-semibold text-neutral-500">
        <div className="animate-spin ">
          <i className="fa fa-gear"></i>
        </div>
        <span>{message || t('copy.loading')}</span>
      </div>
    </div>
  );
};

type Props = {
  message?: string;
};

export default LoadingWrapper;
