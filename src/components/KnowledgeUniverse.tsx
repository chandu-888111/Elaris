import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/utils";
import { Book, Brain, Briefcase, Code2, GraduationCap, Network, Star, Target } from "lucide-react";
import { useEcosystemStore } from "@/stores/useEcosystemStore";

// Custom Node Types
interface BaseNodeProps {
  data: {
    label: string;
    difficulty?: string;
  };
  type?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  isGlowing?: boolean;
}

const BaseNode = ({ data, type, icon: Icon, color, isGlowing }: BaseNodeProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-xl border bg-black/80 backdrop-blur-md flex items-center gap-3 transition-all duration-300",
        isGlowing ? `shadow-[0_0_20px_${color}] border-[${color}]` : "border-white/10",
        `hover:border-[${color}] hover:shadow-[0_0_15px_${color}]`,
      )}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-white/20 border-none" />
      <div className={cn("p-1.5 rounded-md", `bg-[${color}]/10`)}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <div className="text-xs font-bold text-white tracking-wide">{data.label}</div>
        {data.difficulty && (
          <div className="text-[9px] uppercase tracking-widest text-white/50">
            {data.difficulty}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-white/20 border-none"
      />
    </div>
  );
};

const nodeTypes = {
  concept: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Brain} color="#8b5cf6" />
  ),
  subtopic: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Network} color="#3b82f6" />
  ),
  prerequisite: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Book} color="#ef4444" />
  ),
  project: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Code2} color="#10b981" />
  ),
  interview: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Briefcase} color="#f59e0b" />
  ),
  certification: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Star} color="#eab308" />
  ),
  career: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={Target} color="#ec4899" />
  ),
  resource: (props: NodeProps) => (
    <BaseNode {...(props as unknown as BaseNodeProps)} icon={GraduationCap} color="#06b6d4" />
  ),
};

interface KnowledgeMapData {
  difficulty?: string;
  dependencies?: string[];
  subtopics?: string[];
  projectApplications?: string[];
}

interface KnowledgeUniverseProps {
  knowledgeMap: KnowledgeMapData;
  className?: string;
}

export function KnowledgeUniverse({ knowledgeMap, className }: KnowledgeUniverseProps) {
  const { skillGraph } = useEcosystemStore();
  const [selectedNodeData, setSelectedNodeData] = useState<{
    label: string;
    difficulty?: string;
  } | null>(null);

  // Generate nodes from knowledge map
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!knowledgeMap) return { initialNodes: [], initialEdges: [] };

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let yOffset = 0;

    // Center root Concept
    nodes.push({
      id: "root",
      type: "concept",
      position: { x: 250, y: yOffset },
      data: { label: "Core Concept", difficulty: knowledgeMap.difficulty || "medium" },
    });

    yOffset += 100;

    // Prerequisites
    (knowledgeMap.dependencies || []).forEach((dep: string, i: number) => {
      const id = `dep-${i}`;
      nodes.push({
        id,
        type: "prerequisite",
        position: { x: 50 + i * 150, y: yOffset },
        data: { label: dep },
      });
      edges.push({
        id: `e-root-${id}`,
        source: "root",
        target: id,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    });

    yOffset += 100;

    // Subtopics
    (knowledgeMap.subtopics || []).forEach((sub: string, i: number) => {
      const id = `sub-${i}`;
      nodes.push({
        id,
        type: "subtopic",
        position: { x: 100 + i * 180, y: yOffset },
        data: { label: sub },
      });
      edges.push({ id: `e-root-${id}`, source: "root", target: id });
    });

    yOffset += 120;

    // Projects
    (knowledgeMap.projectApplications || []).forEach((proj: string, i: number) => {
      const id = `proj-${i}`;
      nodes.push({
        id,
        type: "project",
        position: { x: 150 + i * 200, y: yOffset },
        data: { label: proj },
      });
      edges.push({ id: `e-root-${id}`, source: "root", target: id, animated: true });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [knowledgeMap]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data as { label: string; difficulty?: string });
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/50",
        className,
      )}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-black/20"
      >
        <Background color="rgba(255,255,255,0.05)" gap={16} size={1} />
        <Controls className="!bg-black/50 !border-white/10 !fill-white" />
        <MiniMap
          className="!bg-black/50 !border-white/10"
          maskColor="rgba(0,0,0,0.5)"
          nodeColor={(n) => {
            switch (n.type) {
              case "concept":
                return "#8b5cf6";
              case "project":
                return "#10b981";
              case "prerequisite":
                return "#ef4444";
              default:
                return "#3b82f6";
            }
          }}
        />
      </ReactFlow>

      {/* Side Panel on Click */}
      {selectedNodeData && (
        <div className="absolute top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-white/10 p-6 transform transition-transform animate-in slide-in-from-right shadow-2xl z-10">
          <button
            onClick={() => setSelectedNodeData(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold text-white mb-2">{selectedNodeData.label}</h3>
          {selectedNodeData.difficulty && (
            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-white/10 rounded-md text-white/70 mb-6">
              Difficulty: {selectedNodeData.difficulty}
            </span>
          )}

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-spark uppercase tracking-widest mb-2">
                Mentor Explanation
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                This node represents a core capability. Understanding {selectedNodeData.label}{" "}
                unlocks advanced architectural patterns and allows you to build more complex
                features.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                Related Projects
              </h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li className="flex items-center gap-2">
                  <Code2 className="w-3 h-3" /> Portfolio Integration
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-3 h-3" /> Micro-SaaS Tool
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                Interview Focus
              </h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li className="flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> System Design
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Edge Cases & Tradeoffs
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
