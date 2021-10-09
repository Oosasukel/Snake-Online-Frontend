export const isMobile = () => {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
};
