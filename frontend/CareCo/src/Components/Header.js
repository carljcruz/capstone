import * as React from 'react';
import {Title} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Title style={styles.text}> {props.title}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
  text: {
    color: '#6200EE',
    fontSize: 30,
  },
});

export default Header;
