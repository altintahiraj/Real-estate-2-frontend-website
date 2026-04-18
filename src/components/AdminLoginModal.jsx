import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminLoginModal = ({ isOpen, onClose }) => {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = signIn(formData.email, formData.password)
            
            if (result.success) {
                if (result.isAdmin) {
                    // Successfully logged in as admin
                    onClose()
                    navigate('/admin')
                } else {
                    // Logged in but not admin
                    setError('Access denied. Admin credentials required.')
                }
            } else {
                setError('Invalid credentials. Please try again.')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div 
            className="modal-overlay-luxury" 
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.3s ease'
            }}
        >
            <div 
                className="admin-login-luxury-card" 
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    maxWidth: '500px',
                    width: '90%',
                    padding: '3rem',
                    boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    animation: 'slideUp 0.4s ease'
                }}
            >
                <button 
                    className="modal-close-luxury" 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#999',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#f5f1ed'
                        e.target.style.color = '#1a1a1a'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent'
                        e.target.style.color = '#999'
                    }}
                >
                    ×
                </button>
                
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #d4a574 0%, #b8935f 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        fontSize: '2rem',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)'
                    }}>
                        🔐
                    </div>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        color: '#1a1a1a',
                        fontWeight: '700'
                    }}>
                        Admin Access
                    </h2>
                    <p style={{
                        color: '#666',
                        fontSize: '1rem'
                    }}>
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            background: '#fff5f5',
                            border: '1px solid #feb2b2',
                            color: '#c53030',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#1a1a1a',
                            fontWeight: '500',
                            fontSize: '0.95rem'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="admin@apexestates.com"
                            required
                            autoComplete="email"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontFamily: "'Outfit', sans-serif"
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#1a1a1a',
                            fontWeight: '500',
                            fontSize: '0.95rem'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontFamily: "'Outfit', sans-serif"
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1.125rem',
                            background: 'linear-gradient(135deg, #d4a574 0%, #b8935f 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.05rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.7 : 1,
                            fontFamily: "'Outfit', sans-serif",
                            boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.4)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.3)'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In to Dashboard'}
                    </button>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1.25rem',
                        background: '#f5f1ed',
                        borderRadius: '8px',
                        borderLeft: '4px solid #d4a574'
                    }}>
                        <p style={{ 
                            fontSize: '0.85rem', 
                            color: '#666',
                            marginBottom: '0.75rem',
                            fontWeight: '600'
                        }}>
                            Default Admin Credentials:
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#1a1a1a', marginBottom: '0.3rem' }}>
                            <strong>Email:</strong> gabriel@gmail.com
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#1a1a1a' }}>
                            <strong>Password:</strong> 123
                        </p>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default AdminLoginModal