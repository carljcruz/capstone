import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
const CreateAppointment = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View style={styles.container}>
      <Text>Available Dates Here </Text>
      {/* Date picker */}
      <View>
        <Button
          onPress={showDatepicker}
          title="Show date picker!"
          icon="calendar-month">
          Select Date
        </Button>
      </View>
      <View>
        <Button
          onPress={showTimepicker}
          title="Show time picker!"
          icon="clock-check-outline">
          Select Time
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          console.log(date);
        }}>
        Testing
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateAppointment;
