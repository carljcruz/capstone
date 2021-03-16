import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import SpecializationPicker from '../../Components/FindDoctorComponents/SpecializationPicker';
import LocationPicker from '../../Components/FindDoctorComponents/LocationPicker';
export default FindADoctorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a Doctor</Text>
      <Text style={styles.title}>Specialization</Text>
      <SpecializationPicker />
      <Text style={styles.title}>Location </Text>
      <LocationPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#6200EE',
    fontSize: 30,
    textAlign: 'center',
  },
  header: {
    color: '#6200EE',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
  },
});
