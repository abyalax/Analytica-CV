'use client';

import { Header } from '@tanstack/react-table';

export const useCreateStickyColumnStyle =
  <TData, TValue>(freezeIds: string[]) =>
  (header: Header<TData, TValue>, scrollLeft: number, theme?: string) => {
    const id = header.column.id;
    if (!freezeIds.includes(id)) return undefined;

    const headerGroup = header.headerGroup.headers;
    // ordered frozen ids in table order
    const orderedFreeze = headerGroup.filter((h) => freezeIds.includes(h.column.id)).map((h) => h.column.id);

    // left pos from TanStack (most accurate)
    const left = header.getStart();

    // apakah ini kolom frozen paling kanan?
    const isLastFrozen = orderedFreeze[orderedFreeze.length - 1] === id;

    // kondisi "stuck": scrollLeft >= left (dengan tolerance)
    const stuck = scrollLeft >= Math.max(0, Math.floor(left));

    // base styles always (so cell occupies space)
    const base: React.CSSProperties = {
      position: 'sticky',
      left,
      zIndex: 40,
      boxSizing: 'border-box',
      // ensure transform context for virtualizer
      transform: 'translateZ(0)',
    };

    // only the last frozen column shows shadow when it's actually stuck
    if (isLastFrozen && stuck) {
      return {
        ...base,
        backgroundColor: 'white', // TODO: Adjust to be Dynamic for theming
        // you might use borderLeft/Right to sharpen edge:
        borderRight: '1px solid rgba(0,0,0,0.06)',
      } as React.CSSProperties;
    }

    // if not stuck yet, no shadow (but still sticky position)
    return base;
  };
