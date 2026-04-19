import { createContext, useContext, useState, useEffect } from 'react'

const PropertiesContext = createContext()

export const useProperties = () => {
    const context = useContext(PropertiesContext)
    if (!context) {
        throw new Error('useProperties must be used within PropertiesProvider')
    }
    return context
}

export const PropertiesProvider = ({ children }) => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    // Initial properties data
    const initialProperties = [
        {
            id: 1,
            price: '$2,850,000',
            priceNum: 2850000,
            title: 'Modern Hillside Villa',
            location: 'Beverly Hills, CA',
            beds: 5,
            baths: 4,
            sqft: '4,500',
            tag: 'NEW',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            lat: 34.0736,
            lng: -118.4004,
            description: 'Stunning modern villa with panoramic views',
            status: 'For Sale',
            yearBuilt: 2023,
            type: 'Villa',
            featured: true
        },
        {
            id: 2,
            price: '$1,950,000',
            priceNum: 1950000,
            title: 'Coastal Retreat',
            location: 'Malibu, CA',
            beds: 4,
            baths: 3,
            sqft: '3,800',
            tag: 'FEATURED',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            lat: 34.0259,
            lng: -118.7798,
            description: 'Beautiful beachfront property with ocean views',
            status: 'For Sale',
            yearBuilt: 2021,
            type: 'House',
            featured: true
        },
        {
            id: 3,
            price: '$3,200,000',
            priceNum: 3200000,
            title: 'Downtown Penthouse',
            location: 'Los Angeles, CA',
            beds: 3,
            baths: 3,
            sqft: '3,200',
            tag: 'LUXURY',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            lat: 34.0522,
            lng: -118.2437,
            description: 'Luxurious penthouse in the heart of downtown',
            status: 'For Sale',
            yearBuilt: 2022,
            type: 'Penthouse',
            featured: true
        },
        {
            id: 4,
            price: '$4,100,000',
            priceNum: 4100000,
            title: 'Estate Masterpiece',
            location: 'Bel Air, CA',
            beds: 6,
            baths: 5,
            sqft: '6,200',
            tag: 'EXCLUSIVE',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            lat: 34.0901,
            lng: -118.4456,
            description: 'Grand estate with premium finishes',
            status: 'For Sale',
            yearBuilt: 2020,
            type: 'Estate',
            featured: false
        },
        {
            id: 5,
            price: '$2,450,000',
            priceNum: 2450000,
            title: 'Contemporary Oasis',
            location: 'West Hollywood, CA',
            beds: 4,
            baths: 4,
            sqft: '3,900',
            tag: 'NEW',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            lat: 34.0900,
            lng: -118.3617,
            description: 'Contemporary design with modern amenities',
            status: 'For Sale',
            yearBuilt: 2024,
            type: 'House',
            featured: false
        },
        {
            id: 6,
            price: '$5,800,000',
            priceNum: 5800000,
            title: 'Waterfront Paradise',
            location: 'Newport Beach, CA',
            beds: 5,
            baths: 5,
            sqft: '5,500',
            tag: 'LUXURY',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            lat: 33.6189,
            lng: -117.9289,
            description: 'Stunning waterfront property with private dock',
            status: 'For Sale',
            yearBuilt: 2021,
            type: 'Villa',
            featured: false
        }
    ]

    useEffect(() => {
        // Load properties from localStorage or use initial data
        const savedProperties = localStorage.getItem('apexProperties')
        if (savedProperties) {
            setProperties(JSON.parse(savedProperties))
        } else {
            setProperties(initialProperties)
            localStorage.setItem('apexProperties', JSON.stringify(initialProperties))
        }
        setLoading(false)
    }, [])

    // Save to localStorage whenever properties change
    const saveProperties = (newProperties) => {
        setProperties(newProperties)
        localStorage.setItem('apexProperties', JSON.stringify(newProperties))
    }

    // Add new property
    const addProperty = (property) => {
        const newProperty = {
            ...property,
            id: Date.now(),
            priceNum: parseFloat(property.price.replace(/[$,]/g, ''))
        }
        const updatedProperties = [...properties, newProperty]
        saveProperties(updatedProperties)
        return newProperty
    }

    // Update existing property
    const updateProperty = (id, updatedData) => {
        const updatedProperties = properties.map(property =>
            property.id === id 
                ? { 
                    ...property, 
                    ...updatedData,
                    priceNum: parseFloat(updatedData.price.replace(/[$,]/g, ''))
                }
                : property
        )
        saveProperties(updatedProperties)
    }

    // Delete property
    const deleteProperty = (id) => {
        const updatedProperties = properties.filter(property => property.id !== id)
        saveProperties(updatedProperties)
    }

    // Get featured properties
    const getFeaturedProperties = () => {
        return properties.filter(property => property.featured).slice(0, 3)
    }

    // Get property by ID
    const getPropertyById = (id) => {
        return properties.find(property => property.id === parseInt(id))
    }

    const value = {
        properties,
        loading,
        addProperty,
        updateProperty,
        deleteProperty,
        getFeaturedProperties,
        getPropertyById
    }

    return (
        <PropertiesContext.Provider value={value}>
            {children}
        </PropertiesContext.Provider>
    )
}
