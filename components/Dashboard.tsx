"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Bell,
  Search,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Won"
  | "Lost";

interface LeadOverTime {
  month: string;
  leads: number;
  converted: number;
  lost: number;
}
interface LeadSource {
  name: string;
  value: number;
  color: string;
}
interface LeadByStatus {
  name: string;
  count: number;
  fill: string;
}
interface FunnelItem {
  name: string;
  value: number;
  fill: string;
}
interface RecentLead {
  id: number;
  name: string;
  company: string;
  source: string;
  status: LeadStatus;
  value: string;
  time: string;
  avatar: string;
}
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  color: string;
  delay: number;
}
interface TooltipPayloadItem {
  color?: string;
  value?: string | number;
  name?: string;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const mockLeadsOverTime: LeadOverTime[] = [
  { month: "Jul", leads: 42, converted: 18, lost: 8 },
  { month: "Aug", leads: 58, converted: 24, lost: 12 },
  { month: "Sep", leads: 73, converted: 31, lost: 9 },
  { month: "Oct", leads: 61, converted: 27, lost: 15 },
  { month: "Nov", leads: 89, converted: 41, lost: 11 },
  { month: "Dec", leads: 94, converted: 48, lost: 7 },
  { month: "Jan", leads: 112, converted: 56, lost: 13 },
  { month: "Feb", leads: 128, converted: 64, lost: 9 },
];

const mockBySource: LeadSource[] = [
  { name: "Organic", value: 34, color: "#6EE7B7" },
  { name: "Paid Ads", value: 28, color: "#818CF8" },
  { name: "Referral", value: 19, color: "#F9A8D4" },
  { name: "Social", value: 12, color: "#FCD34D" },
  { name: "Direct", value: 7, color: "#67E8F9" },
];

const mockByStatus: LeadByStatus[] = [
  { name: "New", count: 48, fill: "#6EE7B7" },
  { name: "Contacted", count: 72, fill: "#818CF8" },
  { name: "Qualified", count: 41, fill: "#F9A8D4" },
  { name: "Proposal", count: 29, fill: "#FCD34D" },
  { name: "Won", count: 64, fill: "#34D399" },
  { name: "Lost", count: 22, fill: "#F87171" },
];

const mockRecentLeads: RecentLead[] = [
  {
    id: 1,
    name: "Sophia Chen",
    company: "Vertex Labs",
    source: "Organic",
    status: "Qualified",
    value: "$12,400",
    time: "2m ago",
    avatar: "SC",
  },
  {
    id: 2,
    name: "Marcus Webb",
    company: "Ironclad.io",
    source: "Referral",
    status: "New",
    value: "$8,900",
    time: "14m ago",
    avatar: "MW",
  },
  {
    id: 3,
    name: "Aisha Patel",
    company: "NovaStar Inc",
    source: "Paid Ads",
    status: "Proposal",
    value: "$31,200",
    time: "1h ago",
    avatar: "AP",
  },
  {
    id: 4,
    name: "Luca Ferretti",
    company: "CloudBridge",
    source: "Social",
    status: "Contacted",
    value: "$6,750",
    time: "3h ago",
    avatar: "LF",
  },
  {
    id: 5,
    name: "Zara Okonkwo",
    company: "Pulse Systems",
    source: "Direct",
    status: "Won",
    value: "$22,500",
    time: "5h ago",
    avatar: "ZO",
  },
];

const conversionFunnel: FunnelItem[] = [
  { name: "Visitors", value: 8400, fill: "#818CF8" },
  { name: "Leads", value: 2847, fill: "#6EE7B7" },
  { name: "Qualified", value: 1124, fill: "#F9A8D4" },
  { name: "Customers", value: 328, fill: "#FCD34D" },
];

const statusClasses: Record<LeadStatus, string> = {
  New: "bg-emerald-500/15 text-emerald-400",
  Contacted: "bg-indigo-500/15 text-indigo-400",
  Qualified: "bg-pink-500/15 text-pink-400",
  Proposal: "bg-amber-500/15 text-amber-400",
  Won: "bg-teal-500/15 text-teal-400",
  Lost: "bg-red-500/15 text-red-400",
};

const avatarGradients: [string, string][] = [
  ["#6EE7B7", "#34D399"],
  ["#818CF8", "#6366F1"],
  ["#F9A8D4", "#EC4899"],
  ["#67E8F9", "#06B6D4"],
  ["#FCD34D", "#F59E0B"],
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[rgba(15,17,26,0.95)] px-4 py-3 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 font-mono text-[11px] tracking-widest text-gray-400">
          {label}
        </p>
        {payload.map((p: TooltipPayloadItem, i: number) => (
          <div key={i} className="mb-1 flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: p.color ?? "#6EE7B7" }}
            />
            <span className="text-sm font-semibold text-gray-100">
              {p.value}
            </span>
            <span className="text-[11px] text-gray-500">{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  positive,
  color,
  delay,
}: StatCardProps) => (
  <div
    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.12]"
    style={{ animation: `slideUp 0.6s ease ${delay}s both` }}
  >
    <div
      className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-15 blur-2xl"
      style={{ background: color }}
    />
    <div className="mb-4 flex items-start justify-between">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-[10px]"
        style={{ background: `${color}22`, border: `1px solid ${color}33` }}
      >
        <Icon size={18} color={color} />
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}
      >
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="font-mono text-[28px] font-bold tracking-tight text-gray-100">
      {value}
    </div>
    <div className="mt-1 text-xs tracking-wide text-gray-500">{label}</div>
  </div>
);

const CardShell = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 ${className}`}
  >
    {children}
  </div>
);

export default function Dashboard() {
  const [animatedLeads, setAnimatedLeads] = useState(0);

  useEffect(() => {
    const target = 2847;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedLeads(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#090B12] font-sans text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        body { font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0F111A; }
        ::-webkit-scrollbar-thumb { background: #2A2D3E; border-radius: 4px; }
      `}</style>

