export const getLocalStorageItem = () => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem("token");
    return value
    }
    return null;
  };

  export const removeLocalStorageItem = () => {
    if (typeof window !== 'undefined') {
    window.localStorage.removeItem("token")
    }
  };
