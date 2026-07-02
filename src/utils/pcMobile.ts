export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /mobile|android|iphone|ipad|ipod|windows phone|phone|webos/i;

  return mobileRegex.test(userAgent);
};
