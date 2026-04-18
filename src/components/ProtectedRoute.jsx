import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAdmin } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                fontSize: '1.2rem',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
    }

    // If route requires admin access
    if (adminOnly) {
        if (!user) {
            // Not logged in - redirect to home
            return <Navigate to="/" replace />
        }
        
        if (!isAdmin()) {
            // Logged in but not admin - show access denied
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem'
                    }}>🔒</div>
                    <h2 style={{ 
                        color: '#1a1a1a', 
                        marginBottom: '1rem',
                        fontSize: '2rem'
                    }}>
                        Access Denied
                    </h2>
                    <p style={{ 
                        color: '#666', 
                        marginBottom: '2rem',
                        fontSize: '1.1rem'
                    }}>
                        You don't have permission to access the admin dashboard.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            padding: '0.875rem 2rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Go Back
                    </button>
                </div>
            )
        }
    } else {
        // Regular protected route - just needs to be logged in
        if (!user) {
            return <Navigate to="/" replace />
        }
    }

    return children
}

export default ProtectedRoute