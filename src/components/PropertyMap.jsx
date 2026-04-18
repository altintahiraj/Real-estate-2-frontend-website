import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PropertyMap = ({ properties }) => {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!mapInstanceRef.current && mapRef.current) {
            const L = window.L
            if (!L) {
                console.error('Leaflet library not loaded')
                return
            }

            // Create map centered on Los Angeles area
            const map = L.map(mapRef.current).setView([34.0522, -118.2437], 9)

            // Add OpenStreetMap tiles with nice styling
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map)

            // Custom marker icon
            const customIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })

            // Add markers for each property
            properties.forEach((property) => {
                // Skip properties without coordinates
                if (!property.lat || !property.lng) return

                const marker = L.marker([property.lat, property.lng], {
                    icon: customIcon
                }).addTo(map)
                
                // Create rich popup with property details and "View Details" button
                const popupContent = `
                    <div style="
                        font-family: 'Outfit', sans-serif;
                        min-width: 220px;
                        padding: 8px;
                    ">
                        <h3 style="
                            margin: 0 0 8px 0;
                            color: #1a1a1a;
                            font-size: 1.1rem;
                            font-weight: 600;
                            line-height: 1.3;
                        ">
                            ${property.title}
                        </h3>
                        <p style="
                            margin: 0 0 8px 0;
                            color: #d4a574;
                            font-weight: 700;
                            font-size: 1.3rem;
                            font-family: 'Playfair Display', serif;
                        ">
                            ${property.price}
                        </p>
                        <p style="
                            margin: 0 0 8px 0;
                            color: #666;
                            font-size: 0.9rem;
                        ">
                            📍 ${property.location}
                        </p>
                        <div style="
                            display: flex;
                            gap: 12px;
                            margin-top: 8px;
                            padding-top: 8px;
                            border-top: 1px solid #eee;
                        ">
                            <span style="color: #666; font-size: 0.85rem;">
                                🛏️ ${property.beds}
                            </span>
                            <span style="color: #666; font-size: 0.85rem;">
                                🚿 ${property.baths}
                            </span>
                            <span style="color: #666; font-size: 0.85rem;">
                                📏 ${property.sqft} sqft
                            </span>
                        </div>
                        ${property.tag ? `
                            <span style="
                                display: inline-block;
                                margin-top: 8px;
                                background: #1a1a1a;
                                color: white;
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 0.75rem;
                                font-weight: 500;
                            ">
                                ${property.tag}
                            </span>
                        ` : ''}
                        <button 
                            onclick="window.location.href='/property/${property.id}'"
                            style="
                                width: 100%;
                                margin-top: 12px;
                                padding: 10px;
                                background: #d4a574;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                font-weight: 600;
                                cursor: pointer;
                                font-size: 0.9rem;
                                transition: background 0.3s ease;
                            "
                            onmouseover="this.style.background='#8b7355'"
                            onmouseout="this.style.background='#d4a574'"
                        >
                            View Details →
                        </button>
                    </div>
                `
                
                marker.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: 'custom-popup'
                })

                // Open popup on hover
                marker.on('mouseover', function() {
                    this.openPopup()
                })

                // Make marker clickable - navigate to property detail
                marker.on('click', function() {
                    navigate(`/property/${property.id}`)
                })
            })

            mapInstanceRef.current = map
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [properties, navigate])

    return (
        <div 
            ref={mapRef} 
            style={{ 
                width: '100%', 
                height: '500px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}
        />
    )
}

export default PropertyMap