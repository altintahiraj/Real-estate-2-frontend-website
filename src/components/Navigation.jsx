import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import AdminLoginModal from './AdminLoginModal'
import MortgageCalculator from './MortgageCalculator'

const Navigation = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, signOut, isAdmin } = useAuth()

    const handleSignOut = () => {
        signOut()
        setShowUserMenu(false)
        setIsMobileMenuOpen(false)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link to="/" className="logo" onClick={closeMobileMenu}>
                        APEX
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <ul className="nav-links">
                        <li>
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/listings" className="nav-link">
                                Listings
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <button 
                                className="nav-calculator-btn"
                                onClick={() => setIsCalculatorOpen(true)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="3" y1="9" x2="21" y2="9"/>
                                    <line x1="9" y1="21" x2="9" y2="9"/>
                                </svg>
                                Calculator
                            </button>
                        </li>
                    </ul>

                    {/* Desktop Auth */}
                    <div className="nav-auth">
                        {user ? (
                            <div className="user-menu-container">
                                <button 
                                    className="user-button"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <div className="user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                    {isAdmin() && <span className="admin-badge-small">ADMIN</span>}
                                </button>
                                
                                {showUserMenu && (
                                    <div className="user-dropdown">
                                        <div className="user-dropdown-header">
                                            <p className="user-dropdown-name">{user.name}</p>
                                            <p className="user-dropdown-email">{user.email}</p>
                                            {isAdmin() && (
                                                <span className="admin-role-badge">Administrator</span>
                                            )}
                                        </div>
                                        <div className="user-dropdown-divider"></div>
                                        
                                        {isAdmin() && (
                                            <>
                                                <Link 
                                                    to="/admin"
                                                    className="user-dropdown-item admin-dropdown-item"
                                                    onClick={() => setShowUserMenu(false)}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    🏢 Admin Dashboard
                                                </Link>
                                                <div className="user-dropdown-divider"></div>
                                            </>
                                        )}
                                        <div className="user-dropdown-divider"></div>
                                        <button 
                                            className="user-dropdown-item user-dropdown-signout"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button 
                                    className="btn btn-admin btn-nav"
                                    onClick={() => setIsAdminLoginOpen(true)}
                                    title="Admin Login"
                                >
                                    🔐 Admin
                                </button>
                                <button 
                                    className="btn btn-primary btn-nav"
                                    onClick={() => setIsAuthModalOpen(true)}
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                        
                        {/* Mobile Menu Toggle */}
                        <button 
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu open">
                        <div className="mobile-menu-content">
                            <Link 
                                to="/" 
                                onClick={closeMobileMenu}
                                className="mobile-menu-item"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/listings" 
                                onClick={closeMobileMenu}
                                className="mobile-menu-item"
                            >
                                Listings
                            </Link>
                            <Link 
                                to="/about" 
                                onClick={closeMobileMenu}
                                className="mobile-menu-item"
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact" 
                                onClick={closeMobileMenu}
                                className="mobile-menu-item"
                            >
                                Contact
                            </Link>
                            
                            <button
                                onClick={() => {
                                    setIsCalculatorOpen(true)
                                    closeMobileMenu()
                                }}
                                className="mobile-menu-item"
                                style={{ 
                                    background: 'var(--secondary)', 
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    marginTop: '0.5rem'
                                }}
                            >
                                💰 Mortgage Calculator
                            </button>
                            
                            {!user && (
                                <>
                                    <div style={{ 
                                        height: '1px', 
                                        background: 'rgba(0, 0, 0, 0.1)',
                                        margin: '1rem 0'
                                    }} />
                                    <button
                                        onClick={() => {
                                            setIsAdminLoginOpen(true)
                                            closeMobileMenu()
                                        }}
                                        className="mobile-menu-item"
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            marginBottom: '0.5rem'
                                        }}
                                    >
                                        🔐 Admin Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAuthModalOpen(true)
                                            closeMobileMenu()
                                        }}
                                        className="mobile-menu-item"
                                        style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                            
                            {user && (
                                <>
                                    <div style={{ 
                                        height: '1px', 
                                        background: 'rgba(0, 0, 0, 0.1)',
                                        margin: '1rem 0'
                                    }} />
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(212, 165, 116, 0.1)',
                                        borderRadius: '6px'
                                    }}>
                                        <p style={{ 
                                            fontWeight: '600',
                                            marginBottom: '0.3rem',
                                            color: 'var(--text-dark)'
                                        }}>
                                            {user.name}
                                        </p>
                                        <p style={{ 
                                            fontSize: '0.85rem',
                                            color: 'var(--text-light)',
                                            marginBottom: isAdmin() ? '0.5rem' : '0'
                                        }}>
                                            {user.email}
                                        </p>
                                        {isAdmin() && (
                                            <span style={{
                                                display: 'inline-block',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                ADMINISTRATOR
                                            </span>
                                        )}
                                    </div>
                                    
                                    {isAdmin() && (
                                        <Link
                                            to="/admin"
                                            onClick={closeMobileMenu}
                                            className="mobile-menu-item"
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                marginTop: '0.5rem'
                                            }}
                                        >
                                            🏢 Admin Dashboard
                                        </Link>
                                    )}
                                    
                                    <button
                                        onClick={handleSignOut}
                                        className="mobile-menu-item"
                                        style={{
                                            color: '#d32f2f',
                                            border: '2px solid #d32f2f',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            marginTop: '0.5rem'
                                        }}
                                    >
                                        🚪 Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
            
            <AdminLoginModal 
                isOpen={isAdminLoginOpen} 
                onClose={() => setIsAdminLoginOpen(false)} 
            />
            
            <MortgageCalculator 
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
            />
        </>
    )
}

export default Navigation