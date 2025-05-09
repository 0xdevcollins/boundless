import type { ActiveProject, ContributionStats, PastProject, UserComment } from '@/types/contributions';

export async function fetchContributionStats(): Promise<ContributionStats> {
  const response = await fetch('/api/user/contributions');

  if (!response.ok) {
    throw new Error('Failed to fetch contribution statistics');
  }

  return response.json();
}

export async function fetchActiveProjects(category = 'all'): Promise<ActiveProject[]> {
  const url = new URL('/api/user/votes', window.location.origin);
  url.searchParams.append('status', 'active');
  if (category !== 'all') {
    url.searchParams.append('category', category);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch active projects');
  }

  return response.json();
}

export async function fetchPastProjects(category = 'all'): Promise<PastProject[]> {
  const url = new URL('/api/user/votes', window.location.origin);
  url.searchParams.append('status', 'past');
  if (category !== 'all') {
    url.searchParams.append('category', category);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch past projects');
  }

  return response.json();
}

export async function fetchUserComments(search = ''): Promise<UserComment[]> {
  const url = new URL('/api/user/comments', window.location.origin);
  if (search) {
    url.searchParams.append('search', search);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch user comments');
  }

  return response.json();
}

export async function editComment(id: string, content: string): Promise<UserComment> {
  const response = await fetch('/api/user/comments', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, content }),
  });

  if (!response.ok) {
    throw new Error('Failed to edit comment');
  }

  return response.json();
}

export async function deleteComment(id: string): Promise<{ success: boolean }> {
  const url = new URL('/api/user/comments', window.location.origin);
  url.searchParams.append('id', id);

  const response = await fetch(url.toString(), {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }

  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('/api/projects');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const projects: { category: string }[] = await response.json();

  // Extract unique categories
  const categories = [...new Set(projects.map((project) => project.category))];
  return categories;
}
