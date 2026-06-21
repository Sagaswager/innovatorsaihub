import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzsU7MKcykqhg36Z6TzqDS-lYYV8uJNGtEaU9uKGBXAkw-X1byvisoDo3Dk4Dk5tqgc/exec";

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    location: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        subject: '',
        location: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900/90 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl no-scrollbar"
          >
            {/* Close Button */}
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors w-10 h-10 rounded-full border border-white/5 bg-zinc-800/50 flex items-center justify-center group"
              aria-label="Close modal"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="mb-10 max-w-lg">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-400 mb-2 block">Direct Access</span>
              <h3 className="text-3xl font-bold tracking-tight text-white">Book Your Demo Call</h3>
              <p className="text-xs font-light text-white/50 mt-2">
                Fill out the details below. Our team will review your business challenge and prepare a tailored demonstration for our call.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Full Name</label>
                  <input 
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    type="text" 
                    className={`w-full bg-transparent border-b outline-none py-3 transition-all text-white text-lg placeholder:text-zinc-700 ${focused === 'name' ? 'border-blue-500' : 'border-zinc-800'}`} 
                    placeholder="Enter your name"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Email Address</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    type="email" 
                    className={`w-full bg-transparent border-b outline-none py-3 transition-all text-white text-lg placeholder:text-zinc-700 ${focused === 'email' ? 'border-blue-500' : 'border-zinc-800'}`} 
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Contact Number</label>
                  <input 
                    required
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    type="tel" 
                    className={`w-full bg-transparent border-b outline-none py-3 transition-all text-white text-lg placeholder:text-zinc-700 ${focused === 'phone' ? 'border-blue-500' : 'border-zinc-800'}`} 
                    placeholder="+91 99999 99999"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Service Interest</label>
                  <input 
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    type="text" 
                    className={`w-full bg-transparent border-b outline-none py-3 transition-all text-white text-lg placeholder:text-zinc-700 ${focused === 'subject' ? 'border-blue-500' : 'border-zinc-800'}`} 
                    placeholder="e.g. AI Brand Film, AI Agents..."
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Location ?</label>
                <input 
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onFocus={() => setFocused('location')}
                  onBlur={() => setFocused(null)}
                  type="text" 
                  className={`w-full bg-transparent border-b outline-none py-3 transition-all text-white text-lg placeholder:text-zinc-700 ${focused === 'location' ? 'border-blue-500' : 'border-zinc-800'}`} 
                  placeholder="e.g. Noida, India"
                />
              </div>

              {/* Challenges facing in business */}
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block text-white/40">Challenges Facing in Business to Solve using AI</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('msg')}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  className={`w-full bg-transparent border-b outline-none py-3 transition-all resize-none text-white text-lg leading-relaxed placeholder:text-zinc-700 ${focused === 'msg' ? 'border-blue-500' : 'border-zinc-800'}`} 
                  placeholder="Tell us what manual workflows, data silos, or growth bottlenecks you are looking to address..."
                />
              </div>

              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px]"
                    >
                      <CheckCircle2 size={18} /> Inquiry Logged Successfully
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3 py-5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-bold uppercase tracking-[0.2em] text-[10px]"
                    >
                      <AlertCircle size={18} /> Error Sending Inquiry. Please try again.
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="button"
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 transition-all bg-white text-black hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Scheduling Demo <Loader2 size={18} className="animate-spin" /></>
                      ) : (
                        <>Book Demo Call <Send size={18} strokeWidth={2} /></>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
