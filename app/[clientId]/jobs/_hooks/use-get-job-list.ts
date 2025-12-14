import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/common/const/querykey';
import { getListJobs } from '~/data/jobs/jobs.api';
import { TFilterJobDescription } from '~/data/jobs/jobs.type';

export const queryGetJobList = (clientId: string, params: TFilterJobDescription) =>
  queryOptions({
    queryKey: [QUERY_KEY.JOB_DESC.GETS, params],
    queryFn: () => getListJobs(clientId, params),
    select: (data) => data.data.data,
  });

export const useGetJobList = (clientId: string, params: TFilterJobDescription) => {
  return useSuspenseQuery(queryGetJobList(clientId, params));
};
