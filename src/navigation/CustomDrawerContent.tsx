import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/storeHook';
import {clearUserScreens} from '../redux/Action/authAction';
import colors from '../config/colors';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

type Nav = {
  replace: (value: string) => void;
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = props => {
  const {replace} = useNavigation<Nav>();
  const dispatchCustomDrawerNavigation = useAppDispatch();

  const clearScreens = async () => {
    dispatchCustomDrawerNavigation(clearUserScreens());
  };

  const handleLogout = () => {
    // Add your logout logic here
    setTimeout(() => {
      clearScreens();
    }, 500);
    replace('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Render the default drawer items */}
      {/* {props.children} */}
      {/* {props.state.routes.map((route, index) => (
        <DrawerItem
          key={index}
          label={route.name}
          onPress={() => navigation.navigate(route.name)}
        />
      ))} */}
      <DrawerItemList {...props} />
      {/* Logout button at the bottom */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{
          borderWidth: 1,
          borderColor: colors.themePrimary,
          borderRadius: 8,
        }}
        labelStyle={{
          color: colors.themePrimary,
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
