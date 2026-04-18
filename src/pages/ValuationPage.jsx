import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ValuationPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        address: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        yearBuilt: '',
        name: '',
        email: '',
        phone: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you! We will contact you within 24 hours with your property valuation.')
        navigate('/contact')
    }

    return (
        <>
            <div style={{ height: '85px' }}></div>
            
            <section className="service-hero">
                <h1 className="service-hero-title">Property Valuation</h1>
                <p className="service-hero-subtitle">
                    Discover your property's true market value with expert analysis
                </p>
            </section>

            <div className="service-content">
                <div className="service-section">
                    <h2 className="service-section-title">Accurate Market Valuation</h2>
                    <p className="service-section-text">
                        Understanding your property's current market value is essential whether you're considering selling, 
                        refinancing, or simply want to know your investment's worth. Our comprehensive valuation service 
                        combines advanced market analysis, recent comparable sales data, and 30 years of local market 
                        expertise to provide you with an accurate assessment of your property's value.
                    </p>
                </div>

                <div className="service-features">
                    <div className="service-feature-card">
                        <div className="service-feature-icon">📊</div>
                        <h3 className="service-feature-title">Comparative Market Analysis</h3>
                        <p className="service-feature-text">
                            Detailed analysis of recent sales of similar properties in your area to establish accurate 
                            market value benchmarks.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🏘️</div>
                        <h3 className="service-feature-title">Neighborhood Trends</h3>
                        <p className="service-feature-text">
                            Insights into local market conditions, development projects, and factors affecting property 
                            values in your specific location.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🔍</div>
                        <h3 className="service-feature-title">Property Inspection</h3>
                        <p className="service-feature-text">
                            On-site evaluation of your property's condition, upgrades, and unique features that impact 
                            its market value.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📈</div>
                        <h3 className="service-feature-title">Market Forecast</h3>
                        <p className="service-feature-text">
                            Forward-looking analysis helping you understand potential future value trends and optimal 
                            timing for selling.
                        </p>
                    </div>
                </div>

                {/* Valuation Request Form */}
                <div className="service-section" style={{ 
                    background: 'white', 
                    padding: '3rem', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    marginTop: '3rem'
                }}>
                    <h2 className="service-section-title" style={{ textAlign: 'center' }}>
                        Request Your Free Valuation
                    </h2>
                    <p className="service-section-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        Fill out the form below and receive a detailed property valuation within 24 hours
                    </p>
                    
                    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">Property Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-input"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="123 Main Street, City, State"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Property Type *</label>
                                <select
                                    name="propertyType"
                                    className="form-input"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Single Family">Single Family Home</option>
                                    <option value="Condo">Condominium</option>
                                    <option value="Townhouse">Townhouse</option>
                                    <option value="Multi-Family">Multi-Family</option>
                                    <option value="Land">Land</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bedrooms</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    className="form-input"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    min="1"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bathrooms</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    className="form-input"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    min="1"
                                    step="0.5"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Square Feet</label>
                                <input
                                    type="number"
                                    name="sqft"
                                    className="form-input"
                                    value={formData.sqft}
                                    onChange={handleChange}
                                    min="500"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Year Built</label>
                                <input
                                    type="number"
                                    name="yearBuilt"
                                    className="form-input"
                                    value={formData.yearBuilt}
                                    onChange={handleChange}
                                    min="1800"
                                    max="2026"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                            Get Free Valuation
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ValuationPage