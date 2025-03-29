export const WAIT_LIST_STATUS_KEY = 'groops_waitlist_status';

export const setWaitListStatus = (email: string) => {
  localStorage.setItem(WAIT_LIST_STATUS_KEY, email);
};

export const getWaitListStatus = (): string | null => {
  return localStorage.getItem(WAIT_LIST_STATUS_KEY);
};