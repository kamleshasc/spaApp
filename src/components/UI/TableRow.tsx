import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

interface TableRowProps {
  onPress: () => void;
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({onPress, children}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <View style={{flexDirection: 'row'}}>{children}</View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    // flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: 'grey',
    // justifyContent: 'center',
    // minHeight: 60,
  },
});

export default TableRow;
