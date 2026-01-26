import { MoreHorizontal } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const activities = [
  {
    id: 1,
    user: "Rahul M.",
    action: "uploaded",
    target: "Balance Sheet - FY 2024-25",
    time: "2 hours ago",
    client: "Sharma Enterprises",
    status: "filed", // green
  },
  {
    id: 2,
    user: "Priya K.",
    action: "marked as filed",
    target: "GST R1 - October",
    time: "Yesterday",
    client: "Patel Industries",
    status: "pending", // amber
  },
  {
    id: 3,
    user: "Amit S.",
    action: "created task",
    target: "ITR Filing - FY 2024-25",
    time: "2 days ago",
    client: "Kumar & Sons",
    status: "neutral", // gray
  },
  {
    id: 4,
    user: "Rahul M.",
    action: "assigned to",
    target: "Tax Audit Review",
    time: "3 days ago",
    client: "Sharma Enterprises",
    status: "neutral", // gray
  },
];

const AccountabilitySection = () => {
  const { ref, visible } = useInView();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed": return "bg-[#22C55E]";
      case "pending": return "bg-[#F59E0B]";
      default: return "bg-[#94A3B8]";
    }
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content - Static */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Know exactly who did what — always
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Every upload, edit, and filing is logged. See which employee handled which task. Stop dependency on memory or verbal updates.
            </p>
          </div>

          {/* Activity Log Mockup */}
          <div 
            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
          >
            <div className="px-5 py-4 border-b border-divider bg-muted/30">
              <h3 className="font-medium text-sm">Recent Activity</h3>
            </div>
            <div className="divide-y divide-divider">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`group relative px-5 py-4 flex items-start gap-4 transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Background Highlight Panel */}
                  <div className={`absolute inset-0 bg-muted/50 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 -z-10`} />
                  
                  {/* Emphasis Panel for 3-dots */}
                  <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-300 -z-10 ${expandedId === activity.id ? "opacity-100" : "opacity-0"}`} />

                  {/* Status Dot */}
                  <div className="pt-1.5 flex-shrink-0">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full ${getStatusColor(activity.status)} shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-125 ${
                        visible ? "animate-[pulse-once_1.5s_ease-in-out_1]" : ""
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-text-secondary">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {activity.client} · {activity.time}
                    </p>
                  </div>

                  {/* 3 dots control */}
                  <button 
                    onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                    className="p-1 rounded-md hover:bg-muted text-text-tertiary transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-once {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}} />
    </section>
  );
};

export default AccountabilitySection;
