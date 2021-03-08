import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Button, Menu, Divider, Provider} from 'react-native-paper';

import MenuPicker from '../../Components/MenuPicker';

export default FindADoctorScreen = () => {
  return (
    <View style={styles.container}>
      <MenuPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
