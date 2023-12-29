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

const verifyReservation = async (tableId: string) => {
  return await API.post(endpoints.verifyReservation, {tableId: tableId})
    .then(function (response: AxiosResponse) {
      return response?.data;
    })
    .catch(function (error: AxiosError) {
      return error;
    });
};

const cancelReservation = async (reservationId: string) => {
  return await API.post(endpoints.cancelReservation, {reservationId: reservationId})
    .then(function (response: AxiosResponse) {
      return response?.data;
    })
    .catch(function (error: AxiosError) {
      return error;
    });
};

export default {
    getReservations,
    cancelReservation,
    verifyReservation
}