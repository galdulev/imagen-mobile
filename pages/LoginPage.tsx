import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/projects');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/90 to-bg-primary/60" />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-8 z-10 relative animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Brand Area */}
        <div className="flex flex-col items-center gap-2 text-center">
          <img 
            src="https://static.showit.co/800/DzrSuYW_Lksi_WCP2pQe7A/222031/imagen_logo_2.png" 
            alt="Imagen" 
            className="h-16 mb-2 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://assets-global.website-files.com/6365d860c7b7a7191181697f/636a0224164b383416ca2c7c_Logo%20Imagen%20Red.svg";
            }}
          />
          <h2 className="text-xl font-medium text-text-primary">Your Photography. Everywhere.</h2>
          <p className="text-text-secondary text-sm max-w-[260px]">Access your cloud library, cull on the go, and deliver stunning galleries.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <input 
              type="email" 
              placeholder="Email Address"
              defaultValue="gal@photography.com"
              className="bg-bg-secondary/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              placeholder="Password"
              defaultValue="password123"
              className="bg-bg-secondary/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/50 transition-all"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-4 shadow-xl shadow-coral/20 py-5 text-lg">
            LOG IN
          </Button>
        </form>

        <div className="text-center">
          <a href="#" className="text-xs font-medium text-text-secondary hover:text-white transition-colors uppercase tracking-wider">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};