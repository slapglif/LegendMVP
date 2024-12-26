import { Routes, Route } from "react-router-dom"
import DashboardPage from "./pages/Dashboard"
import PropertyManagement from "./pages/PropertyManagement"
import CrewManagement from "./pages/CrewManagement"
import LeadDetailsPage from "./pages/LeadDetails"
import { DashboardNav } from "./components/dashboard-nav"
import { Toaster } from "./components/ui/toaster"

export default function App() {
  return (
    <>
      <DashboardNav />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertyManagement />} />
        <Route path="/crews" element={<CrewManagement />} />
        <Route path="/leads/:id" element={<LeadDetailsPage />} />
      </Routes>
      <Toaster />
    </>
  )
}
