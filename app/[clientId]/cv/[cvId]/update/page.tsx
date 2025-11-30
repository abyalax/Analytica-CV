import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { url } from '~/lib/utils/converter';
import { queryGetCV } from '../../_hooks/use-get-cv';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CLIENT.UPDATE_CV];

const breadcrumbItems = (clientId: string, cvId: string) => [
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
    title: 'Manage CVs',
    url: url('/[clientId]/cv', { clientId }),
    active: false,
  },
  {
    title: 'CV',
    url: url('/[clientId]/cv/[cvId]', { clientId, cvId }),
    active: false,
  },
  {
    title: 'Update',
    url: url('/[clientId]/cv/[cvId]/update', { clientId, cvId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/cv/[cvId]/update'>;

export default async function Page({ params }: Props) {
  const queryClient = getQueryClient();
  const { cvId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, cvId);

  void queryClient.prefetchQuery(queryGetCV(clientId, cvId));

  return (
    <PageScreen title="Update CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
