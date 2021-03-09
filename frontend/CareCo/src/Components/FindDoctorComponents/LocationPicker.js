import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet} from 'react-native';
const LocationPicker = () => {
  const [setLocation, setSelectedLocation] = useState('Manila');

  const handleValueChange = (itemValue, itemIndex) => {
    setSelectedLocation(itemValue);
    console.log(itemValue);
  };

  return (
    <View style={styles.container}>
      {/* Find a doctor text */}
      <Text style={styles.header}>Find a Doctor</Text>

      <Text style={styles.tinyHeader}>Specialization</Text>
      <Picker
        selectedValue={selectDoctor}
        style={styles.dropDown}
        onValueChange={handleValueChange}>
        <Picker.Item label="Makati" value="MNL" />
        <Picker.Item label="Quezon City" value="QC" />
        <Picker.Item label="Makati" value="MKT" />
        <Picker.Item label="Pasay City" value="PSY" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 50,
    color: '#19769f',
  },

  tinyHeader: {
    fontSize: 35,
    color: '#19769f',
  },
  dropDown: {
    height: 50,
    width: 250,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#19769f',
    padding: 15,
  },
  buttonText: {
    color: 'white',
  },
});

export default LocationPicker;
