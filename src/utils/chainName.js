export const getChainName = () => {
  if (window && window.localStorage) {
    return localStorage.getItem('chainName');
  }
};

export const setChainName = chainName => {
  if (window && window.localStorage) {
    localStorage.setItem('chainName', chainName);

    return true;
  }
  return false;
};
