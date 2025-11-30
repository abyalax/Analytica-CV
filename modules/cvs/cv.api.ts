import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import { CreateCV, CV, UpdateCV } from '~/db/schema';
import { api } from '~/lib/axios/api';
import { endpoint, url } from '~/lib/utils/converter';

export const getCVs = async (
  clientId: string,
  params?: MetaRequest<CV>,
): Promise<TAxiosResponse<{ data: CV[]; meta: MetaResponse }>> => {
  return api.get(endpoint('/api/[clientId]/cv', { clientId }), { params });
};

export const getCV = async (clientId: string, id: string): Promise<TAxiosResponse<CV>> => {
  return api.get(endpoint('/api/[clientId]/cv/[id]', { clientId, id }));
};

export const createCV = async (clientId: string, payload: CreateCV): Promise<TAxiosResponse<CV>> => {
  return api.post(endpoint('/api/[clientId]/cv', { clientId }), { ...payload });
};

export const updateCV = async (clientId: string, id: string, payload: UpdateCV): Promise<TAxiosResponse<CV>> => {
  return api.put(endpoint('/api/[clientId]/cv/[id]', { clientId, id }), { ...payload });
};

export const deleteCV = async (clientId: string, id: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(endpoint('/api/[clientId]/cv/[id]', { clientId, id }));
};
