import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MessageSquare, PhoneCall, Users, ShoppingCart, Check } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

interface AgentTeamsProps {
  isDarkMode: boolean;
  selectedAgents: string[];
  toggleAgent: (id: string) => void;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

export const agentsData: Agent[] = [
  {
    id: 'custom-agents',
    name: 'Custom AI Agents',
    description: 'Custom multi-agent workflows designed to automate your company\'s unique, complex business operations.',
    price: 'Custom Quote',
    icon: <Cpu className="w-6 h-6" />
  },
  {
    id: 'whatsapp-agent',
    name: 'WhatsApp AI Agent',
    description: '24/7 client engagement, instant lead qualification, and automated CRM updates directly inside WhatsApp.',
    price: 'Starts at ₹12,000/mo',
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-3.571c1.616.958 3.202 1.488 4.809 1.488 5.505 0 9.983-4.482 9.986-9.99.002-2.67-1.036-5.176-2.92-7.062C16.639 2.979 14.137 1.94 11.47 1.94c-5.513 0-10 4.49-10.003 10 .001 1.83.476 3.618 1.38 5.187L1.835 21.84l4.812-1.411zm11.921-7.854c-.3-.15-1.774-.875-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.755.95-.926 1.15-.17.2-.34.225-.64.075-.3-.15-1.265-.467-2.41-1.487-.89-.794-1.49-1.776-1.665-2.076-.175-.3-.019-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.66-1.59-1.002-2.41-.336-.807-.724-.697-.985-.71-.252-.012-.54-.015-.828-.015-.288 0-.756.108-1.15.54-.395.431-1.507 1.472-1.507 3.59s1.543 4.159 1.759 4.448c.216.29 3.037 4.639 7.358 6.51 1.028.444 1.83.709 2.455.908 1.032.328 1.97.281 2.712.17.828-.124 2.546-1.04 2.905-2.043.359-1.003.359-1.862.252-2.043-.108-.18-.302-.281-.602-.431z" />
      </svg>
    )
  },
  {
    id: 'voice-agent',
    name: 'Voice Calling AI Agent',
    description: 'Autonomous conversational voice agent capable of handling high-volume outbound calls & customer service.',
    price: 'Starts at ₹5,000/mo',
    icon: <PhoneCall className="w-6 h-6" />
  },
  {
    id: 'linkedin-agent',
    name: 'LinkedIn AI Agent',
    description: 'Automated outbound outreach, messaging personalization, and appointment setting on autopilot.',
    price: 'Starts at ₹3,000/mo',
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 .784 1.764 1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  }
];

const AgentTeams: React.FC<AgentTeamsProps> = ({ selectedAgents, toggleAgent, navigateTo }) => {
  return (
    <section className="py-20 px-6 max-w-[1400px] mx-auto relative overflow-visible bg-zinc-950">
      {/* Title */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500"
        >
          INTRODUCING
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2"
        >
          AI Agent Teams
        </motion.h2>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentsData.map((agent, index) => {
          const isAdded = selectedAgents.includes(agent.id);
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/40 border border-white/5 hover:border-blue-500/20 hover:bg-zinc-900/70 rounded-3xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group/card"
            >
              <div>
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 mb-6 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all duration-500">
                  {agent.icon}
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover/card:text-blue-400 transition-colors">
                  {agent.name}
                </h3>
                {/* Description */}
                <p className="text-xs font-light text-white/50 leading-relaxed mb-6">
                  {agent.description}
                </p>
              </div>

              <div>
                {/* Price */}
                <p className="text-sm font-semibold text-white/70 mb-4">
                  {agent.price}
                </p>
                {/* CTA Button */}
                <button
                  onClick={() => toggleAgent(agent.id)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                    isAdded
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-white hover:bg-zinc-100 text-zinc-950 shadow-md shadow-white/5'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Hire
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add to Hire
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedAgents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => navigateTo?.('services')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-[10px] rounded-full transition-all shadow-lg shadow-blue-600/20 flex items-center gap-3"
          >
            Review and Hire Selected ({selectedAgents.length}) <ShoppingCart className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default AgentTeams;
