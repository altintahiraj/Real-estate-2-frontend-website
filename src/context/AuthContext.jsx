import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Admin credentials (in production, this should be on backend)
const ADMIN_CREDENTIALS = {
    email: 'gabriel@gmail.com',
    password: '123',
    name: 'Gabriel',
    role: 'admin'
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing user in localStorage
        const savedUser = localStorage.getItem('apexUser')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const signIn = (email, password) => {
        // Check if admin credentials
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const adminUser = {
                email: ADMIN_CREDENTIALS.email,
                name: ADMIN_CREDENTIALS.name,
                id: 'admin-001',
                role: 'admin',
                isAdmin: true
            }
            setUser(adminUser)
            localStorage.setItem('apexUser', JSON.stringify(adminUser))
            return { success: true, message: 'Admin login successful!', isAdmin: true }
        }
        
        // Regular user login (simulate sign in)
        const userData = {
            email,
            name: email.split('@')[0],
            id: Date.now(),
            role: 'user',
            isAdmin: false
        }
        setUser(userData)
        localStorage.setItem('apexUser', JSON.stringify(userData))
        return { success: true, message: 'Login successful!', isAdmin: false }
    }

    const signUp = (name, email, password) => {
        // Regular user signup
        const userData = {
            email,
            name,
            id: Date.now(),
            role: 'user',
            isAdmin: false
        }
        setUser(userData)
        localStorage.setItem('apexUser', JSON.stringify(userData))
        return { success: true, message: 'Account created successfully!' }
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('apexUser')
    }

    const isAdmin = () => {
        return user?.role === 'admin' || user?.isAdmin === true
    }

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}