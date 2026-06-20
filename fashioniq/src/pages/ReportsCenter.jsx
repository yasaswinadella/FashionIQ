import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const reports = [
  { name: 'Monthly Trend Summary - July 2026', date: 'Jul 1, 2026', type: 'Trend Report', size: '1.2 MB' },
  { name: 'Color Intelligence Report - Q3', date: 'Jun 28, 2026', type: 'Color Report', size: '890 KB' },
  { name: 'Brand Performance Review - June', date: 'Jun 15, 2026', type: 'Brand Report', size: '2.1 MB' },
  { name: 'Footwear Trend Deep Dive', date: 'Jun 10, 2026', type: 'Category Report', size: '1.5 MB' },
  { name: 'Weekly Trend Pulse - Week 23', date: 'Jun 5, 2026', type: 'Trend Report', size: '640 KB' },
];

export default function ReportsCenter() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports Center</h1>
          <p className="text-ink-400 text-sm mt-1">
            Generate and download fashion intelligence reports.
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 whitespace-nowrap"
        >
          {generating ? 'Generating...' : '+ Generate New Report'}
        </button>
      </div>

      {generated && (
        <div className="bg-emerald-500/10 text-emerald-400 text-sm rounded-lg px-4 py-3 border border-emerald-500/20">
          ✅ Your report "Custom Trend Report - {new Date().toLocaleDateString()}" has been generated and added below!
        </div>
      )}

      <div className="bg-ink-900 rounded-2xl border border-ink-800 overflow-hidden">
        <div className="divide-y divide-ink-800">
          {generated && (
            <div className="flex items-center justify-between p-4 hover:bg-ink-800/50 transition">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">
                    Custom Trend Report - {new Date().toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-ink-400 mt-1">
                    <Calendar size={12} />
                    Just now · Custom Report · 1.0 MB
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm text-primary-400 font-medium hover:text-primary-300">
                <Download size={16} />
                Download
              </button>
            </div>
          )}

          {reports.map((report) => (
            <div key={report.name} className="flex items-center justify-between p-4 hover:bg-ink-800/50 transition">
              <div className="flex items-center gap-3">
                <div className="bg-primary-600/10 text-primary-400 p-2.5 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{report.name}</p>
                  <div className="flex items-center gap-2 text-xs text-ink-400 mt-1">
                    <Calendar size={12} />
                    {report.date} · {report.type} · {report.size}
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm text-primary-400 font-medium hover:text-primary-300">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}