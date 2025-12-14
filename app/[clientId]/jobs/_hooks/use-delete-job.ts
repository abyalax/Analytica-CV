import { QUERY_KEY } from '~/common/const/querykey';
import { useMutation } from '~/components/hooks/use-mutation';
import { deleteJobDescription } from '~/data/jobs/jobs.api';

export const useDeleteJobDescription = (clientId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.JOB_DESC.DELETE],
    mutationFn: async (cvId: string) => deleteJobDescription(clientId, cvId),
    meta: { invalidateQueries: [QUERY_KEY.JOB_DESC.GETS] },
  });
};
