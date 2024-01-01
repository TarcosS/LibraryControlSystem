import { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import endpoints from './endpoints.json';

const getReservations = async () => {
    return await API.get(endpoints.getReservations)
      .then(function (response: AxiosResponse) {
        return response?.data;
      })
      .catch(function (error: AxiosError) {
        return error;
      });
};

const deleteReservation = async (reservationId: string) => {
  return await API.post(endpoints.deleteReservation, {reservationId: reservationId})
    .then(function (response: AxiosResponse) {
      return response?.data;
    })
    .catch(function (error: AxiosError) {
      return error;
    });
};


export default {
    getReservations,
    deleteReservation
}