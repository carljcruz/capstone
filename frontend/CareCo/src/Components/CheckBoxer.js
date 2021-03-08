import * as React from 'react';
import {Checkbox} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';

const CheckBoxer = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
};

export default CheckBoxer;
