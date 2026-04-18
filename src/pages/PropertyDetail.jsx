import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useProperties } from '../context/PropertiesContext'

const PropertyDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getPropertyById } = useProperties()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Get property from context
    const property = getPropertyById(id)

    if (!property) {
        return (
            <div style={{ padding: '10rem 2rem', textAlign: 'center' }}>
                <h2>Property Not Found</h2>
                <button onClick={() => navigate('/listings')} className="btn btn-primary">
                    Back to Listings
                </button>
            </div>
        )
    }

    const nextImage = () => {
        const images = property.images || [property.image]
        setCurrentImageIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = () => {
        const images = property.images || [property.image]
        setCurrentImageIndex(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        )
    }

    const propertyImages = property.images || [property.image]

    return (
        <>
            <div style={{ height: '85px' }}></div>

            <section className="section" style={{ paddingTop: '2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    
                    {/* Back Button */}
                    <button 
                        onClick={() => navigate('/listings')}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            fontSize: '1rem',
                            color: '#666',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#d4a574'}
                        onMouseLeave={(e) => e.target.style.color = '#666'}
                    >
                        ← Back to Listings
                    </button>

                    {/* Image Carousel */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '600px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '3rem',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${propertyImages[currentImageIndex]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'background-image 0.3s ease'
                        }}></div>

                        <span className="property-tag" style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            fontSize: '1rem',
                            padding: '0.7rem 1.5rem'
                        }}>
                            {property.tag}
                        </span>

                        {/* Prev Button */}
                        <button
                            onClick={prevImage}
                            style={{
                                position: 'absolute',
                                left: '2rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'white'
                                e.target.style.transform = 'translateY(-50%) scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.9)'
                                e.target.style.transform = 'translateY(-50%) scale(1)'
                            }}
                        >
                            ‹
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            style={{
                                position: 'absolute',
                                right: '2rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'white'
                                e.target.style.transform = 'translateY(-50%) scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.9)'
                                e.target.style.transform = 'translateY(-50%) scale(1)'
                            }}
                        >
                            ›
                        </button>

                        {/* Image Counter */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem'
                        }}>
                            {currentImageIndex + 1} / {propertyImages.length}
                        </div>

                        {/* Dots */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            right: '2rem',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            {propertyImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background:
                                            index === currentImageIndex
                                                ? 'white'
                                                : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* MAIN LAYOUT */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: '3rem',
                        marginBottom: '4rem'
                    }}>
                        
                        {/* LEFT COLUMN */}
                        <div>
                            <h1 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                color: '#1a1a1a'
                            }}>
                                {property.title}
                            </h1>

                            <p style={{
                                fontSize: '1.2rem',
                                color: '#666',
                                marginBottom: '2rem'
                            }}>
                                📍 {property.address}
                            </p>

                            {/* Stats */}
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                paddingBottom: '2rem',
                                borderBottom: '1px solid #eee',
                                marginBottom: '2rem'
                            }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600' }}>
                                        {property.beds}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                        Bedrooms
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600' }}>
                                        {property.baths}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                        Bathrooms
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600' }}>
                                        {property.sqft}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                        Sq Ft
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600' }}>
                                        {property.yearBuilt}
                                    </div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                        Year Built
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '3rem' }}>
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '1rem',
                                    fontWeight: '600'
                                }}>
                                    About This Property
                                </h2>
                                <p style={{
                                    lineHeight: '1.8',
                                    color: '#666',
                                    fontSize: '1.05rem'
                                }}>
                                    {property.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div>
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600'
                                }}>
                                    Features & Amenities
                                </h2>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '1rem'
                                }}>
                                    {property.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.8rem',
                                                padding: '1rem',
                                                background: '#f5f1ed',
                                                borderRadius: '6px'
                                            }}
                                        >
                                            <span style={{ color: '#d4a574', fontSize: '1.2rem' }}>✓</span>
                                            <span style={{ color: '#333' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                            <div style={{
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '12px',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '2.5rem',
                                    color: '#d4a574',
                                    fontWeight: '700',
                                    marginBottom: '2rem'
                                }}>
                                    {property.price}
                                </div>

                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                                    Interested in this property?
                                </h3>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginBottom: '1rem' }}
                                >
                                    Contact Agent
                                </button>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className="btn btn-secondary"
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        color: '#1a1a1a',
                                        border: '2px solid #1a1a1a'
                                    }}
                                >
                                    Schedule Tour
                                </button>

                                <div style={{
                                    marginTop: '2rem',
                                    paddingTop: '2rem',
                                    borderTop: '1px solid #eee'
                                }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Contact Information</h4>
                                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>📞 (310) 555-APEX</p>
                                    <p style={{ color: '#666' }}>✉️ info@apexestates.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default PropertyDetail
