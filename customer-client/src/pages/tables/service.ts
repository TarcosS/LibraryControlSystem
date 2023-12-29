import { AxiosError, AxiosResponse } from 'axios';
import API from '../../utils/api';
import endpoints from './endpoints';

const getTables = async () => {
    return await API.get(endpoints.getTables)
      .then(function (response: AxiosResponse) {
        return response?.data;
      })
      .catch(function (error: AxiosError) {
        return error;
      });
};

const reservTable = async (tableId: string, times: string[]) => {
  return await API.post(endpoints.reservTable, {tableId, times})
    .then(function (response: AxiosResponse) {
      return response?.data;
    })
    .catch(function (error: AxiosError) {
      return error;
    });
}

export default {
  getTables,
  reservTable
}