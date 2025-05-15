"use client"
import { useEffect } from "react";
import { isAdmin } from "@/lib/actions/admin-service";
import { useAdminStore } from "@/store/adminStore";

export const useIsAdmin = () => {
    const { isAdmin: adminStatus, setAdminStatus } = useAdminStore();

    useEffect(() => {
        const fetchAdminStatus = async () => {
            const status = await isAdmin();
            setAdminStatus(status);
        };

        fetchAdminStatus();
    }, [setAdminStatus]);

    return adminStatus;
};