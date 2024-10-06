const Footer = () => (
  <footer className="py-6 bg-gray-900 shadow-lg z-50">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <p className="text-white text-sm md:text-base text-center md:text-left mb-4 md:mb-0">© 2024 Locsafe. All rights reserved.</p>
      <nav>
        <ul className="flex items-center space-x-4 md:space-x-8 text-white font-medium justify-center">
          <li>
            <a href="/Terms-and-Conditions" className="hover:text-teal-400 transition-colors duration-300">Terms</a>
          </li>
          <li>
            <a href="/Privacy-Policy" className="hover:text-teal-400 transition-colors duration-300">Privacy</a>
          </li>
          <li>
            <a href="/Support" className="hover:text-teal-400 transition-colors duration-300">Support</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;

  