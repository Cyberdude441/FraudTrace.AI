import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCase } from '../context/CaseContext.jsx';
import { api } from '../services/api.js';
import { EntityTable } from '../components/entities/EntityTable.jsx';
import { GraphNodeDetailDrawer } from '../components/graph/GraphNodeDetailDrawer.jsx';
import { LoadingState } from '../components/common/LoadingState.jsx';
import { ErrorState } from '../components/common/ErrorState.jsx';

export function EntitiesPage() {
  const { currentCaseId } = useCase();
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const fetchEntities = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getEntities(currentCaseId);
      if (res && res.entities) {
        setEntities(res.entities);
      }
    } catch (err) {
      console.error('Failed to load entities:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, [currentCaseId]);

  if (loading) return <LoadingState message="Extracting and normalizing canonical entities..." />;
  if (error) return <ErrorState message={error} onRetry={fetchEntities} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/20">
              ENTITY RESOLUTION REPOSITORY
            </span>
            <span className="text-[11px] font-mono text-dark-muted">
              Canonical Entities: {entities.length}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white font-mono tracking-tight">
            Extracted Entity Resolution & Typology
          </h1>
          <p className="text-xs text-dark-muted font-mono mt-0.5">
            Normalized digital identifiers with cross-evidence occurrence tracking and connection confidence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchEntities}
            className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Refresh entities"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Entity Table */}
      <EntityTable
        entities={entities}
        onSelectEntity={(ent) => {
          setSelectedEntity({
            id: ent.entityId,
            label: ent.value,
            entityType: ent.type,
            normalizedValue: ent.normalizedValue,
            confidence: Math.round(ent.confidence * 100),
            epistemicType: ent.epistemicType,
            sourceEvidenceIds: ent.sourceEvidenceIds || [],
            properties: ent.properties || {}
          });
        }}
      />

      {/* Detail Drawer */}
      {selectedEntity && (
        <GraphNodeDetailDrawer
          nodeData={selectedEntity}
          onClose={() => setSelectedEntity(null)}
        />
      )}
    </div>
  );
}
