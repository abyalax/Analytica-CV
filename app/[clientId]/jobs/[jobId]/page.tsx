import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

const breadcrumbItems = (clientId: string, jobId: string) => [
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
    title: 'Manage Job Descriptions',
    url: url('/[clientId]/jobs', { clientId }),
    active: false,
  },
  {
    title: 'Job Description',
    url: url('/[clientId]/jobs/[jobId]', { clientId, jobId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/jobs/[jobId]'>;

export default async function Page({ params }: Props) {
  const { jobId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, jobId);

  return (
    <PageScreen title="Detail Job Description" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
