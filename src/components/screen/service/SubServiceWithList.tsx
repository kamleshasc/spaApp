import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';
import {UI} from '../..';
import {durationData} from '../../../config/data';
import {HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
type SubValues = {
  name: string;
  price: any;
  duration: string;
};

const initialSubValues: SubValues = {
  name: '',
  price: '',
  duration: '',
};

type SubServiceWithList = {
  addedValues: (inputs: SubValues) => void;
  selectedSubService: SubValues[];
  deleteItemPressed: (value: number) => void;
  isError: boolean;
  errorMsg: any;
};

const SubServiceWithList = ({
  addedValues,
  selectedSubService,
  deleteItemPressed,
  isError,
  errorMsg,
}: SubServiceWithList) => {
  const [inputs, setInputs] = React.useState(initialSubValues);
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    if (errorStatus) {
      setErrorStatus(false);
    }
    setInputs(inputs => {
      return {
        ...inputs,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const addPressed = () => {
    if (
      inputs.name.length <= 0 ||
      inputs.duration.length <= 0 ||
      inputs.price.toString().length <= 0
    ) {
      setErrorStatus(true);
      return;
    }
    addedValues(inputs);
    setInputs(initialSubValues);
  };

  const SelectedSubService = ({
    value,
    selectedIndex,
  }: {
    value: SubValues;
    selectedIndex: number;
  }) => {
    return (
      <View style={styles.selectedSubServiceContainer}>
        <View style={styles.selectedSubServiceInnerContainer}>
          <View style={styles.selectedSubServiceDetailsContainer}>
            <View style={styles.selectedSubServiceDetailRow}>
              <Text style={styles.selectedSubServiceLabel}>Service:</Text>
              <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
                {value?.name}
              </Text>
            </View>
            <View style={styles.selectedSubServiceDetailRow}>
              <Text style={styles.selectedSubServiceLabel}>Price:</Text>
              <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
                {value?.price}
              </Text>
            </View>
            <View style={styles.selectedSubServiceDetailRow}>
              <Text style={styles.selectedSubServiceLabel}>Duration:</Text>
              <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
                {value?.duration}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => deleteItemPressed(selectedIndex)}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sub service</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <UI.Input
              textInputConfig={{
                placeholder: 'Name*',
                value: inputs.name,
                keyboardType: 'default',
                onChangeText: (value: any) =>
                  inputChangedHandler('name', value),
              }}
              stylesInput={styles.input}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Price*',
                value: inputs.price,
                keyboardType: 'number-pad',
                onChangeText: (value: any) =>
                  inputChangedHandler('price', value),
              }}
              stylesInput={styles.input}
            />
            <UI.DropDown
              data={durationData}
              onChange={(value: any) =>
                inputChangedHandler('duration', value.value)
              }
              placeholder={'Select Duration*'}
              value={inputs.duration}
              styles={styles.dropdown}
            />
          </View>
          <View style={styles.buttonContainer}>
            <UI.Btn onPressBtn={addPressed} styles={styles.button}>
              Add
            </UI.Btn>
          </View>
        </View>
        {errorStatus && (
          <View style={styles.errorContainer}>
            <HelperText type="error" visible={true} style={styles.errorText}>
              {'All fields are required.'}
            </HelperText>
          </View>
        )}
      </View>
      {isError && (
        <View style={{marginTop: -10, marginLeft: 16, marginBottom: 4}}>
          <HelperText type="error" visible={true} style={styles.errorText}>
            {errorMsg}
          </HelperText>
        </View>
      )}
      {selectedSubService &&
        selectedSubService.length > 0 &&
        selectedSubService.map((value, index) => (
          <SelectedSubService value={value} selectedIndex={index} key={index} />
        ))}
    </>
  );
};

export default SubServiceWithList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.fontDark,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 5,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  dropdown: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 0,
    marginBottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  errorContainer: {
    marginLeft: 0,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
  },
  selectedSubServiceContainer: {
    marginBottom: 20,
    marginHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    padding: 10,
    flex: 1,
  },
  selectedSubServiceInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedSubServiceDetailsContainer: {
    width: '85%',
  },
  selectedSubServiceDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  selectedSubServiceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: 2,
  },
  selectedSubServiceValue: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.fontDark,
  },
});
