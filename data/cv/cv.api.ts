import { TAxiosResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { ReturnExtracted } from '~/lib/pdf/client';
import { endpoint } from '~/lib/utils/converter';
import { CV } from '~/modules/cv/cv.type';
import { PayloadCV, TFilterCV } from './cv.type';

export const getListCV = (params: TFilterCV, clientId: string) => {
  return api.get(endpoint('/api/[clientId]/cv', { clientId }), { params });
};

export const getCV = (clientId: string, id: string): Promise<TAxiosResponse<CV>> => {
  return api.get(endpoint('/api/[clientId]/cv/[id]', { clientId, id }));
};

export const createCV = (clientId: string, payload: CV) => {};
export const updateCV = (clientId: string, id: string, payload: PayloadCV) => {};
export const deleteCV = (clientId: string, id: string) => {};

export const parseToJsonCV = async (params: {
  clientId: string;
  extracted: ReturnExtracted[];
}): Promise<TAxiosResponse<CV[]>> => {
  const ENDPOINT = endpoint('/api/[clientId]/extract', { clientId: params.clientId });
  return api.post(ENDPOINT, params.extracted);
};
