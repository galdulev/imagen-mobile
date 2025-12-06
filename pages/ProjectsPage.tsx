import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Cloud, ArrowUpRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Avatar } from '../components/common/Avatar';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { projects, currentUser } from '../data/mockData';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 min-h-screen bg-bg-primary">
      <Header 
        title={
          <img 
            src="https://static.showit.co/800/DzrSuYW_Lksi_WCP2pQe7A/222031/imagen_logo_2.png" 
            alt="Imagen" 
            className="h-7 mt-1 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://assets-global.website-files.com/6365d860c7b7a7191181697f/636a0224164b383416ca2c7c_Logo%20Imagen%20Red.svg";
            }}
          />
        }
        transparent
        rightElement={<Avatar initials={currentUser.initials} />}
      />

      <div className="px-5 pt-2 pb-6 flex flex-col gap-8">
        
        {/* Cloud Status / Upsell Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">My Projects</h1>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
             <Cloud size={14} className="text-teal" />
             <span className="text-teal font-medium">Cloud Synced</span>
             <span className="text-text-tertiary">•</span>
             <span>145 GB of 1 TB used</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-coral transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search clients or events..." 
            className="w-full bg-bg-secondary border border-border-default rounded-2xl pl-12 pr-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-coral/50 transition-all placeholder:text-text-tertiary"
          />
        </div>

        {/* Tabs - Simplified */}
        <div className="flex gap-6 border-b border-border-default">
          <button className="pb-3 px-1 border-b-2 border-coral text-text-primary font-semibold text-sm">
            Recent
          </button>
          <button className="pb-3 px-1 border-b-2 border-transparent text-text-tertiary font-medium text-sm hover:text-text-secondary">
            Archived
          </button>
        </div>

        {/* Immersive List */}
        <div className="flex flex-col gap-6">
          {projects.map(project => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-black/50 active:scale-[0.98] transition-all duration-300"
            >
              {/* Background Image */}
              <img 
                src={project.coverPhoto} 
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-coral bg-coral/10 backdrop-blur-sm px-2 py-0.5 rounded">
                        {project.status === 'ready' ? 'Ready to Share' : project.status}
                      </span>
                      <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                        {project.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary leading-tight">{project.name}</h3>
                    <p className="text-xs text-text-secondary mt-1 font-medium">{project.profileName}</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-coral group-hover:border-coral transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Progress/Stats Footer */}
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-text-tertiary uppercase font-bold">Editing Progress</span>
                    <ProgressStepper current={project.progress} />
                  </div>
                  <div className="text-right">
                     <span className="block text-lg font-bold text-white leading-none">{project.photoCount}</span>
                     <span className="text-[10px] text-text-tertiary uppercase">Photos</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};