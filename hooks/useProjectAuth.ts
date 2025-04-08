import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useUserStore } from '@/store/userStore';

interface UseProjectAuthProps {
  projectId: string;
  projectUserId: string;
  teamMembers: any[];
  redirectTo?: string;
}

export function useProjectAuth({
  projectId,
  projectUserId,
  teamMembers,
  redirectTo = '/auth/login',
}: UseProjectAuthProps) {
  const router = useRouter();
  const { user, fetchUserProfile, isProjectOwner, isProjectTeamMember, isLoading } = useUserStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          await fetchUserProfile();
        }
        
        // After fetching, re-check if we have a user
        const currentUser = useUserStore.getState().user;
        
        if (!currentUser) {
          setIsAuthorized(false);
          setIsOwner(false);
          setIsTeamMember(false);
          setAuthChecked(true);
          return;
        }
        
        // Check if user is owner or team member
        const ownerStatus = isProjectOwner(projectUserId);
        const teamMemberStatus = isProjectTeamMember(projectId, teamMembers);
        
        setIsOwner(ownerStatus);
        setIsTeamMember(teamMemberStatus);
        setIsAuthorized(ownerStatus || teamMemberStatus);
        setAuthChecked(true);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthorized(false);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [projectId, projectUserId, teamMembers, fetchUserProfile, isProjectOwner, isProjectTeamMember, user]);

  const requireAuth = (callback?: () => void) => {
    if (!user) {
      // Store the current URL to redirect back after login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      }
      
      toast.error('Please login to continue');
      router.push(redirectTo);
      return false;
    }
    
    if (callback) {
      callback();
    }
    
    return true;
  };

  return {
    isAuthorized,
    isOwner,
    isTeamMember, 
    isLoading: isLoading || !authChecked,
    requireAuth,
    user
  };
}