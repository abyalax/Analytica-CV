import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Manage CVs | Dashboard',
  description: 'Manage CV, ',
  keywords: 'cv, ats, etc',
};

export const permissions = [PERMISSIONS.CLIENT.READ_CV];
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'Chats Candidate',
    url: url('/[clientId]/chats', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/chats'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Chat Candidates" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
