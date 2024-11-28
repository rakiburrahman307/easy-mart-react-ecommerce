const getBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined in the .env file.");
  }
  return baseUrl;
};

export default getBaseUrl;
