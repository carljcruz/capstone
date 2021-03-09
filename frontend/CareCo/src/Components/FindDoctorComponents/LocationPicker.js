import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet} from 'react-native';
const LocationPicker = () => {
  const [selectLocation, setSelectedLocation] = useState('Manila');

  const handleValueChange = (itemValue, itemIndex) => {
    setSelectedLocation(itemValue);
    console.log(itemValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectLocation}
        dropdownIconColor="#6200EE"
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
    borderColor: '#6200EE',
    borderWidth: 0.8,
    borderRadius: 0,
  },
  dropDown: {
    width: 250,
    marginLeft: 100,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 15,
  },
  buttonText: {
    color: 'white',
  },
  items: {
    color: '#6D6D6D',
    backgroundColor: '#FFF',
    marginBottom: 20,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LocationPicker;
