import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';
import ButtonNav from '../../src/Components/ButtonNav';
import Labels from '../../src/Components/Labels';

export default Dashboard = () => {
  return (
    <View style={styles.main_container}>
      <View style={styles.container}>
        {/* find a doctor */}
        <Labels label="Find a Doctor" style={styles.label} />
        <ButtonNav
          icon="doctor"
          color="#9A5BF4"
          size={112}
          style={styles.button}
          onPress={() => alert('Find a doctor')}
        />

        {/* Appointments */}
        <Labels label="Appointments" style={styles.label} />
        <ButtonNav
          icon="clipboard-list-outline"
          color="#9A5BF4"
          size={112}
          style={styles.button}
          onPress={() => alert('Appointments')}
        />
      </View>

      <View style={styles.second_container}>
        {/* Prescriptions */}
        <Labels label="Prescriptions" style={styles.label} />
        <ButtonNav
          icon="clipboard-plus-outline"
          color="#9A5BF4"
          size={112}
          style={styles.button}
          onPress={() => alert('Prescriptions')}
        />

        {/* Messages */}
        <Labels label="Messages" style={styles.label} />
        <ButtonNav
          icon="message-outline"
          color="#9A5BF4"
          size={112}
          style={styles.button}
          onPress={() => alert('Messages')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  second_container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 13,
    position: 'absolute',
    bottom: 10,
    marginLeft: 50,
    fontWeight: '700',
  },
  button: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#963CBDFF',
  },
});
