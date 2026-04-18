import { useState, useEffect } from 'react'
import { useProperties } from '../context/PropertiesContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const { properties, addProperty, updateProperty, deleteProperty } = useProperties()
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    
    const [showForm, setShowForm] = useState(false)
    const [editingProperty, setEditingProperty] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [notification, setNotification] = useState({ show: false, message: '', type: '' })
    
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        image: '',
        description: '',
        tag: 'NEW',
        status: 'For Sale',
        yearBuilt: new Date().getFullYear(),
        type: 'House',
        featured: false,
        lat: '',
        lng: ''
    })

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type })
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' })
        }, 3000)
    }

    // Reset form
    const resetForm = () => {
        setFormData({
            title: '',
            location: '',
            price: '',
            beds: '',
            baths: '',
            sqft: '',
            image: '',
            description: '',
            tag: 'NEW',
            status: 'For Sale',
            yearBuilt: new Date().getFullYear(),
            type: 'House',
            featured: false,
            lat: '',
            lng: ''
        })
        setEditingProperty(null)
        setShowForm(false)
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validation
        if (!formData.title || !formData.location || !formData.price) {
            showNotification('Please fill in all required fields', 'error')
            return
        }
        
        if (editingProperty) {
            updateProperty(editingProperty.id, formData)
            showNotification('Property updated successfully! ✨', 'success')
        } else {
            addProperty(formData)
            showNotification('Property added successfully! 🎉', 'success')
        }
        
        resetForm()
    }

    // Handle edit
    const handleEdit = (property) => {
        setEditingProperty(property)
        setFormData({
            title: property.title,
            location: property.location,
            price: property.price,
            beds: property.beds,
            baths: property.baths,
            sqft: property.sqft,
            image: property.image,
            description: property.description || '',
            tag: property.tag,
            status: property.status || 'For Sale',
            yearBuilt: property.yearBuilt || new Date().getFullYear(),
            type: property.type || 'House',
            featured: property.featured || false,
            lat: property.lat || '',
            lng: property.lng || ''
        })
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Handle delete
    const handleDelete = (property) => {
        if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
            deleteProperty(property.id)
            showNotification('Property deleted successfully! 🗑️', 'success')
        }
    }

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            signOut()
            navigate('/')
        }
    }

    // Filter and sort properties
    const getFilteredProperties = () => {
        let filtered = properties.filter(property => {
            const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 property.location.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = filterStatus === 'all' || property.status === filterStatus
            const matchesType = filterType === 'all' || property.type === filterType
            return matchesSearch && matchesStatus && matchesType
        })

        // Sort properties
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => b.id - a.id)
                break
            case 'oldest':
                filtered.sort((a, b) => a.id - b.id)
                break
            case 'price-high':
                filtered.sort((a, b) => b.priceNum - a.priceNum)
                break
            case 'price-low':
                filtered.sort((a, b) => a.priceNum - b.priceNum)
                break
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title))
                break
            default:
                break
        }

        return filtered
    }

    const filteredProperties = getFilteredProperties()

    // Calculate statistics
    const stats = {
        total: properties.length,
        featured: properties.filter(p => p.featured).length,
        forSale: properties.filter(p => p.status === 'For Sale').length,
        sold: properties.filter(p => p.status === 'Sold').length,
        pending: properties.filter(p => p.status === 'Pending').length,
        totalValue: properties.reduce((sum, p) => sum + (p.priceNum || 0), 0)
    }

    return (
        <>
            <div style={{ height: '85px' }}></div>
            
            {/* Notification */}
            {notification.show && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    right: '2rem',
                    zIndex: 10000,
                    background: notification.type === 'error' ? '#fff5f5' : '#f0fdf4',
                    border: `1px solid ${notification.type === 'error' ? '#feb2b2' : '#86efac'}`,
                    color: notification.type === 'error' ? '#c53030' : '#166534',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    animation: 'slideInRight 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontWeight: '500'
                }}>
                    <span>{notification.type === 'error' ? '❌' : '✅'}</span>
                    {notification.message}
                </div>
            )}

            <div style={{ 
                maxWidth: '1600px', 
                margin: '0 auto', 
                padding: '2rem',
                fontFamily: "'Outfit', sans-serif"
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    padding: '3rem',
                    borderRadius: '16px',
                    marginBottom: '3rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '400px',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                        <div>
                            <h1 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '2.5rem',
                                marginBottom: '0.5rem',
                                fontWeight: '700'
                            }}>
                                Admin Dashboard
                            </h1>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                                Welcome back, {user?.name} 👋
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                padding: '0.875rem 1.75rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                                e.target.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                                e.target.style.transform = 'translateY(0)'
                            }}
                        >
                             Logout
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                            {stats.total}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.95rem' }}>Total Properties</div>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d4a574', marginBottom: '0.25rem' }}>
                            {stats.featured}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.95rem' }}>Featured</div>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.25rem' }}>
                            {stats.forSale}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.95rem' }}>For Sale</div>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                            ${(stats.totalValue / 1000000).toFixed(1)}M
                        </div>
                        <div style={{ color: '#666', fontSize: '0.95rem' }}>Total Value</div>
                    </div>
                </div>

                {/* Add Property Button */}
                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            background: 'linear-gradient(135deg, #d4a574 0%, #b8935f 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '1.125rem 2.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1.05rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.3)'
                        }}
                    >
                        {showForm ? '➖ Close Form' : '➕ Add New Property'}
                    </button>
                </div>

                {/* Property Form */}
                {showForm && (
                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                        marginBottom: '3rem',
                        border: '1px solid #f0f0f0'
                    }}>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '2rem',
                            marginBottom: '2rem',
                            color: '#1a1a1a',
                            fontWeight: '700'
                        }}>
                            {editingProperty ? '✏️ Edit Property' : '➕ Add New Property'}
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Property Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Modern Hillside Villa"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Beverly Hills, CA"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Price *
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="$2,850,000"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Property Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="House">House</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Estate">Estate</option>
                                        <option value="Townhouse">Townhouse</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Bedrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="beds"
                                        value={formData.beds}
                                        onChange={handleInputChange}
                                        placeholder="5"
                                        min="1"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="baths"
                                        value={formData.baths}
                                        onChange={handleInputChange}
                                        placeholder="4"
                                        min="1"
                                        step="0.5"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Square Feet
                                    </label>
                                    <input
                                        type="text"
                                        name="sqft"
                                        value={formData.sqft}
                                        onChange={handleInputChange}
                                        placeholder="4,500"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Year Built
                                    </label>
                                    <input
                                        type="number"
                                        name="yearBuilt"
                                        value={formData.yearBuilt}
                                        onChange={handleInputChange}
                                        placeholder="2023"
                                        min="1800"
                                        max="2026"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Tag
                                    </label>
                                    <select
                                        name="tag"
                                        value={formData.tag}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="NEW">NEW</option>
                                        <option value="FEATURED">FEATURED</option>
                                        <option value="LUXURY">LUXURY</option>
                                        <option value="EXCLUSIVE">EXCLUSIVE</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    >
                                        <option value="For Sale">For Sale</option>
                                        <option value="Sold">Sold</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Off Market">Off Market</option>
                                    </select>
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://images.unsplash.com/..."
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        name="lat"
                                        value={formData.lat}
                                        onChange={handleInputChange}
                                        placeholder="34.0736"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="lng"
                                        value={formData.lng}
                                        onChange={handleInputChange}
                                        placeholder="-118.4004"
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#1a1a1a' }}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Enter detailed property description..."
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease',
                                            fontFamily: "'Outfit', sans-serif",
                                            resize: 'vertical'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>

                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        userSelect: 'none'
                                    }}>
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={formData.featured}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span style={{ fontWeight: '500', color: '#1a1a1a' }}>
                                            ⭐ Mark as Featured Property (shown on homepage)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button 
                                    type="button" 
                                    onClick={resetForm}
                                    style={{
                                        padding: '1rem 2rem',
                                        background: 'transparent',
                                        color: '#666',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = '#999'
                                        e.target.style.color = '#1a1a1a'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = '#e2e8f0'
                                        e.target.style.color = '#666'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    style={{
                                        padding: '1rem 2rem',
                                        background: 'linear-gradient(135deg, #d4a574 0%, #b8935f 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)'
                                        e.target.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.4)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)'
                                        e.target.style.boxShadow = '0 4px 15px rgba(212, 165, 116, 0.3)'
                                    }}
                                >
                                    {editingProperty ? '💾 Update Property' : '➕ Add Property'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Filters */}
                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    marginBottom: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    <input
                        type="text"
                        placeholder="🔍 Search by title or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.875rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            padding: '0.875rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    >
                        <option value="all">All Status</option>
                        <option value="For Sale">For Sale</option>
                        <option value="Sold">Sold</option>
                        <option value="Pending">Pending</option>
                        <option value="Off Market">Off Market</option>
                    </select>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                            padding: '0.875rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    >
                        <option value="all">All Types</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Condo">Condo</option>
                        <option value="Estate">Estate</option>
                        <option value="Townhouse">Townhouse</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.875rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="title">Title: A to Z</option>
                    </select>
                </div>

                {/* Results Count */}
                <div style={{ marginBottom: '1.5rem', color: '#666', fontSize: '1rem' }}>
                    Showing <strong style={{ color: '#1a1a1a' }}>{filteredProperties.length}</strong> of{' '}
                    <strong style={{ color: '#1a1a1a' }}>{properties.length}</strong> properties
                </div>

                {/* Properties Table */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden'
                }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                            width: '100%', 
                            borderCollapse: 'collapse',
                            fontSize: '0.95rem'
                        }}>
                            <thead>
                                <tr style={{ background: '#f5f1ed', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Image</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Title</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Location</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Type</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Price</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Beds/Baths</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Sq Ft</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Year</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Status</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontWeight: '600', color: '#1a1a1a' }}>Tag</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '600', color: '#1a1a1a' }}>Featured</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '600', color: '#1a1a1a' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProperties.map((property, index) => (
                                    <tr 
                                        key={property.id}
                                        style={{ 
                                            borderBottom: '1px solid #f0f0f0',
                                            background: index % 2 === 0 ? 'white' : '#fafafa',
                                            transition: 'background 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f1ed'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafafa'}
                                    >
                                        <td style={{ padding: '1rem' }}>
                                            <img 
                                                src={property.image} 
                                                alt={property.title}
                                                style={{
                                                    width: '80px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '6px'
                                                }}
                                                loading="lazy"
                                            />
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '500', color: '#1a1a1a' }}>{property.title}</td>
                                        <td style={{ padding: '1rem', color: '#666' }}>{property.location}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: '#f0f0f0',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                color: '#666',
                                                fontWeight: '500'
                                            }}>
                                                {property.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '600', color: '#d4a574', fontFamily: "'Playfair Display', serif" }}>
                                            {property.price}
                                        </td>
                                        <td style={{ padding: '1rem', color: '#666' }}>{property.beds}bd / {property.baths}ba</td>
                                        <td style={{ padding: '1rem', color: '#666' }}>{property.sqft}</td>
                                        <td style={{ padding: '1rem', color: '#666' }}>{property.yearBuilt}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: property.status === 'For Sale' ? '#dcfce7' : property.status === 'Sold' ? '#fee2e2' : '#fef3c7',
                                                color: property.status === 'For Sale' ? '#166534' : property.status === 'Sold' ? '#991b1b' : '#92400e',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500'
                                            }}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                fontWeight: '500'
                                            }}>
                                                {property.tag}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            {property.featured ? (
                                                <span style={{ fontSize: '1.5rem' }}>⭐</span>
                                            ) : (
                                                <span style={{ color: '#ddd' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => handleEdit(property)}
                                                    title="Edit Property"
                                                    style={{
                                                        padding: '0.5rem 0.75rem',
                                                        background: '#d4a574',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '1rem',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = '#b8935f'}
                                                    onMouseLeave={(e) => e.target.style.background = '#d4a574'}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(property)}
                                                    title="Delete Property"
                                                    style={{
                                                        padding: '0.5rem 0.75rem',
                                                        background: '#dc2626',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '1rem',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = '#991b1b'}
                                                    onMouseLeave={(e) => e.target.style.background = '#dc2626'}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredProperties.length === 0 && (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '4rem 2rem',
                                color: '#666'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
                                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
                                    No properties found
                                </p>
                                <p>Try adjusting your search filters</p>
                                {(searchTerm || filterStatus !== 'all' || filterType !== 'all') && (
                                    <button 
                                        onClick={() => {
                                            setSearchTerm('')
                                            setFilterStatus('all')
                                            setFilterType('all')
                                        }}
                                        style={{
                                            marginTop: '1.5rem',
                                            padding: '0.75rem 1.5rem',
                                            background: 'linear-gradient(135deg, #d4a574 0%, #b8935f 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    )
}

export default AdminPage