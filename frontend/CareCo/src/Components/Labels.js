import * as React from 'react';
import {Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const Labels = (props) => {
  return (
    <View>
      <Text style={props.style}>{props.label}</Text>
    </View>
  );
};

export default Labels;
