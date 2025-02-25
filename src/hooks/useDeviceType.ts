import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

interface DeviceInfo {
  isTablet: boolean;
  os: 'ios' | 'android';
}

const useDeviceType = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isTablet: false,
    os: Platform.OS as 'ios' | 'android',
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const { width, height } = Dimensions.get('window');
      const isTablet = Math.min(width, height) >= 768;

      setDeviceInfo({
        isTablet,
        os: Platform.OS as 'ios' | 'android',
      });
    };

    updateDeviceInfo();

    const subscription = Dimensions.addEventListener('change', updateDeviceInfo);

    return () => {
      subscription.remove();
    };
  }, []);

  return deviceInfo;
};

export default useDeviceType;