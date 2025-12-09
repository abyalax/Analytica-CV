import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { CV } from '~/db/schema';
import { getCVs } from '~/modules/cv/cv.api';

export const queryGetCVs = (clientId: string, params: MetaRequest<CV>) =>
  queryOptions({
    queryKey: [QUERY_KEY.CV.GETS, params],
    queryFn: () => getCVs(clientId, params),
    select: (data) => data.data.data,
  });

export const useGetCVs = (clientId: string, params: MetaRequest<CV> & Record<string, unknown>) => {
  return useSuspenseQuery(queryGetCVs(clientId, params));
};
