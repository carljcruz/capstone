import * as React from 'react';
import {View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

const ButtonNav = (props) => {
  return (
    <View>
      <IconButton
        icon={props.icon}
        onPress={props.onPress}
        color={props.color}
        size={props.size}
        style={props.style}
      />
    </View>
  );
};

export default ButtonNav;
