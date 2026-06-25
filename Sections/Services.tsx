import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Code, 
  Cpu, 
  Target, 
  Sparkles,
  ShoppingCart,
  Check,
  Plus,
  ArrowRight
} from 'lucide-react';
import { agentsData } from './AgentTeams';

interface ServicesProps {
  isDarkMode: boolean;
  isFullPage?: boolean;
  selectedAgents?: string[];
  customDescriptions?: Record<string, string>;
  toggleAgent?: (id: string) => void;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Services: React.FC<ServicesProps> = ({ isDarkMode, isFullPage = false, selectedAgents = [], customDescriptions = {}, toggleAgent, navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<any>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [coords, setCoords] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const selectedList = agentsData.filter(agent => selectedAgents.includes(agent.id));

  const getWhatsAppLink = () => {
    const agentDetails = selectedList.map(a => {
      const desc = customDescriptions[a.id];
      return desc ? `${a.name} (Purpose: "${desc}")` : a.name;
    }).join(', ');
    const text = encodeURIComponent(`Hi! I'm interested in hiring the following AI Agent Teams:\n\n${agentDetails}\n\nLet's connect to set things up!`);
    return `https://wa.me/919810875683?text=${text}`;
  };

  const getEmailLink = () => {
    const agentDetails = selectedList.map(a => {
      const desc = customDescriptions[a.id];
      return desc ? `${a.name} (Purpose: "${desc}")` : a.name;
    }).join(', ');
    const subject = encodeURIComponent(`Inquiry: Hiring AI Agent Teams`);
    const body = encodeURIComponent(`Hi!\n\nI'm interested in hiring the following AI Agent Teams:\n\n${agentDetails}\n\nLet's schedule a call to get started.`);
    return `mailto:Sagarmasand9@gmail.com?subject=${subject}&body=${body}`;
  };

  const allServices = [
    {
      title: "AI Brand Films",
      description: "Cinematic storytelling powered by advanced generative AI, blending live action with synthetic environments.",
      icon: <Video />,
    },
    {
      title: "AI Agents Team",
      description: "Engineering autonomous agentic teams and multi-agent workflows that collaborate to solve complex business operations.",
      icon: <Code />,
    }
  ];


  const updateCoordinates = () => {
    if (!containerRef.current || !hubRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const hubRect = hubRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    let x1 = 0;
    let y1 = 0;

    if (isMobile) {
      // Mobile: Start from bottom-center of the hub
      x1 = hubRect.left + hubRect.width / 2 - parentRect.left;
      y1 = hubRect.bottom - parentRect.top + 8;
    } else {
      // Desktop: Start from center-right edge of the hub
      x1 = hubRect.right - parentRect.left + 15;
      y1 = hubRect.top + hubRect.height / 2 - parentRect.top;
    }

    const newCoords = allServices.map((_, index) => {
      const item = itemRefs.current[index];
      if (!item) return { x1, y1, x2: x1, y2: y1 };
      const itemRect = item.getBoundingClientRect();
      
      let x2 = 0;
      let y2 = 0;

      if (isMobile) {
        // Mobile: Connect to top-center of each pill
        x2 = itemRect.left + itemRect.width / 2 - parentRect.left;
        y2 = itemRect.top - parentRect.top;
      } else {
        // Desktop: Connect to center-left edge of the pill
        x2 = itemRect.left - parentRect.left;
        y2 = itemRect.top + itemRect.height / 2 - parentRect.top;
      }

      return { x1, y1, x2, y2 };
    });

    setCoords(newCoords);
  };

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const timer = setTimeout(updateCoordinates, 500);
    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(timer);
    };
  }, []);

  const drawPath = (c: { x1: number; y1: number; x2: number; y2: number }) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const dy = Math.abs(c.y2 - c.y1);
      const cx1 = c.x1;
      const cy1 = c.y1 + dy * 0.4;
      const cx2 = c.x2;
      const cy2 = c.y2 - dy * 0.4;
      return `M ${c.x1} ${c.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.x2} ${c.y2}`;
    } else {
      const dx = Math.abs(c.x2 - c.x1);
      const cx1 = c.x1 + dx * 0.4;
      const cy1 = c.y1;
      const cx2 = c.x2 - dx * 0.4;
      const cy2 = c.y2;
      return `M ${c.x1} ${c.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.x2} ${c.y2}`;
    }
  };

  return (
    <section id="services" className={`${isFullPage ? 'pt-40 md:pt-48' : 'py-8 md:py-12'} px-6 max-w-[1400px] mx-auto relative overflow-visible`}>
      <style>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>

      {/* Interactive Cart Panel */}
      {isFullPage && (
        <div className="mb-16 bg-zinc-900/30 border border-white/5 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto hover:border-blue-500/10 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-white tracking-tight">Your Custom AI Team</h2>
                <p className="text-[10px] md:text-xs font-light text-white/40 mt-0.5">Collect the agents you need and proceed to checkout.</p>
              </div>
            </div>
            {selectedList.length > 0 && (
              <span className="text-[10px] md:text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                {selectedList.length} Selected
              </span>
            )}
          </div>

          {selectedList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm font-light text-white/50">No AI agents selected yet.</p>
              <p className="text-xs font-light text-white/30 mt-1">Browse the agent catalog below to start building your team.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedList.map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-zinc-950/60 border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 text-left">
                      <div className="text-blue-400">
                        {agent.icon}
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold text-white">{agent.name}</p>
                        <p className="text-[10px] font-semibold text-blue-400 mt-0.5">{agent.price}</p>
                        {customDescriptions[agent.id] && (
                          <p className="text-[10px] font-light text-white/50 italic mt-1 max-w-md line-clamp-2">
                            Purpose: "{customDescriptions[agent.id]}"
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAgent?.(agent.id)}
                      className="text-[10px] font-bold text-red-500/70 hover:text-red-400 transition-colors uppercase tracking-wider px-3 py-1.5 hover:bg-red-500/5 rounded-xl"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-[9px] rounded-2xl transition-all shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-3"
                >
                  Checkout via WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={getEmailLink()}
                  className="flex-1 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold uppercase tracking-widest text-[9px] rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  Checkout via Email <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Agent Catalog (Shown on full page Services/Hire AI) */}
      {isFullPage && (
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">AI Agent Catalog</h3>
            <p className="text-xs font-light text-white/40 mt-2">Build your workforce with our pre-trained agent models.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {agentsData.map((agent) => {
              const isAdded = selectedAgents.includes(agent.id);
              return (
                <div
                  key={agent.id}
                  className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex flex-col justify-between h-full hover:border-blue-500/15 transition-all duration-300 hover:bg-zinc-900/70"
                >
                  <div className="text-left">
                    <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 mb-4">
                      {agent.icon}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{agent.name}</h4>
                    <p className="text-[11px] font-light text-white/50 leading-relaxed mb-4">{agent.description}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white/70 mb-3">{agent.price}</p>
                    <button
                      onClick={() => toggleAgent?.(agent.id)}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-white hover:bg-zinc-100 text-zinc-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add to Hire
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


    </section>
  );
};

export default Services;

