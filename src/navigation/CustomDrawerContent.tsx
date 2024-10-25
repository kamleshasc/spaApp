import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from '../config/colors';
import {useLogout} from '../hooks/useLogout';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

// type Nav = {
//   replace: (value: string) => void;
// };

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = props => {
  // const {replace} = useNavigation<Nav>();
  const logoutUser = useLogout();
  const handleLogout = () => {
    logoutUser();
    // replace('Login');
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
