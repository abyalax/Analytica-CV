'use client';

import { Main } from '~/components/layouts/main';
import { SimpleEditor } from '~/components/tiptap-templates/simple/simple-editor';

export const Tiptap = () => {
  return (
    <Main fixed className="overflow-y-scroll max-h-[60vh]">
      <SimpleEditor />
    </Main>
  );
};
