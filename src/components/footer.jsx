import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import logoabs from '../assets/logoabs.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: [
      { label: 'About Us', link: '/about' },
      { label: 'Contact', link: '/contact' },
      { label: 'Careers', link: '/careers' },
      { label: 'Blog', link: '/blog' }
    ],
    product: [
      { label: 'Avalot', link: '#' },
      { label: 'Bitchanga', link: '#' },
      { label: 'Afgex', link: '#' }
    ],
    legal: [
      { label: 'Terms & Conditions', link: '/Terms-and-Conditions' },
      { label: 'Privacy Policy', link: '/Privacy-Policy' },
      { label: 'Cookie Policy', link: '/cookie-policy' },
      /*{ label: 'Support', link: '/Support' }*/
    ],
    contact: {
      address: 'P.0 Box 1102 - 3202, Nairobi, Kenya',
      email: 'support@locsafe.org',
      phone: '+254701746774'
    },
    social: [
      { icon: <FaFacebook className="w-5 h-5" />, link: 'https://facebook.com' },
      { icon: <FaTwitter className="w-5 h-5" />, link: 'https://x.com/Locsafe' },
      { icon: <FaInstagram className="w-5 h-5" />, link: 'https://instagram.com' },
      { icon: <FaLinkedin className="w-5 h-5" />, link: 'https://linkedin.com/company/locsafe' },
      { icon: <FaWhatsapp className="w-5 h-5" />, link: 'https://chat.whatsapp.com/FHo517DQ4RSEZHjBq48LYO' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoabs} alt="Locsafe Logo" className="h-8 w-auto" />
              <span className="text-white font-bold text-xl">Locsafe</span>
            </div>
            <p className="text-sm text-gray-400">
              Securing assets and ensuring safety through innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              {footerSections.social.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerSections.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {footerSections.product.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-300 block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-teal-400 mt-1" />
                <span className="text-gray-400">{footerSections.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-teal-400" />
                <a
                  href={`mailto:${footerSections.contact.email}`}
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  {footerSections.contact.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-teal-400" />
                <a
                  href={`tel:${footerSections.contact.phone}`}
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  {footerSections.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 pb-4 mt-8">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-white font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and security tips.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-teal-400 text-gray-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Locsafe. All rights reserved.
            </p>
            <nav>
              <ul className="flex flex-wrap items-center space-x-4 md:space-x-8 text-sm">
                {footerSections.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.link}
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
