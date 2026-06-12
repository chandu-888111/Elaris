import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getRoadmap, getDomainProgress, toggleNodeProgress } from "@/lib/roadmap.functions";
import { DOMAIN_BY_SLUG } from "@/lib/domains";
import { PageShell, PageHeader } from "@/components/PageHeader";
import { enrichRoadmapNode } from "@/lib/resource-engine";
import { NodeDrawer } from "@/components/NodeDrawer";
import { awardXP } from "@/lib/gamification";
import { toast } from "sonner";
import { Compass, Loader2, ArrowLeft, GraduationCap, Clock, CheckCircle } from "lucide-react";
import { type RoadmapNode as RoadmapNodeType, type RoadmapTier } from "@/lib/roadmap-catalog";
import { lazy, Suspense } from "react";
const RoadmapGalaxy = lazy(() => import("@/components/RoadmapGalaxy").then(m => ({ default: m.RoadmapGalaxy })));

export const Route = createFileRoute("/_app/roadmap/$slug")({
  head: () => ({ meta: [{ title: "Interactive Roadmap — ProjectSpark" }] }),
  component: RoadmapSlugPage,
});

type DbProgressRow = {
  tier: string;
  node_id: string;
  status: string;
  hours: number;
  hours_spent: number;
  xp_earned: number;
  bookmarked: boolean;
  completed_at: string | null;
};

