import React from 'react';
import PayOption from './PayOption';

type PaymentOptionProps = {
  selected: number;
  onPress: (value: number) => void;
};

const PaymentOption = ({selected, onPress}: PaymentOptionProps) => {
  return (
    <>
      <PayOption
        imageUrl={require('../../../assets/images/money-png.png')}
        name={'Cash'}
        onPress={() => onPress(1)}
        selected={selected === 1}
      />
      <PayOption
        imageUrl={require('../../../assets/images/credit-card-png.png')}
        name={'Credit Card'}
        onPress={() => onPress(2)}
        selected={selected === 2}
      />
      <PayOption
        imageUrl={require('../../../assets/images/zelle-icon.png')}
        name={'Zelle'}
        onPress={() => onPress(3)}
        selected={selected === 3}
      />
    </>
  );
};

export default PaymentOption;
