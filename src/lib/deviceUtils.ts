// src/deviceUtils.ts

// Function to check if the device is a mobile device
export const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false; // Return false in server-side rendering
  }
  const userAgent: string = navigator.userAgent || navigator.vendor || window.opera;
  const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i];
  return regexs.some((regex) => userAgent.match(regex));
};

// Function to check if the device is a tablet device
export const isTabletDevice = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false; // Return false in server-side rendering
  }
  const userAgent: string = navigator.userAgent || navigator.vendor || window.opera;
  const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
  return regex.test(userAgent.toLowerCase());
};

// Function to check if the device is a desktop device
export const isDesktopDevice = (): boolean => !isMobileDevice() && !isTabletDevice();
