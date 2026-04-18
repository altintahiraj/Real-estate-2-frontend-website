import { useNavigate } from 'react-router-dom'

const InvestmentPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <div style={{ height: '85px' }}></div>
            
            <section className="service-hero">
                <h1 className="service-hero-title">Investment Consulting</h1>
                <p className="service-hero-subtitle">
                    Build wealth through strategic real estate investment guidance
                </p>
            </section>

            <div className="service-content">
                <div className="service-section">
                    <h2 className="service-section-title">Smart Real Estate Investment</h2>
                    <p className="service-section-text">
                        Real estate remains one of the most reliable paths to building long-term wealth. At APEX Estates, 
                        our investment consulting services help you identify lucrative opportunities, analyze market trends, 
                        and make informed decisions that align with your financial goals. Whether you're a first-time investor 
                        or managing a diverse portfolio, we provide the insights and support you need to succeed.
                    </p>
                    <p className="service-section-text">
                        Our team combines deep market knowledge with sophisticated financial analysis to help you maximize 
                        returns while managing risk. We specialize in residential investment properties, commercial real estate, 
                        and development opportunities across California's most promising markets.
                    </p>
                </div>

                <div className="service-features">
                    <div className="service-feature-card">
                        <div className="service-feature-icon">🎯</div>
                        <h3 className="service-feature-title">Investment Strategy</h3>
                        <p className="service-feature-text">
                            Develop personalized investment strategies based on your goals, risk tolerance, and timeline. 
                            We help you build a roadmap to achieve your financial objectives.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📊</div>
                        <h3 className="service-feature-title">Market Analysis</h3>
                        <p className="service-feature-text">
                            Access comprehensive market research, demographic trends, and economic indicators to identify 
                            emerging opportunities before they become obvious.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">💎</div>
                        <h3 className="service-feature-title">Property Sourcing</h3>
                        <p className="service-feature-text">
                            Discover off-market deals and investment opportunities through our exclusive network. We find 
                            properties with strong potential for appreciation and income.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">📈</div>
                        <h3 className="service-feature-title">Financial Analysis</h3>
                        <p className="service-feature-text">
                            Detailed ROI calculations, cash flow projections, and risk assessments help you evaluate each 
                            opportunity with confidence and clarity.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🏗️</div>
                        <h3 className="service-feature-title">Development Opportunities</h3>
                        <p className="service-feature-text">
                            Identify properties with development potential, from renovations to ground-up construction. 
                            We connect you with architects, contractors, and lenders.
                        </p>
                    </div>

                    <div className="service-feature-card">
                        <div className="service-feature-icon">🔄</div>
                        <h3 className="service-feature-title">Portfolio Management</h3>
                        <p className="service-feature-text">
                            Ongoing support to optimize your portfolio, including property management referrals, refinancing 
                            strategies, and exit planning.
                        </p>
                    </div>
                </div>

                <div className="service-section">
                    <h2 className="service-section-title">Investment Strategies We Support</h2>
                    
                    <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                                Buy and Hold
                            </h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                                Build wealth through long-term appreciation and rental income. We help you find properties 
                                in areas with strong fundamentals and growth potential.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                                Fix and Flip
                            </h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                                Capitalize on market inefficiencies by renovating undervalued properties. We identify 
                                opportunities with the highest profit potential and connect you with reliable contractors.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                                Multi-Family Investment
                            </h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                                Generate consistent cash flow with apartment buildings and multi-unit properties. We analyze 
                                operating expenses, vacancy rates, and market rents to ensure strong returns.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.8rem' }}>
                                Commercial Real Estate
                            </h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
                                Diversify your portfolio with retail, office, or industrial properties. We evaluate tenant 
                                quality, lease terms, and market dynamics to minimize risk.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="service-cta">
                    <h2 className="service-cta-title">Start Your Investment Journey</h2>
                    <p className="service-cta-text">
                        Schedule a confidential consultation to discuss your investment goals and discover opportunities
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                            Schedule Consultation
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/listings')}>
                            View Investment Properties
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestmentPage