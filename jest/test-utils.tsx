import '@testing-library/jest-dom';

import { MockedProvider } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { mocks } from './__mocks__/gqlMocks';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
