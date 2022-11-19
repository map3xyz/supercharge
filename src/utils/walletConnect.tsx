export const walletConnectWrapper = async (
  func: () => Promise<any>,
  timeout?: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = func();
      resolve(result);
    } catch (e) {
      reject(e);
    }

    if (timeout) {
      setTimeout(() => {
        reject(
          new Error(`WalletConnect timed out after ${timeout / 1000} seconds.`)
        );
      }, timeout);
    }
  });
};
