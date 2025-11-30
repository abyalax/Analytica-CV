'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { H1 } from '~/components/ui/typography';
import { useGetCV } from '../../_hooks/use-get-cv';

type Params = Awaited<PageProps<'/[clientId]/cv/[cvId]'>['params']>;

export const Component: FC = () => {
  const { clientId, cvId } = useParams<Params>();
  const { data } = useGetCV(clientId, cvId);
  return (
    <div>
      <H1>Detail CV</H1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
