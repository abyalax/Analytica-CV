import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { UpdateCV } from '~/db/schema';
import { updateCV } from '~/modules/cvs/cv.api';

export const useUpdateCV = (clientId: string, cvId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.CV.UPDATE],
    mutationFn: async (payload: UpdateCV) => await updateCV(clientId, cvId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
    onSuccess: () => {
      toast.success('Successfully update cv');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to update cv';
      console.log('useUpdateCV error : ', error);
      toast.error(message);
    },
  });
};
