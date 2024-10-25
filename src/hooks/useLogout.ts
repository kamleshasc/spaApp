import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/storeHook';
import {clearUserScreens} from '../redux/Action/authAction';
import {RootStackNavigationProp} from '../navigation/RootNavigation';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();

  const logoutUser = useCallback(async () => {
    try {
      // Clear user-specific screens and state
      dispatch(clearUserScreens());
      // Navigate to Login or OnBoarding screen
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Failed to logout user', error);
    }
  }, [dispatch, navigation]);

  return logoutUser;
};
