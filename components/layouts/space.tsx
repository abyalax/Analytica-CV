import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

type Props = PropsWithChildren<{
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'middle' | 'large' | number | [number, number];
  align?: 'start' | 'center' | 'end' | 'baseline';
  wrap?: boolean;
}> &
  HTMLAttributes<HTMLDivElement>;

export const Space: FC<Props> = ({
  children,
  direction = 'horizontal',
  wrap = false,
  align = 'center',
  size = 'small',
  className,
  style,
  ...props
}) => {
  const sizeMap: Record<'small' | 'middle' | 'large', number> = {
    small: 8,
    middle: 16,
    large: 24,
  };

  const getGap = () => {
    if (typeof size === 'number') {
      return { rowGap: size, columnGap: size };
    }
    if (Array.isArray(size)) {
      return { rowGap: size[1], columnGap: size[0] };
    }
    const gapValue = sizeMap[size];
    return { rowGap: gapValue, columnGap: gapValue };
  };

  const gaps = getGap();

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
  };

  return (
    <div
      className={cn(
        'inline-flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        wrap && 'flex-wrap',
        alignMap[align],
        className,
      )}
      style={{
        rowGap: gaps.rowGap,
        columnGap: gaps.columnGap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
