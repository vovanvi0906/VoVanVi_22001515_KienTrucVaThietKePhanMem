const AUTH_STORAGE_KEY = "mini-food-auth-user";

export const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Cannot parse saved auth user:", error);
    return null;
  }
};

export const saveStoredUser = (user) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};
