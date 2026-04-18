const AboutPage = () => {
    return (
        <>
            <div style={{ height: '85px' }}></div>
      
            <section className="about-hero">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <span className="about-hero-label">Est. 1995</span>
                    <h1 className="about-hero-title">
                        Where Legacy<br/>
                        Meets Luxury
                    </h1>
                    <p className="about-hero-subtitle">
                        Three decades of curating California's most distinguished estates
                    </p>
                </div>
                <div className="scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            {/* Story Section - Asymmetric Layout */}
            <section className="about-story">
                <div className="about-story-grid">
                    <div className="about-story-images">
                        <div className="story-image-large" style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)'
                        }}></div>
                        <div className="story-image-small" style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80)'
                        }}></div>
                    </div>
                    
                    <div className="about-story-content">
                        <span className="section-number">01</span>
                        <h2 className="about-story-title">Our Heritage</h2>
                        <div className="about-story-text">
                            <p>
                                In 1995, APEX Estates emerged from a singular vision: to redefine 
                                luxury real estate as an art form. What began as a boutique firm 
                                representing a handful of distinguished properties has evolved into 
                                Southern California's most trusted name in high-end real estate.
                            </p>
                            <p>
                                Our journey has been marked by an unwavering commitment to excellence, 
                                discretion, and an intimate understanding of what transforms a house 
                                into a legacy. Every transaction is a carefully orchestrated symphony 
                                of expertise, intuition, and impeccable service.
                            </p>
                            <p>
                                Today, we represent not just properties, but lifestyles. Each estate 
                                in our portfolio tells a story, and each client becomes part of a 
                                legacy that spans generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Marquee */}
            <section className="about-stats-marquee">
                <div className="marquee-track">
                    <div className="marquee-content">
                        <div className="marquee-stat">
                            <span className="marquee-number">$2.5B+</span>
                            <span className="marquee-label">Total Sales</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">500+</span>
                            <span className="marquee-label">Estates Sold</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">98%</span>
                            <span className="marquee-label">Client Satisfaction</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">30</span>
                            <span className="marquee-label">Years Excellence</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        {/* Duplicate for seamless loop */}
                        <div className="marquee-stat">
                            <span className="marquee-number">$2.5B+</span>
                            <span className="marquee-label">Total Sales</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">500+</span>
                            <span className="marquee-label">Estates Sold</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">98%</span>
                            <span className="marquee-label">Client Satisfaction</span>
                        </div>
                        <div className="marquee-divider">•</div>
                        <div className="marquee-stat">
                            <span className="marquee-number">30</span>
                            <span className="marquee-label">Years Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Card Grid */}
            <section className="about-values">
                <div className="about-values-header">
                    <span className="section-number">02</span>
                    <h2 className="about-values-title">Our Philosophy</h2>
                </div>
                
                <div className="values-grid">
                    <div className="value-card" style={{ animationDelay: '0s' }}>
                        <div className="value-card-number">I</div>
                        <h3 className="value-card-title">Discretion</h3>
                        <p className="value-card-text">
                            Privacy is paramount. Our clients trust us with their most significant 
                            investments, and we honor that trust with absolute confidentiality and 
                            sophisticated discretion in every interaction.
                        </p>
                    </div>

                    <div className="value-card" style={{ animationDelay: '0.1s' }}>
                        <div className="value-card-number">II</div>
                        <h3 className="value-card-title">Excellence</h3>
                        <p className="value-card-text">
                            Mediocrity has no place in luxury real estate. We pursue perfection 
                            in every detail, from initial consultation to final closing, ensuring 
                            an experience that exceeds even the highest expectations.
                        </p>
                    </div>

                    <div className="value-card" style={{ animationDelay: '0.2s' }}>
                        <div className="value-card-number">III</div>
                        <h3 className="value-card-title">Vision</h3>
                        <p className="value-card-text">
                            We see beyond square footage and finishes. Our expertise lies in 
                            understanding the intangible—the lifestyle, the legacy, the story 
                            that makes a property truly extraordinary.
                        </p>
                    </div>

                    <div className="value-card" style={{ animationDelay: '0.3s' }}>
                        <div className="value-card-number">IV</div>
                        <h3 className="value-card-title">Integrity</h3>
                        <p className="value-card-text">
                            Our reputation is built on three decades of honest counsel, transparent 
                            dealings, and relationships that extend far beyond the transaction. 
                            Trust is earned, never assumed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Preview */}
            <section className="about-team-preview">
                <div className="team-preview-content">
                    <span className="section-number">03</span>
                    <h2 className="team-preview-title">
                        Guided by<br/>
                        Excellence
                    </h2>
                    <p className="team-preview-text">
                        Our team of seasoned professionals brings decades of collective experience, 
                        intimate market knowledge, and an unwavering dedication to your success. 
                        Every agent is carefully selected for their expertise, integrity, and passion 
                        for luxury real estate.
                    </p>
                    <div className="team-preview-stats">
                        <div className="team-stat">
                            <div className="team-stat-number">25+</div>
                            <div className="team-stat-label">Expert Agents</div>
                        </div>
                        <div className="team-stat">
                            <div className="team-stat-number">150</div>
                            <div className="team-stat-label">Years Combined Experience</div>
                        </div>
                    </div>
                </div>
                <div className="team-preview-image" style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80)'
                }}></div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="about-cta-content">
                    <h2 className="about-cta-title">Begin Your Journey</h2>
                    <p className="about-cta-text">
                        Experience the APEX difference. Let us guide you to your next extraordinary property.
                    </p>
                    <div className="about-cta-buttons">
                        <a href="/listings" className="btn btn-primary">Explore Properties</a>
                        <a href="/contact" className="btn btn-secondary">Schedule Consultation</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutPage