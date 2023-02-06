import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { mocks } from './__mocks__/gqlMocks';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MockedProvider mocks={mocks}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
