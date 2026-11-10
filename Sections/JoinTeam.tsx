import React, { useState } from 'react';
import { motion, AnimatePresence } from './motion';

interface JoinTeamProps {
  isDarkMode: boolean;
}

// Replace this URL with the new Web App URL from your Google Apps Script deployment
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzMGZYdWM4HF-3jISJLOk9kvt4x9yXM_dNF23TMtkGhYwr8XbMwQiaZXTK640WGJMU/exec";

const JoinTeam: React.FC<JoinTeamProps> = ({ isDarkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    year: '',
    team: '',
    cv: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cv) {
      alert("Please upload your CV");
      return;
    }

    setIsSubmitting(true);
    
    // Read the file as a Data URL (base64 string) to send to Google Apps Script
    const reader = new FileReader();
    reader.onload = async (event) => {
      const cvDataUrl = event.target?.result as string;
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        year: formData.year,
        team: formData.team,
        cvBase64: cvDataUrl,
        cvName: formData.cv?.name
      };

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Essential for Google Apps Script to prevent CORS errors
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(payload)
        });

        alert('Application submitted successfully!');
        setShowForm(false);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          university: '',
          year: '',
          team: '',
          cv: null
        });
      } catch (error) {
        console.error("Error submitting application:", error);
        alert('There was an error submitting your application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    reader.readAsDataURL(formData.cv);
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Become a part of the Innovators AI HUB and help shape the future of AI technology.
          </p>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20 hover:scale-105"
            >
              Apply for Internship
            </button>
          )}
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8">Internship Application</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mail ID</label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">My University</label>
                  <input
                    type="text"
                    name="university"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">In Year</label>
                  <div className="flex flex-wrap gap-4">
                    {['1st yr', '2nd yr', '3rd yr', '4th yr', 'Passed'].map(year => (
                      <label key={year} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="year"
                          value={year}
                          required
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 bg-zinc-950 border-white/10 focus:ring-blue-500 focus:ring-offset-zinc-900"
                        />
                        <span>{year}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Join Team</label>
                  <select
                    name="team"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Select a team...</option>
                    <option value="Marketing Team">Marketing Team</option>
                    <option value="AI Tech. Team">AI Tech. Team</option>
                    <option value="Client Management Team">Client Management Team</option>
                    <option value="Sales Team">Sales Team</option>
                    <option value="Social Media Team">Social Media Team</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">My CV (PDF only)</label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinTeam;
