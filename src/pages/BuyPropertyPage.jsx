import { useNavigate } from 'react-router-dom'

const BuyPropertyPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <div style={{ height: '85px' }}></div>
            
            {/* Hero Section */}
            <section className="service-hero">
                <h1 className="service-hero-title">Buy Property</h1>
                <p className="service-hero-subtitle">
                    Discover your dream home with expert guidance every step of the way
                </p>
            </section>

            {/* Main Content */}
            <div className="service-content">
                <div className="service-section">
                    <h2 className="service-section-title">Your Journey to Homeownership</h2>
                    <p className="service-section-text">
                        At APEX Estates, we understand that purchasing a property is one of life's most significant 
                        decisions. Our experienced team is dedicated to making your home-buying journey smooth, 
                        transparent, and rewarding. We leverage our deep market knowledge, exclusive listings, and 
                        negotiation expertise to help you find the perfect property at the right price.
                    </p>
                    <p className="service-section-text">
                        Whether you're a first-time buyer or an experienced investor, we provide personalized service 
                        tailored to your unique needs, budget, and timeline. From initial consultation to closing day 
                        and beyond, we're with you every step of the way.
                    </p>
                </div>

                {/* Features */}
                <div className="service-features">
                    <div className="service-feature-card">
                        <div className="service-feature-icon">🔍</div>
                        <h3 className="service-feature-title">Property Search</h3>
                        <p className="service-feature-text">
                            Access exclusive listings and off-market properties before they hit the public market. 
                            Our advanced search tools help you find properties that match your exact criteria.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">💰</div>
                        <h3 className="service-feature-title">Financial Guidance</h3>
                        <p className="service-feature-text">
                            Connect with trusted mortgage lenders and financial advisors. We'll help you understand 
                            your budget, explore financing options, and get pre-approved.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📊</div>
                        <h3 className="service-feature-title">Market Analysis</h3>
                        <p className="service-feature-text">
                            Receive comprehensive market reports and neighborhood analytics to make informed decisions. 
                            We provide data-driven insights on property values and market trends.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🏠</div>
                        <h3 className="service-feature-title">Property Tours</h3>
                        <p className="service-feature-text">
                            Schedule private viewings and virtual tours at your convenience. We highlight key features 
                            and potential concerns to help you evaluate each property thoroughly.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📝</div>
                        <h3 className="service-feature-title">Offer Strategy</h3>
                        <p className="service-feature-text">
                            Craft competitive offers backed by market data and expert negotiation. We protect your 
                            interests while positioning you as a strong buyer.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">✅</div>
                        <h3 className="service-feature-title">Closing Support</h3>
                        <p className="service-feature-text">
                            Navigate inspections, appraisals, and paperwork with confidence. We coordinate with all 
                            parties to ensure a smooth closing process.
                        </p>
                    </div>
                </div>

                <div className="service-section">
                    <h2 className="service-section-title">The APEX Advantage</h2>
                    <p className="service-section-text">
                        <strong>30 Years of Excellence:</strong> Our decades of experience mean we've seen every market 
                        condition and solved every challenge. You benefit from our institutional knowledge and proven strategies.
                    </p>
                    <p className="service-section-text">
                        <strong>Exclusive Network:</strong> Access properties before they're publicly listed. Our 
                        relationships with other agents and property owners give you first-mover advantage.
                    </p>
                    <p className="service-section-text">
                        <strong>Client-First Approach:</strong> We're not just selling properties; we're helping you 
                        find your perfect home. Your satisfaction is our measure of success, and we maintain relationships 
                        with our clients long after closing.
                    </p>
                </div>

                {/* CTA */}
                <div className="service-cta">
                    <h2 className="service-cta-title">Ready to Find Your Dream Home?</h2>
                    <p className="service-cta-text">
                        Start your property search today or schedule a consultation with one of our expert agents
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/listings')}>
                            View Properties
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/contact')}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyPropertyPage