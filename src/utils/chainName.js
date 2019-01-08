// @flow
export const get = (key: string): any => {
  if (window && window.localStorage) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : '';
  }
};

export const remove = (key: string) => {
  if (window && window.localStorage) {
    localStorage.removeItem(key);

    return true;
  }
  return false;
};

export const set = (key: string, value: string) => {
  if (window && window.localStorage) {
    localStorage.setItem(key, value);

    return true;
  }
  return false;
};
