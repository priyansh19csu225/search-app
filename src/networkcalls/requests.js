import axiosClient from './axiosClient';

export function getRequest(URL) {
  return axiosClient.get(URL);
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload);
}