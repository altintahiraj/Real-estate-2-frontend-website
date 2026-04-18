import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProperties } from '../context/PropertiesContext'
import PropertyMap from '../components/PropertyMap'
import SearchFilter from '../components/SearchFilter'

const ListingsPage = () => {
    const navigate = useNavigate()
    const { properties } = useProperties()

    const [filteredProperties, setFilteredProperties] = useState(properties)

    useEffect(() => {
        setFilteredProperties(properties)
    }, [properties])

    const handleFilterChange = (filters) => {
        let filtered = [...properties]

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchLower) ||
                property.location.toLowerCase().includes(searchLower)
            )
        }

        // Location filter
        if (filters.location) {
            filtered = filtered.filter(property =>
                property.location.includes(filters.location)
            )
        }

        // Min price filter
        if (filters.minPrice) {
            filtered = filtered.filter(property =>
                property.priceNum >= parseInt(filters.minPrice)
            )
        }

        // Max price filter
        if (filters.maxPrice) {
            filtered = filtered.filter(property =>
                property.priceNum <= parseInt(filters.maxPrice)
            )
        }

        // Beds filter
        if (filters.beds) {
            filtered = filtered.filter(property =>
                property.beds >= parseInt(filters.beds)
            )
        }

        // Tag filter
        if (filters.tag) {
            filtered = filtered.filter(property =>
                property.tag === filters.tag
            )
        }

        setFilteredProperties(filtered)
    }

    return (
        <>
            <div style={{ height: '85px' }}></div>
            <section className="section">
                <h2 className="section-title">Luxury Property Listings</h2>
                <p className="section-subtitle">Explore our complete collection of premium real estate</p>
                
                {/* Search Filter and Map Side by Side */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '2rem',
                    marginBottom: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Left - Search and Filter */}
                    <div>
                        <SearchFilter onFilterChange={handleFilterChange} />
                    </div>

                    {/* Right - Interactive Map */}
                    <div className="map-container" style={{ 
                        height: '500px',
                        position: 'sticky',
                        top: '100px'
                    }}>
                        <PropertyMap properties={filteredProperties} />
                    </div>
                </div>

                {/* Results Count */}
                <div className="results-count">
                    Showing <strong>{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'}
                </div>

                {/* Property Cards Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="property-grid">
                        {filteredProperties.map((property) => (
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
                                        <span className="feature">📐 {property.sqft} sqft</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No properties found</h3>
                        <p>Try adjusting your search filters to see more results</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default ListingsPage