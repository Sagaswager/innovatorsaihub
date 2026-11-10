import React, { useState, useEffect } from 'react';
import { motion } from './motion';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  team: string;
  cv: string; // Data URL
  submittedAt: string;
}

interface AdminDashboardProps {
  isDarkMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDarkMode }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('internship_applications');
    if (data) {
      try {
        setApplications(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse applications", e);
      }
    }
  }, []);

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all applications? This cannot be undone.")) {
      localStorage.removeItem('internship_applications');
      setApplications([]);
    }
  };

  const handleDownloadCV = (app: Application) => {
    // Create a temporary link to download the base64 string as a PDF
    const link = document.createElement('a');
    link.href = app.cv;
    link.download = `${app.name.replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">View and manage internship applications.</p>
          </div>
          <button
            onClick={handleClearData}
            className="px-6 py-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-500/50"
          >
            Clear All Data
          </button>
        </motion.div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          {applications.length === 0 ? (
            <div className="p-10 text-center text-zinc-500">
              No applications received yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900 text-zinc-400 text-xs uppercase border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Applicant</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Education</th>
                    <th className="px-6 py-4 font-medium">Team</th>
                    <th className="px-6 py-4 font-medium">CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{app.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-zinc-300">{app.email}</div>
                        <div className="text-zinc-500 text-xs">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-zinc-300">{app.university}</div>
                        <div className="text-zinc-500 text-xs">{app.year}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                          {app.team}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDownloadCV(app)}
                          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium transition-colors border border-white/10"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
