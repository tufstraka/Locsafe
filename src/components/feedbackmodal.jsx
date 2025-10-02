import  { useState, useEffect, useRef } from 'react';
import { FaRegSmile, FaRegMeh, FaRegFrown, FaHeart, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    emailjs.init('Cb5HEKZQvWTTqRJJU'); // Replace with your EmailJS public key
  }, []);

  const reactions = [
    { icon: FaRegFrown, label: 'Poor', value: 1 },
    { icon: FaRegMeh, label: 'Okay', value: 2 },
    { icon: FaRegSmile, label: 'Good', value: 3 },
    { icon: BsEmojiSmileFill, label: 'Great', value: 4 },
    { icon: FaHeart, label: 'Amazing', value: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uislhik', 'template_j5dthps', formRef.current) // Replace with your EmailJS service and template IDs
      .then((result) => {
        console.log(result);
        setIsSubmitted(true);
        toast.success('Thank you for your feedback!');
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to send feedback. Please try again later.');
      });
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <div className="relative max-w-md bg-white p-6 rounded-lg shadow-xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -left-2 -top-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaTimes className="h-4 w-4 text-gray-500" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4">
            <FaHeart className="h-12 w-12 text-pink-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-gray-600">
              We appreciate your help in improving our platform.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            {step === 1 ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  How would you rate your experience?
                </h3>
                <div className="flex justify-between gap-2 mb-6">
                  {reactions.map((react) => {
                    const Icon = react.icon;
                    return (
                      <button
                        key={react.value}
                        type="button"
                        onClick={() => {
                          setRating(react.value);
                          setStep(2);
                        }}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                          rating === react.value
                            ? 'bg-blue-50 scale-110'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Icon
                          className={`text-2xl mb-1 ${
                            rating === react.value
                              ? 'text-blue-500'
                              : 'text-gray-400'
                          }`}
                        />
                        <span className="text-xs text-gray-600">
                          {react.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="rating" value={rating || ''} />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Any additional feedback?
                </h3>
                <textarea
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what we can improve..."
                  className="w-full p-3 border text-black border-gray-200 rounded-lg mb-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input type="hidden" name="rating" value={rating} />
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaPaperPlane className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FeedbackModal;
