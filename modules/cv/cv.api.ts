import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import { CreateCV, CV, UpdateCV } from '~/db/schema';
import { api } from '~/lib/axios/api';
import { ReturnExtracted } from '~/lib/pdf/extract';
import { endpoint } from '~/lib/utils/converter';

export const getCVs = async (
  clientId: string,
  params?: MetaRequest<CV>,
): Promise<TAxiosResponse<{ data: CV[]; meta: MetaResponse }>> => {
  const ENDPOINT = endpoint('/api/[clientId]/cv', { clientId });
  return api.get(ENDPOINT, { params });
};

export const getCV = async (clientId: string, id: string): Promise<TAxiosResponse<CV>> => {
  const ENDPOINT = endpoint('/api/[clientId]/cv/[id]', { clientId, id });
  return api.get(ENDPOINT);
};

export const createCV = async (clientId: string, payload: CreateCV): Promise<TAxiosResponse<CV>> => {
  const ENDPOINT = endpoint('/api/[clientId]/cv', { clientId });
  return api.post(ENDPOINT, { ...payload });
};

export const updateCV = async (clientId: string, id: string, payload: UpdateCV): Promise<TAxiosResponse<CV>> => {
  const ENDPOINT = endpoint('/api/[clientId]/cv/[id]', { clientId, id });
  return api.put(ENDPOINT, { ...payload });
};

export const deleteCV = async (clientId: string, id: string): Promise<TAxiosResponse<boolean>> => {
  const ENDPOINT = endpoint('/api/[clientId]/cv/[id]', { clientId, id });
  return api.delete(ENDPOINT);
};

export const parseToJsonCV = async (params: {
  clientId: string;
  extracted: ReturnExtracted[];
}): Promise<TAxiosResponse<CV[]>> => {
  const ENDPOINT = endpoint('/api/[clientId]/extract', { clientId: params.clientId });
  return api.post(ENDPOINT, params.extracted);
};
