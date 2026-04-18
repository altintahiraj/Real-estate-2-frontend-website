import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AuthModal = ({ isOpen, onClose }) => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const { signIn, signUp } = useAuth()

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (isSignIn) {
            const result = signIn(formData.email, formData.password)
            if (result.success) {
                onClose()
                setFormData({ name: '', email: '', password: '' })
            }
        } else {
            if (!formData.name) {
                setError('Please enter your name')
                return
            }
            const result = signUp(formData.name, formData.email, formData.password)
            if (result.success) {
                onClose()
                setFormData({ name: '', email: '', password: '' })
            }
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const toggleMode = () => {
        setIsSignIn(!isSignIn)
        setError('')
        setFormData({ name: '', email: '', password: '' })
    }

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>
                
                <h2 className="auth-modal-title">
                    {isSignIn ? 'Welcome Back' : 'Join APEX Estates'}
                </h2>
                <p className="auth-modal-subtitle">
                    {isSignIn ? 'Sign in to access your account' : 'Create your account today'}
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isSignIn && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isSignIn}
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {isSignIn ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isSignIn ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={toggleMode} style={{ cursor: 'pointer', color: 'var(--secondary)', fontWeight: 600 }}>
                            {isSignIn ? 'Sign Up' : 'Sign In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthModal