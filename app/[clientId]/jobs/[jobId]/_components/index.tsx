'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { DescriptionItem, Descriptions } from '~/components/fragments/descriptions/descriptions';
import { RenderMarkdown } from '~/components/fragments/markdown/render-markdown';
import { Main } from '~/components/layouts/main';
import { useGetJob } from '../../_hooks/use-get-job';

type Params = Awaited<PageProps<'/[clientId]/jobs/[jobId]'>['params']>;

export const Component: FC = () => {
  const { clientId, jobId } = useParams<Params>();
  const { data } = useGetJob(clientId, jobId);

  const descriptionItems: DescriptionItem[] = [
    { label: 'Status', children: data?.status },
    { label: 'Title', children: data?.title },
    { label: 'Descriptins', children: data?.description },
    { label: 'Requirements', children: <RenderMarkdown>{data?.requirements}</RenderMarkdown> },
    { label: 'Responsibilities', children: <RenderMarkdown>{data?.responsibilities}</RenderMarkdown> },
    { label: 'Skills', children: <RenderMarkdown>{data?.skills}</RenderMarkdown> },
  ];

  return (
    <Main fixed>
      <Descriptions bordered column={2} title="Job Descriptions" items={descriptionItems} />
    </Main>
  );
};
