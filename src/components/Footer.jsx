import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>APEX</h3>
                    <p>
                        Your premier destination for luxury real estate. 
                        Connecting exceptional properties with exceptional people.
                    </p>
                </div>
                
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/listings">Listings</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Services</h3>
                    <ul className="footer-links">
                        <li><Link to="/services/buy">Buy Property</Link></li>
                        <li><Link to="/services/sell">Sell Property</Link></li>
                        <li><Link to="/services/valuation">Property Valuation</Link></li>
                        <li><Link to="/services/investment">Investment Consulting</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul className="footer-links">
                        <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()}>Facebook</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()}>Twitter</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 APEX Estates. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer