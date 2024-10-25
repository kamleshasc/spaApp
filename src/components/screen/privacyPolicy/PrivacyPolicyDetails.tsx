import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';
import PrivacyPolicyItem from './PrivacyPolicyItem';
import React from 'react';

interface contentItem {
  _id: string;
  title: string;
  description: string;
}
interface dataItem {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  content: contentItem[];
}

interface PrivacyPolicyDetailsProps {
  data: dataItem;
}

function PrivacyPolicyDetails({data}: PrivacyPolicyDetailsProps) {
  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{data?.title}</Text>
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>{data?.subTitle}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{data?.description}</Text>
      </View>

      {data?.content.map((value, index) => (
        <PrivacyPolicyItem
          title={value.title}
          value={value.description}
          index={index}
          key={index}
        />
      ))}
    </React.Fragment>
  );
}

export default PrivacyPolicyDetails;

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: rMS(15),
  },
  titleText: {
    fontSize: rMS(20),
    fontWeight: '700',
    color: colors.fontDark,
    textAlign: 'center',
  },
  subTitleContainer: {
    marginBottom: rMS(10),
    justifyContent: 'flex-start',
  },
  subTitleText: {
    fontSize: rMS(16),
    fontWeight: '600',
    color: colors.fontDark,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: rMS(10),
  },
  descriptionText: {
    fontSize: rMS(15),
    fontWeight: '500',
    color: colors.fontDark,
  },
});
