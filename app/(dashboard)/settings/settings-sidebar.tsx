"use client";

import {
	BellIcon,
	ShieldIcon,
	UserIcon,
} from "@/components/settings/components/icons";

type SettingsTab = "account" | "security" | "notifications";

interface SettingsSidebarProps {
	activeTab: SettingsTab;
	setActiveTab: (tab: SettingsTab) => void;
}

export function SettingsSidebar({
	activeTab,
	setActiveTab,
}: SettingsSidebarProps) {
	const tabs = [
		{
			id: "account" as SettingsTab,
			label: "Account Settings",
			icon: UserIcon,
			description: "Manage your profile and account details",
		},
		{
			id: "security" as SettingsTab,
			label: "Security Settings",
			icon: ShieldIcon,
			description: "Update your password and security options",
		},
		{
			id: "notifications" as SettingsTab,
			label: "Notification Preferences",
			icon: BellIcon,
			description: "Control how you receive notifications",
		},
	];

	return (
		<div className="w-full md:w-64 shrink-0">
			<h1 className="text-2xl font-bold mb-6">Settings</h1>
			<nav className="space-y-2">
				{tabs.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<button
							type="button"
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-start gap-3 w-full rounded-lg p-3 text-left transition-colors ${
								isActive ? "bg-primary text-white" : "hover:bg-gray-100"
							}`}
						>
							<tab.icon className="h-5 w-5 mt-0.5 shrink-0" />
							<div>
								<div className="font-medium">{tab.label}</div>
								<div
									className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}
								>
									{tab.description}
								</div>
							</div>
						</button>
					);
				})}
			</nav>
		</div>
	);
}
