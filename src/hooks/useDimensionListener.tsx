import {useState, useEffect} from 'react';
import {Dimensions, ScaledSize, DimensionChangeEventName} from 'react-native';

interface UseDimensionListenerProps {
  onDimensionsChange?: (dimensions: {screen: ScaledSize}) => void;
}

const useDimensionListener = ({
  onDimensionsChange,
}: UseDimensionListenerProps = {}) => {
  const [dimensions, setDimensions] = useState(() => ({
    screen: Dimensions.get('screen'),
  }));

  useEffect(() => {
    const handleChange = ({screen}: DimensionChangeEventName) => {
      setDimensions({screen});
      onDimensionsChange?.({screen});
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => subscription.remove();
  }, [onDimensionsChange]);

  return dimensions;
};

export default useDimensionListener;
