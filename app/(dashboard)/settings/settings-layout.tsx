"use client"

import { useState } from "react"
import { AccountSettings } from "./account-settings"
import { SecuritySettings } from "./security-settings"
import { NotificationSettings } from "./notification-settings"
import { SettingsSidebar } from "./settings-sidebar"


type SettingsTab = "account" | "security" | "notifications"

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account")

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 space-y-6">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </div>
  )
}

