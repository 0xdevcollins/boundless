"use server"
import api from './api';
import {
  ProjectInitRequest,
} from './types';

export const initProject = async (data: ProjectInitRequest) => {
  const res = await api.post('/projects', data);
  console.log(res);
  return res;
};
