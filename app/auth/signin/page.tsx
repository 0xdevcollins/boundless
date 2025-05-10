import AuthTabs from "@/components/auth-tabs";
import { getProviders } from "next-auth/react";

export default async function SignIn() {
	const providers = await getProviders();

	return <AuthTabs providers={providers} />;
}
