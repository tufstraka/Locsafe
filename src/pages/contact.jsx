import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    to_name: 'Keith',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    let options = {
      publicKey: 'Cb5HEKZQvWTTqRJJU'
    };

    emailjs.init(options);
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
        console.log(formData);
        console.log(result);
        setStatus('Message sent successfully!');
      }, (error) => {
        console.log(error);
        setStatus('Failed to send message.');
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <Helmet>
        <title>Contact Us - Locsafe™</title>
        <meta
          name="description"
          content="Get in touch with Locsafe™ to learn more about our asset tracking and management system. Fill out the contact form and we'll get back to you as soon as possible."
        />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">

        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 mt-16">
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800 dark:text-white">📨 📬</h2>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md ">
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-md bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md ">
            <input
              type="email"
              id="from_email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md ">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Message"
              className="w-full mt-2 px-4 py-2 rounded-md bg-transparent dark:text-white focus:outline-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md transition-all duration-300 flex justify-center items-center"
          >
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



