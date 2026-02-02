import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Analyze CV',
};

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'Analyze CV',
    url: url('/[clientId]/analyze', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/analyze'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Analyze CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