function RoadmapSlugPage() {
  const { slug } = Route.useParams();
  const searchParams = Route.useSearch() as { node?: string };
  const domain = DOMAIN_BY_SLUG[slug];
  const navigate = useNavigate();

  const fetchRoadmap = useServerFn(getRoadmap);
  const fetchProgress = useServerFn(getDomainProgress);
  const updateProgress = useServerFn(toggleNodeProgress);

  const [activeTier, setActiveTier] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapTier | null>(null);
  const [dbProgress, setDbProgress] = useState<DbProgressRow[]>([]);
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeType | null>(null);

  const loadData = useCallback(
    async (t: typeof activeTier) => {
      setLoading(true);
      try {
        const [roadmapRes, progressRes] = await Promise.all([
          fetchRoadmap({ data: { slug, tier: t } }),
          fetchProgress({ data: { slug } }),
        ]);
        
        const content = roadmapRes?.content ? { ...roadmapRes.content } : null;
        if (content && content.nodes) {
          content.nodes = content.nodes.map((n) => enrichRoadmapNode(n, slug));
        }

        setRoadmapData(content || null);
        setDbProgress((progressRes?.rows || []) as DbProgressRow[]);
      } catch (e) {
        toast.error("Failed to load roadmap.");
      } finally {
        setLoading(false);
      }
    },
    [slug, fetchRoadmap, fetchProgress],
  );

  useEffect(() => {
    loadData(activeTier);
  }, [activeTier, loadData]);

  useEffect(() => {
    if (roadmapData?.nodes && searchParams.node && !selectedNode) {
      const target = roadmapData.nodes.find((n: RoadmapNodeType) => n.id === searchParams.node);
      if (target) {
        setSelectedNode(target);
      }
    }
  }, [roadmapData, searchParams.node, selectedNode]);

  const nodeStatusMap = useMemo(() => {
    const statusMap: Record<string, "locked" | "available" | "in_progress" | "completed"> = {};
    if (!roadmapData?.nodes) return statusMap;

    const normalizeId = (id: string) => id.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

    const completedSet = new Set<string>();
    const inProgressSet = new Set<string>();

    if (Array.isArray(dbProgress)) {
      dbProgress.forEach((p) => {
        const pStatus = p.status || "";
        if (pStatus.toLowerCase() === "done" || pStatus.toLowerCase() === "completed") {
          completedSet.add(p.node_id);
        } else if (pStatus.toLowerCase() === "in_progress") {
          inProgressSet.add(p.node_id);
        }
      });
    }

    roadmapData.nodes.forEach((node: RoadmapNodeType) => {
      if (completedSet.has(node.id)) {
        statusMap[node.id] = "completed";
      } else if (inProgressSet.has(node.id)) {
        statusMap[node.id] = "in_progress";
      } else {
        statusMap[node.id] = "available";
      }
    });

    return statusMap;
  }, [roadmapData, dbProgress]);

  const totalHours = useMemo(() => {
    return roadmapData?.nodes?.reduce((acc: number, n: RoadmapNodeType) => acc + (n.hours || 0), 0) || 0;
  }, [roadmapData]);

  const completedStats = useMemo(() => {
    if (!roadmapData?.nodes) return { count: 0, percent: 0 };
    const total = roadmapData.nodes.length;
    let completed = 0;
    roadmapData.nodes.forEach((n: RoadmapNodeType) => {
      if (nodeStatusMap[n.id] === "completed") completed++;
    });
    return {
      count: completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [roadmapData, nodeStatusMap]);

  const handleStatusChange = async (newStatus: "in_progress" | "done") => {
    if (!selectedNode) return;
    try {
      await updateProgress({
        data: {
          slug,
          tier: activeTier,
          nodeId: selectedNode.id,
          status: newStatus,
          hours: selectedNode.hours,
        },
      });

      if (newStatus === "done") {
        await awardXP(100, `Completed: ${selectedNode.title}`);
      }

      const progressRes = await fetchProgress({ data: { slug } });
      setDbProgress((progressRes?.rows || []) as DbProgressRow[]);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const completedIds = useMemo(() => new Set(dbProgress.filter(p => p.status === "done" || p.status === "completed").map(p => p.node_id)), [dbProgress]);
  const inProgressIds = useMemo(() => new Set(dbProgress.filter(p => p.status === "in_progress").map(p => p.node_id)), [dbProgress]);

  return (
    <PageShell>
      <PageHeader
        icon={Compass}
        title={domain?.name ?? "Interactive Roadmap"}
        description={domain?.blurb ?? "Interact, learn, and master this technology roadmap."}
        actions={
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-xs text-foreground hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to tracks</span>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* 3D Galaxy Container */}
        <div className="relative h-[650px] overflow-hidden rounded-3xl border border-white/10 bg-[#030014] shadow-2xl">
          {loading ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50">
              <Loader2 className="h-8 w-8 animate-spin text-spark" />
              <p className="mt-3 text-sm text-muted-foreground">
                Initializing learning galaxy...
              </p>
            </div>
          ) : !roadmapData ? (
             <div className="absolute inset-0 z-10 flex items-center justify-center text-muted-foreground bg-background/50">
              No roadmap available.
            </div>
          ) : (
            <Suspense fallback={
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50">
                <Loader2 className="h-8 w-8 animate-spin text-spark" />
                <p className="mt-3 text-sm text-muted-foreground">Loading 3D Galaxy...</p>
              </div>
            }>
              <RoadmapGalaxy
                nodes={roadmapData?.nodes || []}
                completedIds={completedIds}
                inProgressIds={inProgressIds}
                selectedNode={selectedNode}
                onSelectNode={(n) => setSelectedNode(n)}
                nodeStatus={selectedNode ? (nodeStatusMap[selectedNode.id] || "locked") : "locked"}
                onStatusChange={handleStatusChange}
              />
            </Suspense>
          )}
        </div>

        {/* Sidebar Info & Tier Switcher */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Galaxy Sectors (Tiers)
            </h3>
            <div className="space-y-2">
              {(["beginner", "intermediate", "advanced"] as const).map((tierKey) => (
                <button
                  key={tierKey}
                  onClick={() => setActiveTier(tierKey)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest transition ${
                    activeTier === tierKey
                      ? "bg-gradient-to-r from-spark/20 to-aurora/20 text-white border border-spark/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                      : "text-white/50 border border-white/5 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{tierKey}</span>
                  {activeTier !== tierKey && (
                    <span className="text-[9px] text-white/30 font-mono">
                      {dbProgress.filter((p) => p.tier === tierKey && p.status === "done").length} DONE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Sector Progress
            </h3>

            <div className="flex items-center gap-5">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="32" cy="32" r="26" className="stroke-white/5" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="32" cy="32" r="26"
                    className="stroke-spark" strokeWidth="4" fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - completedStats.percent / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white font-mono">
                  {completedStats.percent}%
                </span>
              </div>

              <div>
                <div className="text-sm font-bold text-white font-display">
                  {completedStats.count} / {roadmapData?.nodes?.length || 0} Orbits
                </div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-white/50 uppercase tracking-widest">
                  <GraduationCap className="h-3.5 w-3.5 text-spark" />
                  <span>{activeTier}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-5 text-xs">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Est. Time</span>
                <span className="mt-1 inline-flex items-center gap-1.5 font-bold text-white font-mono">
                  <Clock className="h-3.5 w-3.5 text-aurora" /> {totalHours}h
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">XP Earned</span>
                <span className="mt-1 inline-flex items-center gap-1.5 font-bold text-white font-mono">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  {dbProgress.filter((p) => p.tier === activeTier && p.status === "done").reduce((acc, p) => acc + (p.xp_earned || 0), 0)} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Node drawer (Side panel of features) */}
      {selectedNode && domain && roadmapData && (
        <NodeDrawer
          open={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          node={selectedNode}
          domainSlug={slug}
          domainName={domain.name}
          tier={activeTier}
          nodeStatus={nodeStatusMap[selectedNode.id] || "locked"}
          onStatusChange={handleStatusChange}
        />
      )}
    </PageShell>
  );
}
