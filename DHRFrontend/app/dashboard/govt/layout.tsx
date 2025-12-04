"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, AlertTriangle, User, Settings, Menu, X, Bell, Download, FileText, LogOut, ChevronRight, Search } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

// --- CONTEXT IMPORTS ---
import { GovtLanguageProvider, useGovtLanguage } from "./contexts/GovtLanguageContext"
import { LanguageSelector } from "./components/LanguageSelector"

// --- 1. TOP-LEVEL WRAPPER ---
export default function GovtDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <GovtLanguageProvider>
      <GovtDashboardLayoutContent>{children}</GovtDashboardLayoutContent>
    </GovtLanguageProvider>
  )
}

// --- 2. LAYOUT CONTENT COMPONENT ---
function GovtDashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useGovtLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // --- Configuration & Data ---
  const menuItems = [
    { id: "population", label: t('populationOverview'), icon: Users, path: "/dashboard/govt", badge: { text: "Active", color: "bg-green-100 text-green-700 border-green-200" } },
    { id: "surveillance", label: "District View", icon: Activity, path: "/dashboard/govt/disease-surveillance", badge: { text: "12 Alerts", color: "bg-red-100 text-red-700 border-red-200" } },
    { id: "camps", label: t('highRiskCamps'), icon: AlertTriangle, path: "/dashboard/govt/high-risk-camps", badge: { text: "8", color: "bg-amber-100 text-amber-700 border-amber-200" } },
    { id: "records", label: t('healthRecords'), icon: FileText, path: "/dashboard/govt/health-records" },
    { id: "emergency", label: t('emergencyResponse'), icon: AlertTriangle, path: "/dashboard/govt/emergency-response", badge: { text: "LIVE", color: "bg-red-600 text-white animate-pulse" } },
  ]

  const pageConfigs: Record<string, { title: string; subtitle: string; actions: any[] }> = {
    "/dashboard/govt": { 
      title: t('migrantPopulationOverview'), 
      subtitle: t('realTimeHealthMonitoring'), 
      actions: [{ label: t('exportReport'), variant: "primary", icon: Download }] 
    },
    "/dashboard/govt/disease-surveillance": { 
      title: t('diseaseSurveillanceDashboard'), 
      subtitle: t('realTimeMonitoring'), 
      actions: [{ label: t('exportReport'), variant: "primary", icon: Download }] 
    },
    "/dashboard/govt/high-risk-camps": { 
      title: t('highRiskCampMonitoring'), 
      subtitle: t('monitorMigrantCamps'), 
      actions: [{ label: t('exportData'), variant: "primary", icon: Download }, { label: t('generateReport'), variant: "outline", icon: FileText }] 
    },
    "/dashboard/govt/health-records": { 
      title: t('migrantHealthRegistry'), 
      subtitle: t('anonymousHealthRecords'), 
      actions: [{ label: t('exportRecords'), variant: "primary", icon: Download }] 
    },
    "/dashboard/govt/emergency-response": { 
      title: t('emergencyResponse'), 
      subtitle: t('realTimeOutbreakAlerts'), 
      actions: [{ label: t('pdf'), variant: "outline", icon: FileText }, { label: t('excel'), variant: "outline", icon: Download }] 
    },
  }

  const currentConfig = pageConfigs[pathname] || pageConfigs["/dashboard/govt"]
  const isActive = (path: string) => pathname === path

  // --- Sidebar component ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100 shrink-0">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">K</div>
        <div>
          <div className="text-sm font-bold text-gray-900 leading-none">Kerala Health</div>
          <div className="text-xs text-gray-500 mt-1 font-medium">Migrant Monitor</div>
        </div>
      </div>

      {/* Search & Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder') || "Search..."}
            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.path)
                setIsMobileMenuOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive(item.path) 
                  ? "bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive(item.path) ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`} />
              <span className="flex-1 text-left">{item.label}</span>

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.badge.color}`}>
                  {item.badge.text}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-gray-600">
            <User className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Dr. Rajesh Kumar</p>
            <p className="text-xs text-gray-500 truncate">{t('healthOfficer')}</p>
          </div>

          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <div className="w-full"><LanguageSelector /></div>
          <button onClick={() => router.push('/')} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-gray-200">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* --- UPDATED SIDEBAR (desktop + mobile behave same) --- */}
      <aside className={`${isMobileMenuOpen ? "block" : "hidden"} w-72 shrink-0 h-full fixed md:relative z-50 bg-white`}>
        <SidebarContent />
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full">

        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-20 sticky top-0">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                {currentConfig.title}
              </h1>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <span>Dashboard</span>
                <ChevronRight className="h-3 w-3" />
                <span>Government</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-700 font-medium">{currentConfig.title}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-700 uppercase tracking-wide">System Live</span>
            </div>

            <div className="h-6 w-px bg-gray-200 hidden md:block" />

            <div className="flex items-center gap-2">
              {currentConfig.actions.map((action, idx) => (
                <button
                  key={idx}
                  className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    action.variant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </button>
              ))}

              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}
