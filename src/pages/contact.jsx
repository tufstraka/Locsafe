import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';
import { FaMoon, FaSun } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    to_name:'Keith',
    from_email: '',
    message: ''
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Check for dark mode preference in local storage
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);


let options = {
    publicKey: 'Cb5HEKZQvWTTqRJJU'
}

emailjs.init(options)
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_uislhik', 'template_cxhx4bo', e.target)
      .then((result) => {
        console.log(formData)
        console.log(result)
        setStatus('Message sent successfully!');
      }, (error) => {
        console.log(error)
        setStatus('Failed to send message.');
      });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}>
      <Helmet>
        <title>Contact Us - Locsafe™</title>
        <meta
          name="description"
          content="Get in touch with Locsafe™ to learn more about our asset tracking and management system. Fill out the contact form and we'll get back to you as soon as possible."
        />
      </Helmet>
      <Header />
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-400" />}
      </button>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-20 mt-20">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full mt-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full mt-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className={`w-full mt-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            ></textarea>
          </div>
          <button type="submit" className={`w-full py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-900 text-white hover:bg-blue-600'} transition-colors duration-300`}>
            Send Message
          </button>
          {status && <div className="mt-4 text-center">{status}</div>}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;


