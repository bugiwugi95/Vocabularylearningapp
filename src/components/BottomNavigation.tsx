import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface BottomNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onNavigate: (id: string) => void;
}

export function BottomNavigation({ items, activeItem, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-100 shadow-lg">
      <div className="grid grid-cols-4 h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