      <div className="overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.05] bg-[rgba(9,11,18,0.85)] px-8 py-6 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              March 2026 · All sources
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-[10px] border border-white/[0.07] bg-white/[0.04] px-3.5 py-2">
              <Search size={14} className="text-gray-500" />
              <span className="text-xs text-gray-600">Search leads...</span>
            </div>
            <button className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/[0.07] bg-white/[0.04] transition hover:bg-white/[0.08]">
              <Bell size={15} className="text-gray-400" />
            </button>
            <button className="rounded-[10px] bg-gradient-to-r from-emerald-300 to-emerald-400 px-4 py-2 text-xs font-bold text-[#0F111A] transition hover:opacity-90">
              + Add Lead
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Stat Cards */}
          <div className="mb-7 grid grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Total Leads"
              value={animatedLeads.toLocaleString()}
              change="18.2%"
              positive
              color="#6EE7B7"
              delay={0}
            />
            <StatCard
              icon={TrendingUp}
              label="Conversion Rate"
              value="11.5%"
              change="2.4%"
              positive
              color="#818CF8"
              delay={0.1}
            />
            <StatCard
              icon={Target}
              label="Deals Won"
              value="$284K"
              change="31.7%"
              positive
              color="#F9A8D4"
              delay={0.2}
            />
            <StatCard
              icon={Zap}
              label="Avg. Resp. Time"
              value="1.8h"
              change="0.3h"
              positive={false}
              color="#FCD34D"
              delay={0.3}
            />
          </div>

          {/* Row 2: Area + Pie */}
          <div
            className="mb-4 grid gap-4"
            style={{
              gridTemplateColumns: "1fr 340px",
              animation: "slideUp 0.6s ease 0.4s both",
            }}
          >
            {/* Lead Velocity */}
            <CardShell>
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Lead Velocity</h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Leads acquired over time
                  </p>
                </div>
                <div className="flex gap-2">
                  {(["1M", "3M", "6M", "1Y"] as const).map((t, i) => (
                    <button
                      key={t}
                      className={`rounded-md px-2.5 py-1 text-[11px] transition ${
                        i === 2
                          ? "border border-emerald-400/30 bg-emerald-400/15 text-emerald-400"
                          : "text-gray-500 hover:text-gray-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={mockLeadsOverTime}
                  margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                >
                  <defs>
                    <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#6EE7B7"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#818CF8"
                        stopOpacity={0.25}
                      />
                      <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    name="Leads"
                    stroke="#6EE7B7"
                    strokeWidth={2}
                    fill="url(#leadsGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="converted"
                    name="Converted"
                    stroke="#818CF8"
                    strokeWidth={2}
                    fill="url(#convGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardShell>

            {/* Lead Sources */}
            <CardShell>
              <h3 className="mb-1 text-sm font-semibold">Lead Sources</h3>
              <p className="mb-5 text-xs text-gray-500">
                Traffic breakdown by channel
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={mockBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mockBySource.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0F111A",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {mockBySource.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 shrink-0 rounded-sm"
                        style={{ background: s.color }}
                      />
                      <span className="text-xs text-gray-400">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="h-[3px] w-[60px] overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.value}%`, background: s.color }}
                        />
                      </div>
                      <span className="w-7 text-right font-mono text-[11px] text-gray-500">
                        {s.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardShell>
          </div>

          {/* Row 3: Bar + Funnel */}
          <div
            className="mb-4 grid gap-4"
            style={{ gridTemplateColumns: "1fr 300px" }}
          >
            {/* Pipeline by Stage */}
            <CardShell
              style={
                {
                  animation: "slideUp 0.6s ease 0.55s both",
                } as React.CSSProperties
              }
            >
              <h3 className="mb-1 text-sm font-semibold">Pipeline by Stage</h3>
              <p className="mb-6 text-xs text-gray-500">
                Leads distributed across all stages
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={mockByStatus}
                  margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
                  barSize={28}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Leads" radius={[5, 5, 0, 0]}>
                    {mockByStatus.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardShell>

            {/* Conversion Funnel */}
            <CardShell
              style={
                {
                  animation: "slideUp 0.6s ease 0.6s both",
                } as React.CSSProperties
              }
            >
              <h3 className="mb-1 text-sm font-semibold">Conversion Funnel</h3>
              <p className="mb-4 text-xs text-gray-500">Visitors → Customers</p>
              <div className="flex flex-col gap-2.5">
                {conversionFunnel.map((item) => {
                  const pct = Math.round(
                    (item.value / conversionFunnel[0].value) * 100,
                  );
                  return (
                    <div key={item.name}>
                      <div className="mb-1.5 flex justify-between">
                        <span className="text-xs text-gray-400">
                          {item.name}
                        </span>
                        <span className="font-mono text-xs font-semibold text-gray-100">
                          {item.value.toLocaleString()}{" "}
                          <span className="font-normal text-gray-500">
                            ({pct}%)
                          </span>
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: item.fill }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 rounded-[10px] border border-emerald-400/15 bg-emerald-400/[0.07] p-3">
                <p className="mb-0.5 text-[11px] text-gray-500">Overall CVR</p>
                <p className="font-mono text-[22px] font-bold text-emerald-400">
                  3.9%
                </p>
              </div>
            </CardShell>
          </div>

          {/* Recent Leads */}
          <div
            className="overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.02]"
            style={{ animation: "slideUp 0.6s ease 0.65s both" }}
          >
            <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-5">
              <div>
                <h3 className="text-sm font-semibold">Recent Leads</h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Latest activity across all channels
                </p>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.04] px-3.5 py-1.5 text-xs text-gray-400 transition hover:bg-white/[0.08]">
                View all <ChevronRight size={13} />
              </button>
            </div>

            <div>
              {mockRecentLeads.map((lead, i) => {
                const [from, to] = avatarGradients[i] ?? ["#6EE7B7", "#34D399"];
                return (
                  <div
                    key={lead.id}
                    className={`group flex cursor-pointer items-center px-6 py-4 transition-colors hover:bg-white/[0.02] ${
                      i < mockRecentLeads.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                  >
                    <div
                      className="mr-3.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-[#0F111A]"
                      style={{
                        background: `linear-gradient(135deg, ${from}, ${to})`,
                      }}
                    >
                      {lead.avatar}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-gray-100">
                        {lead.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {lead.company}
                      </div>
                    </div>

                    <div className="w-[90px] text-xs text-gray-500">
                      {lead.source}
                    </div>

                    <div className="w-[110px]">
                      <span
                        className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${statusClasses[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="w-[90px] text-right font-mono text-[13px] font-semibold text-gray-100">
                      {lead.value}
                    </div>

                    <div className="w-[70px] text-right text-[11px] text-gray-600">
                      {lead.time}
                    </div>

                    <button className="ml-4 p-1 text-gray-600 transition hover:text-gray-400">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
