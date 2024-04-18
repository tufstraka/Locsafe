const Footer = () => (
    <footer className="py-6 bg-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-gray-600 text-sm md:text-base text-center md:text-left mb-4 md:mb-0">© 2024 Locsafe. All rights reserved.</p>
        <nav>
          <ul className="flex items-center space-x-4 md:space-x-8 text-gray-600 font-medium justify-center">
            <li>
              <a href="/Terms-and-Conditions" className="hover:text-gray-800">Terms</a>
            </li>
            <li>
              <a href="/Privacy-Policy" className="hover:text-gray-800">Privacy</a>
            </li>
            <li>
              <a href="/Support" className="hover:text-gray-800">Support</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
  
  export default Footer;
  