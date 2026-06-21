
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface WorkProps {
  isDarkMode: boolean;
}

const ProjectCard: React.FC<{
  title: string;
  category: string;
  image: string;
  isDarkMode: boolean;
  delay: number;
}> = ({ title, category, image, isDarkMode, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-square mb-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <ArrowUpRight className="text-white" size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`}>
          {category}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const Work: React.FC<WorkProps> = ({ isDarkMode }) => {
  const projects = [
    {
      title: "Project Aeon",
      category: "AI Brand Film",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Neuralis",
      category: "Cinematic Visuals",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Synthos Architecture",
      category: "3D AI Design",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Echo Reality",
      category: "Metaverse Narrative",
      image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Prism Flow",
      category: "Abstract Motion",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Silicon Soul",
      category: "Documentary AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  return (
    <section className="pt-40 pb-24 px-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className={`w-12 h-[1px] ${isDarkMode ? 'bg-blue-500/50' : 'bg-blue-600/50'}`} />
          <span className={`text-xs font-bold tracking-[0.5em] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Portfolio
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]"
        >
          Selected <br />
          <span className="font-serif-brand italic font-normal">Works</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            delay={index * 0.1}
            isDarkMode={isDarkMode}
            {...project}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
