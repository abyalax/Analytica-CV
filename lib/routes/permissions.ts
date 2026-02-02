// Auto-generated file - do not edit manually
// Generated at: 2026-02-02T13:35:08.192Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/[clientId]/jobs/': ['job_desc:read'],
  '/[clientId]/cv/': ['cv:read'],
  '/[clientId]/chats/': ['chat:read'],
  '/[clientId]/analyze/': ['cv:read'],
  '/backoffice/clients/': [],
  '/backoffice/clients/[clientId]/': ['client:read'],
  '/[clientId]/jobs/[jobId]/update/': ['job_desc:read', 'job_desc:update'],
  '/[clientId]/cv/[cvId]/update/': ['cv:read', 'cv:update'],
  '/[clientId]': [],
  '/[clientId]/jobs': ['job_desc:read'],
  '/:clientId/jobs/': ['job_desc:read'],
  '/[clientId]/cv': ['cv:read'],
  '/:clientId/cv/': ['cv:read'],
  '/[clientId]/chats': ['chat:read'],
  '/:clientId/chats/': ['chat:read'],
  '/[clientId]/analyze': ['cv:read'],
  '/:clientId/analyze/': ['cv:read'],
  '/backoffice': [],
  '/backoffice/clients': [],
  '/backoffice/clients/[clientId]': ['client:read'],
  '/backoffice/clients/:clientId/': ['client:read'],
  '/[clientId]/jobs/[jobId]': ['job_desc:read'],
  '/[clientId]/jobs/[jobId]/update': ['job_desc:read', 'job_desc:update'],
  '/:clientId/jobs/:jobId/update/': ['job_desc:read', 'job_desc:update'],
  '/[clientId]/cv/[cvId]': ['cv:read'],
  '/[clientId]/cv/[cvId]/update': ['cv:read', 'cv:update'],
  '/:clientId/cv/:cvId/update/': ['cv:read', 'cv:update'],
} as const;
