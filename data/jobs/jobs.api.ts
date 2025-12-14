import { TAxiosResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { endpoint } from '~/lib/utils/converter';
import { JobDescription } from '~/modules/jobs/jobs.type';
import { PayloadJobDescription, TFilterJobDescription } from './jobs.type';

export const getListJobs = async (clientId: string, params?: TFilterJobDescription) => {
  const _endpoint = endpoint('/api/[clientId]/jobs', { clientId });
  return await api.get(_endpoint, { params });
};

export const getJobDescription = (clientId: string, jobId: string): Promise<TAxiosResponse<JobDescription>> => {
  const _endpoint = endpoint('/api/[clientId]/jobs/[jobId]', { clientId, jobId });
  return api.get(_endpoint);
};

export const createJobDescription = (clientId: string, payload: JobDescription) => {
  const _endpoint = endpoint('/api/[clientId]/jobs', { clientId });
  return api.post(_endpoint, payload);
};

export const updateJobDescription = (clientId: string, jobId: string, payload: PayloadJobDescription) => {
  const _endpoint = endpoint('/api/[clientId]/jobs/[jobId]', { clientId, jobId });
  return api.put(_endpoint, payload);
};

export const deleteJobDescription = (clientId: string, jobId: string) => {
  const _endpoint = endpoint('/api/[clientId]/jobs/[jobId]', { clientId, jobId });
  return api.delete(_endpoint);
};
