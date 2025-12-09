import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadFiles } from '~/lib/axios/upload';
import { endpoint } from '~/lib/utils/converter';

export const useUploadCV = (clientId: string) => {
  const query = useMutation({
    mutationFn: async (params: (File | undefined)[]) => {
      const _endpoint = endpoint('/api/[clientId]/upload', { clientId });
      await uploadFiles({ endpoint: _endpoint, files: params });
    },
    onSuccess: (_, variables) => toast.success(`Successfully upload ${variables.length} files`),
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      toast.error(`Failed to upload ${variables.length} files`);
    },
  });

  return {
    ...query,
    extract: query.mutate,
  };
};
