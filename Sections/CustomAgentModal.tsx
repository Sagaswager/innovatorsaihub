import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

interface CustomAgentModalProps {
  onClose: () => void;
  onConfirm: (description: string) => void;
}

const CustomAgentModal: React.FC<CustomAgentModalProps> = ({ onClose, onConfirm }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a short description of the agent\'s purpose.');
      return;
    }
    onConfirm(description);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl shadow-blue-500/5 text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Describe Your Custom AI Agent</h3>
            <p className="text-xs text-white/40 mt-0.5">Tell us what you want this agent to build or automate.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="agent-purpose" className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Agent Purpose & Description
            </label>
            <textarea
              id="agent-purpose"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. An AI Agent that qualifies inbound leads via email and sets appointments on my Google Calendar automatically..."
              className="w-full bg-zinc-950 border border-white/5 focus:border-blue-500 rounded-2xl p-4 text-sm text-white placeholder-white/20 outline-none transition-all resize-none focus:ring-1 focus:ring-blue-500"
            />
            {error && (
              <p className="text-xs font-medium text-red-500 mt-2">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-zinc-950 hover:bg-zinc-800 border border-white/5 text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Confirm & Add <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CustomAgentModal;
