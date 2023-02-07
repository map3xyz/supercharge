export const web3Mock = {
  addChain: jest.fn(),
  estimateGas: jest.fn(),
  getBalance: jest.fn(),
  getChainId: jest.fn(),
  getFeeData: jest.fn(),
  getTransaction: jest.fn().mockImplementation(() => true),
  handleAuthorizeTransactionProxy: jest.fn(),
  providers: {},
  sendTransaction: jest.fn(),
  switchChain: jest.fn(),
  waitForTransaction: jest.fn(),
};
