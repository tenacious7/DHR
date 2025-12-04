import React from 'react';
import { DistrictData } from './data/keralaData';
import { X, TrendingUp, AlertTriangle, Users } from 'lucide-react';

interface Props {
  data: DistrictData | null;
  onClose: () => void;
}

export default function DistrictModal({ data, onClose }: Props) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{data.name} District Analysis</h2>
            <p className="text-sm text-slate-500">Detailed surveillance report</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <Users size={18} />
                <span className="text-xs font-bold uppercase">Population</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{data.workers.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <AlertTriangle size={18} />
                <span className="text-xs font-bold uppercase">Risk Level</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{data.density}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase">Compliance</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">92%</p>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 mb-4">Worker Origin Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(data.originBreakdown).map(([state, count], i) => (
              <div key={state}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{state}</span>
                  <span className="text-slate-500">{count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${['bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500'][i]}`} 
                    style={{ width: `${(count / data.workers) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Close</button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200">Download Report</button>
        </div>
      </div>
    </div>
  );
}