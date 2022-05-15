export const useAuth = () => {
  return localStorage.getItem('auth') ? true : false;
};
