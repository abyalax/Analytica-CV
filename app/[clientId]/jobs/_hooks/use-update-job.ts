import { useRouter } from 'next/navigation';
import { QUERY_KEY } from '~/common/const/querykey';
import { useMutation } from '~/components/hooks/use-mutation';
import { updateJobDescription } from '~/data/jobs/jobs.api';
import { PayloadJobDescription } from '~/data/jobs/jobs.type';

export const useUpdateJobDescription = (clientId: string, cvId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationFn: async (payload: PayloadJobDescription) => updateJobDescription(clientId, cvId, payload),
    onSuccess: () => back(),
    mutationKey: [QUERY_KEY.JOB_DESC.UPDATE],
    meta: { invalidateQueries: [QUERY_KEY.JOB_DESC.GETS] },
  });
};
