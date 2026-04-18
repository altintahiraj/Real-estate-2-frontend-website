import { useState } from 'react'

const SearchFilter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        search: '',
        minPrice: '',
        maxPrice: '',
        beds: '',
        location: '',
        tag: ''
    })
    const [isExpanded, setIsExpanded] = useState(false)

    const handleChange = (e) => {
        const newFilters = {
            ...filters,
            [e.target.name]: e.target.value
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleReset = () => {
        const resetFilters = {
            search: '',
            minPrice: '',
            maxPrice: '',
            beds: '',
            location: '',
            tag: ''
        }
        setFilters(resetFilters)
        onFilterChange(resetFilters)
    }

    const activeFiltersCount = Object.values(filters).filter(v => v !== '').length

    return (
        <div className="search-filter-luxury">
            {/* Hero Search Bar */}
            <div className="search-hero">
                <div className="search-hero-content">
                    <h3 className="search-hero-title">Find Your Sanctuary</h3>
                    <div className="search-hero-bar">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by property name, location, or lifestyle..."
                            className="search-hero-input"
                            value={filters.search}
                            onChange={handleChange}
                        />
                        <button 
                            className="search-filter-toggle"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span className="filter-icon">⚡</span>
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="filter-badge">{activeFiltersCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filters - Expandable */}
            <div className={`filters-advanced ${isExpanded ? 'expanded' : ''}`}>
                <div className="filters-grid-luxury">
                    {/* Location Filter Card */}
                    <div className="filter-card">
                        <div className="filter-card-icon">📍</div>
                        <label className="filter-card-label">Location</label>
                        <select
                            name="location"
                            className="filter-card-select"
                            value={filters.location}
                            onChange={handleChange}
                        >
                            <option value="">All Areas</option>
                            <option value="Beverly Hills">Beverly Hills</option>
                            <option value="Malibu">Malibu</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Bel Air">Bel Air</option>
                            <option value="West Hollywood">West Hollywood</option>
                            <option value="Newport Beach">Newport Beach</option>
                        </select>
                    </div>

                    {/* Price Range Card */}
                    <div className="filter-card filter-card-wide">
                        <div className="filter-card-icon">💰</div>
                        <label className="filter-card-label">Price Range</label>
                        <div className="price-range-inputs">
                            <select
                                name="minPrice"
                                className="filter-card-select"
                                value={filters.minPrice}
                                onChange={handleChange}
                            >
                                <option value="">Min</option>
                                <option value="1000000">$1M</option>
                                <option value="2000000">$2M</option>
                                <option value="3000000">$3M</option>
                                <option value="4000000">$4M</option>
                                <option value="5000000">$5M</option>
                            </select>
                            <span className="price-separator">—</span>
                            <select
                                name="maxPrice"
                                className="filter-card-select"
                                value={filters.maxPrice}
                                onChange={handleChange}
                            >
                                <option value="">Max</option>
                                <option value="2000000">$2M</option>
                                <option value="3000000">$3M</option>
                                <option value="4000000">$4M</option>
                                <option value="5000000">$5M</option>
                                <option value="10000000">$10M+</option>
                            </select>
                        </div>
                    </div>

                    {/* Bedrooms Filter Card */}
                    <div className="filter-card">
                        <div className="filter-card-icon">🛏️</div>
                        <label className="filter-card-label">Bedrooms</label>
                        <select
                            name="beds"
                            className="filter-card-select"
                            value={filters.beds}
                            onChange={handleChange}
                        >
                            <option value="">Any</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                            <option value="6">6+</option>
                        </select>
                    </div>

                    {/* Property Type Card */}
                    <div className="filter-card">
                        <div className="filter-card-icon">✨</div>
                        <label className="filter-card-label">Collection</label>
                        <select
                            name="tag"
                            className="filter-card-select"
                            value={filters.tag}
                            onChange={handleChange}
                        >
                            <option value="">All Properties</option>
                            <option value="NEW">New Listings</option>
                            <option value="FEATURED">Featured</option>
                            <option value="LUXURY">Luxury Collection</option>
                            <option value="EXCLUSIVE">Exclusive Estates</option>
                        </select>
                    </div>
                </div>

                {/* Reset Button */}
                {activeFiltersCount > 0 && (
                    <div className="filter-actions">
                        <button onClick={handleReset} className="btn-reset-luxury">
                            <span>Clear All Filters</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchFilter