export const erc20Abi = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
];
