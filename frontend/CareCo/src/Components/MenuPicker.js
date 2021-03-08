import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

const MenuPicker = () => {
  let data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
  ];

  return (
    <View>
      <Dropdown
        icon="chevron-down"
        iconColor="#E1E1E1"
        label="Favorite Fruit"
        data={data}
      />
    </View>
  );
};

export default MenuPicker;
