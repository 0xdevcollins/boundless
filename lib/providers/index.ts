// Main exports
export {
  OrganizationProvider,
  useOrganization,
  OrganizationContext,
} from './OrganizationProvider';

// Hook exports
export {
  useActiveOrganization,
  useOrganizations,
  useOrganizationLoading,
  useOrganizationErrors,
  useOrganizationManagement,
  useOrganizationUtils,
  useOrganizationRefresh,
  useOrganizationSwitching,
  useOrganizationStats,
  useOrganizationProfileCompletion,
  useOrganizationPermissions,
  useOrganizationById,
  default as useOrganizationHook,
} from './useOrganization';

// Type exports
export type {
  OrganizationSummary,
  UserProfileResponse,
  OrganizationContextValue,
  OrganizationProviderProps,
  OrganizationChangeEvent,
  OrganizationStats,
  OrganizationFormData,
  OrganizationInviteData,
  OrganizationMember,
  OrganizationActivity,
  OrganizationNotificationPreferences,
  OrganizationSettings,
  OrganizationSearchFilters,
  OrganizationPagination,
  OrganizationApiResponse,
  OrganizationContextState,
  OrganizationContextActions,
} from './organization-types';

// Utility exports
export {
  organizationToSummary,
  isOrganizationComplete,
  getOrganizationCompletionPercentage,
  getOrganizationMissingFields,
  isUserOwner,
  isUserMember,
  canUserManage,
  getUserRole,
  hasPendingInvites,
  getOrganizationStats,
  sortOrganizationsByName,
  sortOrganizationsByCompletion,
  sortOrganizationsByMemberCount,
  filterOrganizationsByCompletion,
  filterOrganizationsByRole,
  searchOrganizations,
  getOrganizationDisplayName,
  getOrganizationAvatar,
  getOrganizationDescription,
  // isOrganizationActive, // deprecated export; use isOrganizationComplete or status helpers
  getOrganizationAge,
  isNewOrganization,
  getOrganizationActivityLevel,
  formatMemberCount,
  formatHackathonCount,
  formatGrantCount,
  getOrganizationStatusBadge,
  getOrganizationRoleBadge,
  validateOrganizationData,
  sanitizeOrganizationData,
  getOrganizationStorageKey,
  getOrganizationCacheKey,
  isOrganizationDataCached,
  cacheOrganizationData,
  getCachedOrganizationData,
  clearOrganizationCache,
  getOrganizationBreadcrumb,
  getOrganizationSlug,
  isOrganizationNameAvailable,
  generateOrganizationSuggestions,
} from './organization-utils';

// Example component exports
export {
  OrganizationSwitcher,
  OrganizationSwitcherWithIcons,
  OrganizationSwitcherDropdown,
} from './examples/OrganizationSwitcher';

export { OrganizationDashboard } from './examples/OrganizationDashboard';

export {
  OrganizationForm,
  OrganizationInviteForm,
} from './examples/OrganizationForm';

// ExampleUsage not included; remove exports to avoid type errors
