import { useNavigate } from 'react-router-dom'

const SellPropertyPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <div style={{ height: '85px' }}></div>
            
            <section className="service-hero">
                <h1 className="service-hero-title">Sell Property</h1>
                <p className="service-hero-subtitle">
                    Maximize your property's value with strategic marketing and expert negotiation
                </p>
            </section>

            <div className="service-content">
                <div className="service-section">
                    <h2 className="service-section-title">Sell for Maximum Value</h2>
                    <p className="service-section-text">
                        Selling your property is a significant financial transaction that requires strategic planning, 
                        market expertise, and skilled negotiation. At APEX Estates, we combine cutting-edge marketing 
                        with personalized service to attract qualified buyers and secure the best possible price for 
                        your property.
                    </p>
                    <p className="service-section-text">
                        Our comprehensive approach includes professional photography, virtual tours, targeted advertising, 
                        and access to our extensive network of potential buyers. We handle every detail so you can focus 
                        on your next chapter while we maximize your return on investment.
                    </p>
                </div>

                <div className="service-features">
                    <div className="service-feature-card">
                        <div className="service-feature-icon">📈</div>
                        <h3 className="service-feature-title">Property Valuation</h3>
                        <p className="service-feature-text">
                            Receive accurate market analysis using recent comparable sales, current market conditions, 
                            and unique property features to determine optimal pricing strategy.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📸</div>
                        <h3 className="service-feature-title">Professional Marketing</h3>
                        <p className="service-feature-text">
                            High-quality photography, virtual tours, drone footage, and property videos showcase your 
                            home's best features across multiple platforms.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🎯</div>
                        <h3 className="service-feature-title">Targeted Advertising</h3>
                        <p className="service-feature-text">
                            Strategic marketing campaigns reach qualified buyers through social media, luxury real estate 
                            portals, and our exclusive buyer network.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🏡</div>
                        <h3 className="service-feature-title">Home Staging</h3>
                        <p className="service-feature-text">
                            Professional staging consultation helps present your property in its best light, creating 
                            emotional connections with potential buyers.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🤝</div>
                        <h3 className="service-feature-title">Skilled Negotiation</h3>
                        <p className="service-feature-text">
                            Expert negotiation ensures you get the best terms, price, and conditions while navigating 
                            counteroffers and contingencies professionally.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">⚡</div>
                        <h3 className="service-feature-title">Fast & Smooth Closing</h3>
                        <p className="service-feature-text">
                            We coordinate inspections, appraisals, and paperwork efficiently, keeping your sale on track 
                            and stress-free from listing to closing.
                        </p>
                    </div>
                </div>

                <div className="service-section">
                    <h2 className="service-section-title">Why Sell with APEX?</h2>
                    <p className="service-section-text">
                        <strong>Proven Results:</strong> Our properties sell 15% faster and for 8% more on average 
                        compared to market standards, thanks to strategic pricing and comprehensive marketing.
                    </p>
                    <p className="service-section-text">
                        <strong>Full-Service Support:</strong> From pre-listing preparation to post-closing coordination, 
                        we handle every detail so you don't have to worry about a thing.
                    </p>
                </div>

                <div className="service-cta">
                    <h2 className="service-cta-title">Ready to Sell Your Property?</h2>
                    <p className="service-cta-text">
                        Get a free property valuation and discover what your home is worth in today's market
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                            Get Free Valuation
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellPropertyPage