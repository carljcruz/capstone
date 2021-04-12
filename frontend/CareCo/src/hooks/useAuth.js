import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import React from 'react';
import axios from 'axios';

import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        const {data} = await axios
          .post(
            `${BASE_URL}login/`,
            {
              email: email,
              password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .catch(function (error) {
            console.log(error.response);
          });
        const user = {
          email: data.email,
          token: data.access,
        };

        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (email, password, bio, age, first_name, last_name) => {
        await sleep(5);

        let data = {
          bio: bio,
          age: age,
          first_name: first_name,
          last_name: last_name,
        };
        await axios
          .post(`${BASE_URL}register_patient/`, {
            email: email,
            password: password,
            patient_profile: data,
          })
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error.response);
          });
      },
      doctor_register: async (
        email,
        password,
        bio,
        age,
        first_name,
        last_name,
        education,
        specialization,
      ) => {
        await sleep(2000);

        let data = {
          bio: bio,
          age: age,
          first_name: first_name,
          last_name: last_name,
          education: education,
          specialization: specialization,
        };
        await axios
          .post(`${BASE_URL}register_doctor/`, {
            email: email,
            password: password,
            doctor_profile: data,
          })
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error.response);
          });
      },
    }),
    [],
  );
  React.useEffect(() => {
    let unmounted = false;

    sleep(5).then(() => {
      AsyncStorage.getItem('user').then((user) => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return {auth, state};
}
