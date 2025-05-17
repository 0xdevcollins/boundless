"use client";
import { isAdmin } from "@/lib/actions/admin-service";
import { useAdminStore } from "@/store/adminStore";
import { useEffect } from "react";

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
