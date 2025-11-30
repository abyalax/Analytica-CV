'use client';

import { FC } from 'react';
import { CV } from '~/db/schema';

type Props = {
  data: CV;
};

export const Component: FC<Props> = ({ data }) => {
  return (
    <div className="bg-background">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
