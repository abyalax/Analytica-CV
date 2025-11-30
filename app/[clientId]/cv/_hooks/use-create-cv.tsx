import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { CreateCV } from '~/db/schema';
import { createCV } from '~/modules/cvs/cv.api';

export const useCreateCV = (clientId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.CV.CREATE],
    mutationFn: async (payload: CreateCV) => await createCV(clientId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CV.GETS] },
    onSuccess: () => {
      toast.success('Successfully create cv');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to create cv';
      console.log('useCreateCV error : ', error);
      toast.error(message);
    },
  });
};
