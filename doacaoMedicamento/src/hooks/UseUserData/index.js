import { useState, useCallback } from 'react';
import api from '../../services/api';

const useUserData = () => {
  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    email: '',
    birthday: '',
    cpf: ''
  });

  const fetchUserData = useCallback(async () => {
    try {
      const response = await api.get('Usuario/BuscarPorCodigo');
      console.log('UserData => ', response)
      const responseData = response.data;
      setUserData({
        avatar: responseData.foto,
        name: responseData.nome,
        email: responseData.email,
        birthday: new Date(responseData.dataNascimento).toISOString().substring(0, 10),
        cpf: responseData.cpf
      });
    } catch (error) {
      //console.error('Error fetching user data:', error);
    }
  }, []);

  return { userData, setUserData, fetchUserData };
};

export default useUserData;
