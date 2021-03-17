import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {Button} from 'react-native-paper';
const AppointmentScreen = () => {
  const [selectDoctor, setSelectedDoctor] = useState('Dr. Ivy');
  const [selectProblem, setSelectProblem] = useState('General Checkup');

  const doctorHandleValueChange = (itemValue, itemIndex) => {
    setSelectedDoctor(itemValue);
    console.log(itemValue);
  };

  const problemHandleValueChange = (itemValue, itemIndex) => {
    setSelectProblem(itemValue);
    console.log(itemValue);
  };

  return (
    <View style={styles.container}>
      {/* Create appointment text */}
      <Text style={styles.text}>Create Appointment</Text>

      {/* Doctor names picker */}
      <Picker
        selectedValue={selectDoctor}
        style={styles.dropDown}
        mode="dialog"
        dropdownIconColor="#6200EE"
        onValueChange={doctorHandleValueChange}>
        <Picker.Item label="Dr. One" value="Dr. One" />
        <Picker.Item label="Dr. Two" value="Dr. Two" />
        <Picker.Item label="Dr. Three" value="Dr. Three" />
        <Picker.Item label="Dr. Four" value="Dr. Four" />
      </Picker>

      {/* Specified problems list */}
      <Picker
        selectedValue={selectProblem}
        style={styles.dropDown}
        mode="dialog"
        dropdownIconColor="#6200EE"
        onValueChange={problemHandleValueChange}>
        <Picker.Item label="General Checkup" value="General Checkup" />
        <Picker.Item label="Eye thing" value="Eye thing" />
        <Picker.Item label="Cold" value="Cold" />
        <Picker.Item label="Others" value="Others" />
      </Picker>

      {/* Button next screen */}
      <Button
        icon="calendar-arrow-right"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Select Date
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDown: {
    width: 250,
    borderColor: 'red',
    marginLeft: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 15,
  },
  buttonText: {
    color: 'white',
  },
  text: {
    fontSize: 40,
    color: '#6200EE',
  },
});

export default AppointmentScreen;
