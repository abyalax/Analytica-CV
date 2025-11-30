import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { deleteCV } from '~/modules/cvs/cv.api';

export const useDeleteCV = (clientId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.CV.DELETE],
    mutationFn: async (cvId: string) => await deleteCV(clientId, cvId),
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
    onSuccess: () => {
      toast.success('Successfully delete cv');
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to delete cv';
      console.log('useDelete error : ', error);
      toast.error(message);
    },
  });
};
