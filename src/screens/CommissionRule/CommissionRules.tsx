import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchCommissionRules} from '../../redux/Action/commissionRuleAction';
import {clearGetCommissionRuleErrorMsg} from '../../redux/Reducer/commissionRuleReducer/getCommissionRuleSlice';
import {DateFormateMMMMDDYYY} from '../../config/helper';

type CommissionType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'CommissionRules'>,
  StackScreenProps<RootStackParamList>
>;
interface objUserValue {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface commissionRuleData {
  _id: string;
  name: string;
  criteria: string;
  value: number;
  applicableUser: objUserValue[];
  createdBy: objUserValue;
  updatedBy: objUserValue;
  createdAt: string;
  updatedAt: string;
}

function CommissionRules({navigation}: CommissionType) {
  const dispatchGetCommissionRule = useAppDispatch();
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.commissionRule.getCommission,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCommissionRule')}
          style={style.headerIconContainer}>
          <Icon name="add" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getCommissionRule = () => {
    dispatchGetCommissionRule(fetchCommissionRules());
  };

  React.useEffect(() => {
    getCommissionRule();
  }, []);

  function renderItem({item}: {item: commissionRuleData}) {
    return (
      <UI.TableR
        onPress={() => {
          navigation.navigate('EditCommissionRule', {commissionRule: item});
        }}>
        <UI.TableI name={item?.name} />
        <UI.TableI name={item.criteria} />
        <UI.TableI name={`$${item?.value?.toFixed(2)}`} />
        <UI.TableI
          bunchData={item?.applicableUser.map(
            value => value?.firstName + ' ' + value?.lastName,
          )}
        />
        <UI.TableI
          name={item?.createdBy?.firstName + ' ' + item?.createdBy?.lastName}
        />
        <UI.TableI
          name={item?.updatedBy?.firstName + ' ' + item?.updatedBy?.lastName}
        />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.updatedAt)} />
      </UI.TableR>
    );
  }

  return (
    <View style={style.container}>
      <FlatList
        onRefresh={() => getCommissionRule()}
        refreshing={isLoader}
        data={new Array(1)}
        horizontal={true}
        renderItem={() => (
          <View style={style.fullScreen}>
            <UI.TableH
              headers={[
                'Name',
                'Criteria',
                'Value',
                'Applicable User',
                'Created By',
                'Updated By',
                'Created Date',
                'Updated Date',
              ]}
            />
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <UI.Toast
        visible={isError}
        message={errorMsg}
        onDismissSnackBar={() =>
          dispatchGetCommissionRule(clearGetCommissionRuleErrorMsg())
        }
      />
    </View>
  );
}

export default CommissionRules;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headerIconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
