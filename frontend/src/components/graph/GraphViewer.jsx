import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Search, Filter, RotateCcw, Maximize, Shield, 
  Layers, AlertTriangle, CheckCircle2, SlidersHorizontal
} from 'lucide-react';
import { EntityCustomNode } from './CustomNodes.jsx';
import { GraphNodeDetailDrawer } from './GraphNodeDetailDrawer.jsx';

const nodeTypes = {
  entityNode: EntityCustomNode
};

export function GraphViewer({ initialNodes = [], initialEdges = [], onNodeClick }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState('ALL');
  const [selectedRelationType, setSelectedRelationType] = useState('ALL');

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const entityTypes = [
    'ALL', 'PERSON', 'PHONE', 'URL', 'TRANSACTION', 
    'AMOUNT', 'BANK_ACCOUNT', 'UPI_ID', 'ORGANIZATION', 'LOCATION', 'DEVICE'
  ];

  const relationTypes = [
    'ALL', 'MENTIONED_IN', 'ASSOCIATED_WITH', 'REFERENCES', 
    'MATCHES', 'PRECEDES', 'FOLLOWS', 'CONTAINS', 'CORROBORATES', 'CONFLICTS_WITH'
  ];

  // Filtering nodes and edges
  const filteredNodes = useMemo(() => {
    return nodes.map(node => {
      let isVisible = true;

      if (selectedEntityType !== 'ALL' && node.data.entityType !== selectedEntityType) {
        isVisible = false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const label = (node.data.label || '').toLowerCase();
        const norm = (node.data.normalizedValue || '').toLowerCase();
        if (!label.includes(q) && !norm.includes(q)) {
          isVisible = false;
        }
      }

      return {
        ...node,
        hidden: !isVisible,
        selected: selectedNode?.id === node.id
      };
    });
  }, [nodes, selectedEntityType, searchFilter, selectedNode]);

  const filteredEdges = useMemo(() => {
    return edges.map(edge => {
      let isVisible = true;
      if (selectedRelationType !== 'ALL' && edge.data?.type !== selectedRelationType) {
        isVisible = false;
      }
      // If either source or target node is hidden, hide the edge
      const sourceHidden = filteredNodes.find(n => n.id === edge.source)?.hidden;
      const targetHidden = filteredNodes.find(n => n.id === edge.target)?.hidden;
      if (sourceHidden || targetHidden) {
        isVisible = false;
      }

      return {
        ...edge,
        hidden: !isVisible
      };
    });
  }, [edges, selectedRelationType, filteredNodes]);

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    if (onNodeClick) onNodeClick(node);
  }, [onNodeClick]);

  // Compute connected neighbors for selected node
  const selectedNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    const connectedEdges = edges.filter(
      e => e.source === selectedNode.id || e.target === selectedNode.id
    );

    return connectedEdges.map(e => {
      const neighborId = e.source === selectedNode.id ? e.target : e.source;
      const neighborNode = nodes.find(n => n.id === neighborId);
      return {
        node: neighborNode?.data || { label: neighborId, entityType: 'ENTITY' },
        relation: e.data?.type || e.label || 'ASSOCIATED_WITH',
        confidence: e.data?.confidence || 90
      };
    }).filter(Boolean);
  }, [selectedNode, edges, nodes]);

  const handleReset = () => {
    setSearchFilter('');
    setSelectedEntityType('ALL');
    setSelectedRelationType('ALL');
    setSelectedNode(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-11rem)] rounded-xl border border-white/10 bg-dark-bg overflow-hidden shadow-2xl">
      {/* Top Filter and Search Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-[calc(100%-2rem)]">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-cyber-cyan absolute left-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter nodes..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-dark-surface/90 backdrop-blur-md border border-white/10 text-xs text-white placeholder-dark-muted focus:border-cyber-cyan focus:outline-none w-44 sm:w-56 shadow-lg"
          />
        </div>

        {/* Entity Type Filter */}
        <select
          value={selectedEntityType}
          onChange={(e) => setSelectedEntityType(e.target.value)}
          className="bg-dark-surface/90 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none shadow-lg"
        >
          {entityTypes.map(t => (
            <option key={t} value={t}>{t === 'ALL' ? 'All Entity Classes' : t}</option>
          ))}
        </select>

        {/* Relationship Filter */}
        <select
          value={selectedRelationType}
          onChange={(e) => setSelectedRelationType(e.target.value)}
          className="bg-dark-surface/90 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-cyber-cyan focus:outline-none shadow-lg hidden sm:block"
        >
          {relationTypes.map(r => (
            <option key={r} value={r}>{r === 'ALL' ? 'All Relationship Types' : r.replace(/_/g, ' ')}</option>
          ))}
        </select>

        {/* Reset View */}
        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg bg-dark-surface/90 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-colors shadow-lg"
          title="Reset graph filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend Callout Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 px-3.5 py-2 rounded-lg bg-dark-surface/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-dark-muted shadow-lg">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Normal Association
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Corroborated Record
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Conflict / Discrepancy
        </span>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: 'rgba(6, 182, 212, 0.4)', strokeWidth: 2 }
        }}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="!bg-dark-surface !border-white/10" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.data?.entityType === 'PHONE') return '#06b6d4';
            if (n.data?.entityType === 'TRANSACTION') return '#10b981';
            if (n.data?.entityType === 'URL') return '#f43f5e';
            return '#6366f1';
          }}
          maskColor="rgba(8, 13, 26, 0.7)"
          className="!bg-dark-surface !border-white/10"
        />
      </ReactFlow>

      {/* Right Drawer for selected node */}
      <GraphNodeDetailDrawer
        nodeData={selectedNode?.data}
        neighbors={selectedNeighbors}
        onClose={() => setSelectedNode(null)}
        onSelectNeighbor={(nbrNode) => {
          const match = nodes.find(n => n.id === nbrNode.id || n.data?.label === nbrNode.label);
          if (match) setSelectedNode(match);
        }}
      />
    </div>
  );
}
