import * as React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const AuthForm = (props) => {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');

  function messageSuccess() {
    alert(text + ' ' + password);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Email"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <TextInput
        style={styles.textInput}
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <Button
        style={styles.button}
        icon="login"
        mode="contained"
        onPress={messageSuccess}>
        Sign in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
  textInput: {
    width: 300,
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    width: 300,
  },
});

export default AuthForm;
