
import { 
  LayoutDashboard, FolderKanban, Settings,  
} from 'lucide-react';

// --- Sub-components (Sidebar, Header, Stats) ---
const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', link:"/" },
    { icon: FolderKanban, label: 'Categories',  link:"/counter" },
    { icon: Settings, label: 'Settings', link:"/#" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <LayoutDashboard size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight">AdminPanel</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <a key={index} href={item.link} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">JD</div>
          <div><p className="text-sm font-medium">John Doe</p><p className="text-xs text-slate-400">Administrator</p></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;