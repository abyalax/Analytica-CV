import { QUERY_KEY } from '~/common/const/querykey';
import { useMutation } from '~/components/hooks/use-mutation';
import { updateCV } from '~/data/cv/cv.api';
import { PayloadCV } from '~/data/cv/cv.type';

export const useUpdateCV = (clientId: string, cvId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.CV.UPDATE],
    mutationFn: async (payload: PayloadCV) => updateCV(clientId, cvId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
  });
};
