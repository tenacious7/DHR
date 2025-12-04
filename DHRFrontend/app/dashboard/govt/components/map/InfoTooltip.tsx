import React from 'react';
import { DistrictData } from './data/keralaData';

interface Props {
  data: DistrictData;
  x: number;
  y: number;
}

export default function InfoTooltip({ data, x, y }: Props) {
  return (
    <div 
      className="absolute z-50 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 p-4 w-64 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
      style={{ top: y - 20, left: x + 20 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{data.name}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${data.riskScore > 7 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            Risk Score: {data.riskScore}/10
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Total Workers:</span>
          <span className="font-bold text-slate-800">{data.workers.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Density:</span>
          <span className="font-medium text-slate-800">{data.density}</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Origin Breakdown</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> 
            <span className="text-slate-600">Od: {(data.originBreakdown.Odisha/1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div> 
            <span className="text-slate-600">WB: {(data.originBreakdown.WB/1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div> 
            <span className="text-slate-600">Bi: {(data.originBreakdown.Bihar/1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </div>
  );
}