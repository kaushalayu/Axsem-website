import { Routes, Route, Navigate } from "react-router-dom"
import PartnerDashboard, {
  DashboardPage,
  ProfilePage,
  ClientsPage,
  EarningsPage,
  DocumentsPage,
  TicketsPage,
  SettingsPage
} from "./PartnerDashboard"

export default function PartnerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PartnerDashboard />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="commissions" element={<EarningsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
