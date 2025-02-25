import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import colors from '../../../config/colors';
import {UI} from '../..';
import {durationData} from '../../../config/data';
import {HelperText} from 'react-native-paper';
import SubServiceItem from './SubServiceItem';
import { rMS } from '../../../config/responsive';

type SubValues = {
  name: string;
  price: any | number;
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
          <SubServiceItem
            value={value}
            onPress={() => deleteItemPressed(index)}
            key={index}
          />
        ))}
    </>
  );
};

export default SubServiceWithList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingLeft: rMS(12),
    paddingBottom: 15,
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingTop:rMS(10),
    ...Platform.select({
      android: {
        elevation: rMS(3),
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: rMS(2) },
        shadowRadius: rMS(4),
        shadowOpacity: 0.15,
      },
    }),
  },
  title: {
    fontSize: rMS(13),
    fontWeight: '600',
    color: colors.fontDark,
    marginBottom: rMS(8),
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
    marginBottom: 4,
    marginHorizontal: 0,
    paddingLeft:rMS(12)
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 0,
    marginBottom: 0,
    paddingVertical: rMS(10),
    paddingHorizontal: rMS(10),
    borderRadius:rMS(12)
  },
  errorContainer: {
    marginLeft: 0,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
