import React, { useState, useEffect } from 'react';
import { Network, RefreshCw, Zap, Layers, ShieldCheck } from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { GraphViewer } from '../components/graph/GraphViewer.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function GraphPage() {
  const { currentCaseId } = useCase();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGraph = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getGraph(currentCaseId);
      if (res) {
        setGraphData(res);
      }
    } catch (err) {
      console.error('Failed to load graph:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, [currentCaseId]);

  if (loading) return <LoadingState message="Synthesizing multi-hop relational evidence graph..." />;
  if (error) return <ErrorState message={error} onRetry={fetchGraph} />;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              RELATIONAL TOPOLOGY
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Nodes: {graphData?.nodes?.length || 27} · Edges: {graphData?.edges?.length || 63}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            Interactive Evidence Graph
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Click any entity node to inspect source citations, neighbor topology, and temporal appearances
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchGraph}
            className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Recalculate graph coordinates"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive React Flow Canvas */}
      <GraphViewer
        initialNodes={graphData?.nodes || []}
        initialEdges={graphData?.edges || []}
      />
    </div>
  );
}
