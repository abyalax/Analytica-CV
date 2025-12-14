'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Main } from '~/components/layouts/main';
import { FormJobs } from '../../../_components/form';
import { FormDataJobs } from '../../../_components/form/schema';
import { useGetJob } from '../../../_hooks/use-get-job';
import { useUpdateJobDescription } from '../../../_hooks/use-update-job';

type Params = Awaited<PageProps<'/[clientId]/jobs/[jobId]/update'>['params']>;

export const Component: FC = () => {
  const { clientId, jobId } = useParams<Params>();
  const { data } = useGetJob(clientId, jobId);

  const { mutate: updateJobs } = useUpdateJobDescription(clientId, jobId);

  const onSubmit = (values: FormDataJobs) => {
    console.log('submit', values);
    updateJobs(values);
  };

  return (
    <Main fixed>
      <FormJobs onSubmit={onSubmit} initialValues={data as FormDataJobs} buttonText="Update" />
    </Main>
  );
};
