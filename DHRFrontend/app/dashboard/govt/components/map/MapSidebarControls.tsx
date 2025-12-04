import React from 'react';
import { Layers, Users, Map as MapIcon, Activity } from 'lucide-react';

interface Props {
  showHeat: boolean;
  setShowHeat: (v: boolean) => void;
  showIcons: boolean;
  setShowIcons: (v: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}

export default function MapSidebarControls({
  showHeat, setShowHeat, showIcons, setShowIcons, selectedCategory, setSelectedCategory
}: Props) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-fit">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <MapIcon className="text-blue-600" size={20} />
        <h2 className="font-bold text-slate-800">Map Controls</h2>
      </div>

      <div className="space-y-6">
        
        {/* Toggle Heatmap */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg text-red-500"><Activity size={18}/></div>
            <span className="text-sm font-medium text-slate-700">Heat Intensity</span>
          </div>
          <button 
            onClick={() => setShowHeat(!showHeat)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${showHeat ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showHeat ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Toggle Icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Users size={18}/></div>
            <span className="text-sm font-medium text-slate-700">Origin Icons</span>
          </div>
          <button 
            onClick={() => setShowIcons(!showIcons)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${showIcons ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showIcons ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <hr className="border-slate-100" />

        {/* Category Dropdown */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Worker Origin Filter</label>
          <div className="relative">
            <Layers className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Origins</option>
              <option value="Odisha">Odisha</option>
              <option value="WB">West Bengal</option>
              <option value="Bihar">Bihar</option>
              <option value="Assam">Assam</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase mb-3">Density Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
              <span className="text-xs text-slate-600">High Risk (&gt;40k)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400 shadow-sm"></span>
              <span className="text-xs text-slate-600">Medium Risk (20k-40k)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></span>
              <span className="text-xs text-slate-600">Low Risk (&lt;20k)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}