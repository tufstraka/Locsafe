import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // To Do: add form submission logic
    // test
    console.log(formData);
  };

  return (
    <div>
       <Helmet>
        <title>Contact Us - Locsafe™</title>
        <meta
          name="description"
          content="Get in touch with Locsafe™ to learn more about our asset tracking and management system. Fill out the contact form and we'll get back to you as soon as possible."
        />
      </Helmet>
      <Header/>  

    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full mt-2 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:bg-white" required />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full mt-2 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:bg-white" required />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Your Message" className="w-full mt-2 px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:bg-white" required></textarea>
        </div>
        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Send Message</button>
      </form>
    </div>
          <Footer/>

    </div>

  );
};

export default ContactUs;
