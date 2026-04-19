import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PropertiesProvider } from './context/PropertiesContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PropertyDetail from './pages/PropertyDetail'
import BuyPropertyPage from './pages/BuyPropertyPage'
import SellPropertyPage from './pages/SellPropertyPage'
import ValuationPage from './pages/ValuationPage'
import InvestmentPage from './pages/InvestmentPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <AuthProvider>
      <PropertiesProvider>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/services/buy" element={<BuyPropertyPage />} />
            <Route path="/services/sell" element={<SellPropertyPage />} />
            <Route path="/services/valuation" element={<ValuationPage />} />
            <Route path="/services/investment" element={<InvestmentPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </PropertiesProvider>
    </AuthProvider>
  )
}

export default App