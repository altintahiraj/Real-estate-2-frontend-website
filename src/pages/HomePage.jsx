import { useNavigate } from 'react-router-dom'
import { useProperties } from '../context/PropertiesContext'

const HomePage = () => {
    const navigate = useNavigate()
    const { getFeaturedProperties } = useProperties()

    const featuredProperties = getFeaturedProperties()

    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Discover Your Dream Property</h1>
                    <p className="hero-subtitle">Luxury real estate tailored to your lifestyle</p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/listings')}>
                            Explore Properties
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/contact')}>
                            Get in Touch
                        </button>
                    </div>
                </div>
            </section>

            <section className="section">
                <h2 className="section-title">Featured Properties</h2>
                <p className="section-subtitle">Handpicked luxury homes from our exclusive collection</p>
                
                <div className="property-grid">
                    {featuredProperties.map((property) => (
                        <div 
                            className="property-card" 
                            key={property.id}
                            onClick={() => navigate(`/property/${property.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="property-image" style={{ 
                                backgroundImage: `url(${property.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <span className="property-tag">{property.tag}</span>
                            </div>
                            <div className="property-info">
                                <div className="property-price">{property.price}</div>
                                <h3 className="property-title">{property.title}</h3>
                                <p className="property-location">📍 {property.location}</p>
                                <div className="property-features">
                                    <span className="feature">🛏️ {property.beds} Beds</span>
                                    <span className="feature">🚿 {property.baths} Baths</span>
                                    <span className="feature">📏 {property.sqft} sqft</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default HomePage