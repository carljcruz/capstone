import React from 'react';
import {View, StyleSheet} from 'react-native';

import Header from '../Components/Header';
import AuthForm from '../Components/AuthForm';
import Links from '../Components/Links';

export default PatientLoginScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="SIGN IN" />
      <AuthForm />

      <Links
        link="Create an Account"
        icon="pencil"
        onPress={() => alert('Create Account')}
      />
      <Links
        link="Go to Doctor Login"
        icon="doctor"
        onPress={() => alert('Doctor Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
});
