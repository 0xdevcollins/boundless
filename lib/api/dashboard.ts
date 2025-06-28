import { DashboardOverviewResponse } from './types';
import api from './api';

export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
//   const session = await auth();
//   let config = {};
//   if (session) {
//     config = { headers: { Authorization: `Bearer ${session.user.accessToken}` } };
//   }

  const response: unknown = await api.get('/users/dashboard/overview');
  if (
    response &&
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    typeof (response as { data?: unknown }).data === 'object'
  ) {
    return (response as { data: DashboardOverviewResponse }).data;
  }
  return response as DashboardOverviewResponse;
}
