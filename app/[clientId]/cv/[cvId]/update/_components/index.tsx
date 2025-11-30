'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormCV } from '../../../_components/form';
import { FormDataCV } from '../../../_components/form/schema';
import { useGetCV } from '../../../_hooks/use-get-cv';
import { useUpdateCV } from '../../../_hooks/use-update-cv';

type Params = Awaited<PageProps<'/[clientId]/cv/[cvId]/update'>['params']>;

export const Component: FC = () => {
  const { clientId, cvId } = useParams<Params>();
  const { mutate, isPending } = useUpdateCV(clientId, cvId);
  const { data } = useGetCV(clientId, cvId);
  const handleSubmit = (data: FormDataCV) => {
    mutate(data);
  };

  const initialValues = data && { name: data.name, email: data.email, password: '' };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>CV Information</CardTitle>
          <CardDescription>Please provide details data for the cv.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormCV onSubmit={handleSubmit} buttonText="Update CV" initialValues={initialValues} isLoading={isPending} />
        </CardContent>
      </Card>
    </Flex>
  );
};
