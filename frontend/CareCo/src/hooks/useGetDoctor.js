import React from 'react';
import axios from 'axios';

import {UserContext} from '../contexts/UserContext';
import {BASE_URL} from '../config';
//
export function useGetDoctor(endpoint, param, query, initialValue = []) {
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState(initialValue);
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}${endpoint}${param}${query}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then(({data}) => {
        setData(data);
        console.log(data);
      })

      .catch(function (error) {
        // handle error
        console.log(error.response);
      });
  }, [token, endpoint]);
  return data;
}
