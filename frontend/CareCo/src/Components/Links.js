import * as React from 'react';
import {Button} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const Links = (props) => {
  return (
    <View>
      <Button
        style={styles.link}
        mode={props.mode}
        onPress={props.onPress}
        icon={props.icon}>
        {props.link}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#9A5BF4',
    width: 300,
    marginLeft: 30,
  },
});

export default Links;
