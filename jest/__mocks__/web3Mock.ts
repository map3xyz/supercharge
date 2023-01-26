export const web3Mock = {
  addChain: jest.fn(),
  authorizeTransactionProxy: jest.fn(),
  estimateGas: jest.fn(),
  getBalance: jest.fn(),
  getChainId: jest.fn(),
  getFeeData: jest.fn(),
  getTransaction: jest.fn().mockImplementation(() => true),
  providers: {},
  sendTransaction: jest.fn(),
  switchChain: jest.fn(),
  waitForTransaction: jest.fn(),
};