'use client';

import { Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { TableJobs } from './table-jobs';

export const Component = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <TableJobs />
    </Suspense>
  );
};
