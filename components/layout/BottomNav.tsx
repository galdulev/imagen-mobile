import React from 'react';
import { Home, FolderOpen, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/projects", icon: Home, label: "Home" }, // Actually projects is home in this prototype
    { path: "/projects", icon: FolderOpen, label: "Projects" },
    { path: "/profile", icon: User, label: "Profile" }
  ];

  // Only show on logged in pages (exclude login and client gallery)
  if (currentPath === '/login' || currentPath.startsWith('/shared') || currentPath.includes('shared')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border-default pb-[env(safe-area-inset-bottom)] z-40">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          return (
            <Link 
              key={idx} 
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${isActive ? 'text-teal' : 'text-text-secondary'}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};