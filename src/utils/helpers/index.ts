import type { User } from "../../types";

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUser = (userData: User): void => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem("refreshToken", token);
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const initializeAuth = () => {
  const token = getAccessToken();
  const user = getUser();
  return { token, user };
};

export const isStrongPassword = (password: string): boolean => {
  const passwordStrengthRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?]).{8,}$/;
  return passwordStrengthRegex.test(password);
};

export const isValidGhanaCardNumber = (ghanaCardNumber: string): boolean => {
  // Pattern: GHA- followed by 9 digits, then - and 1 digit
  const ghanaCardPattern = /^GHA-\d{9}-\d$/;
  return ghanaCardPattern.test(ghanaCardNumber);
};

export const isValidEmail = (email: string): boolean => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  return phone.length >= 8 && phone.length <= 15;
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Check if token is expired (if you're using JWT)
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Get token expiration time
export const getTokenExpiration = (token: string): Date | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return new Date(payload.exp * 1000);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken(); // Or your authentication check logic
};
