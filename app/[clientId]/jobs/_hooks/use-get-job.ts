import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { getJobDescription } from '~/data/jobs/jobs.api';

export const queryGetJob = (clientId: string, jobId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.JOB_DESC.GET_BY_ID, clientId, jobId],
    queryFn: () => getJobDescription(clientId, jobId),
    select: (data) => data.data.data,
  });

export const useGetJob = (clientId: string, jobId: string) => {
  return useSuspenseQuery(queryGetJob(clientId, jobId));
};
