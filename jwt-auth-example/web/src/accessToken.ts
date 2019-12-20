let accessToken = "";

export const setAccessToken = (acc: string) => {
  accessToken = acc;
};

export const getAccessToken = () => {
  return accessToken;
};
