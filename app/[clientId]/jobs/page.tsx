import { Metadata } from 'next';
import { SortOrder } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import { TFilterJobDescription } from '~/data/jobs/jobs.type';
import { getQueryClient } from '~/lib/query/client';
import { url } from '~/lib/utils/converter';
import { JobDescription } from '~/modules/jobs/jobs.type';
import { Component } from './_components';
import { queryGetJobList } from './_hooks/use-get-job-list';

export const metadata: Metadata = {
  title: 'Manage Jobs | Dashboard',
  description: 'Manage Job Descriptions ',
};

export const permissions = [];

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
    title: 'Manage Job Descriptions',
    url: url('/[clientId]/jobs', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/jobs'>;

export default async function Page({ params, searchParams }: Props) {
  const { clientId } = await params;
  const querySearch = await searchParams;
  const breadcrumbs = breadcrumbItems(clientId);

  const _params: TFilterJobDescription = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof JobDescription,
    sort_order: querySearch.order_by as SortOrder,
  };

  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryGetJobList(clientId, _params));

  return (
    <PageScreen title="Manage Job Descriptions" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
