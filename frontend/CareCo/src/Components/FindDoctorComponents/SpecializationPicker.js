import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet} from 'react-native';
const SpecializationPicker = () => {
  const [selectDoctor, setSelectedDoctor] = useState('Allergists');

  const handleValueChange = (itemValue, itemIndex) => {
    setSelectedDoctor(itemValue);
    console.log(itemValue);
  };

  return (
    <View style={styles.container}>
      {/* Find a doctor text */}
      <Picker
        selectedValue={selectDoctor}
        style={styles.dropDown}
        mode="dialog"
        dropdownIconColor="#6200EE"
        onValueChange={handleValueChange}>
        <Picker.Item label="ALLERGISTS" value="Allergists" />
        <Picker.Item label="ANESTHESIOLOGISTS" value="Anesthesiologists" />
        <Picker.Item label="CARDIOLOGISTS" value="Cardiologists" />
        <Picker.Item label="COLON SURGEONS" value="Colon Surgeons" />
        <Picker.Item
          label="CRITICAL CARE MEDICINE SPECIALISTS"
          value="Critical Care Medicine Specialist"
        />
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
    borderColor: 'red',
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
});

export default SpecializationPicker;
