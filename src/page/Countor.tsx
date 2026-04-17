
import { increment, decrement } from "../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Plus, Minus } from "lucide-react"; // 1. Import icons
import Sidebar from "../layout/Sidebar";

// Renamed function to 'Counter' for better convention, 
// but you can keep it as 'Countor' if your file name requires it.
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">

      <Sidebar />
      
      {/* Card Container */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-slate-900 px-8 py-6 text-center">
          <h1 className="text-xl font-bold text-white tracking-tight">Redux Counter</h1>
          <p className="text-slate-400 text-sm mt-1">Global State Management</p>
        </div>

        {/* Card Body */}
        <div className="p-8 flex flex-col items-center">
          
          {/* Label */}
          <span className="text-slate-500 font-medium text-xs uppercase tracking-widest mb-4">
            Current Value
          </span>

          {/* Count Display */}
          <div className="text-7xl font-bold text-slate-800 mb-10 tracking-tight tabular-nums">
            {count}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full">
            
            {/* Decrement Button */}
            <button
              onClick={() => dispatch(decrement())}
              className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-lg hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all duration-200"
            >
              <Minus size={24} strokeWidth={3} className="group-hover:text-red-500 transition-colors" />
              <span>Dec</span>
            </button>

            {/* Increment Button */}
            <button
              onClick={() => dispatch(increment())}
              className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 active:scale-95 transition-all duration-200"
            >
              <Plus size={24} strokeWidth={3} />
              <span>Inc</span>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Counter;