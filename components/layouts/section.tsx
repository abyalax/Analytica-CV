import { CSSProperties, FC, PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

export type Props = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export const Section: FC<Props> = ({ children, className, style }) => {
  return (
    <div className={cn('space-y-4 border p-4 rounded h-full', className)} style={style}>
      {children}
    </div>
  );
};
