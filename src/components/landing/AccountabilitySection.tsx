import { MoreHorizontal } from "lucide-react";
import { useInView } from "@/hooks/useInView";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed": return "bg-green-500";
      case "pending": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };

  const getRowBorderColor = (status: string) => {
    switch (status) {
      case "filed": return "border-green-500";
      case "pending": return "border-amber-500";
      default: return "border-slate-400";
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
                  className={`group relative px-5 py-4 flex items-start gap-4 transition-all duration-[600ms] ease-out ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } hover:bg-muted/30`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Hover Left Border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${getRowBorderColor(activity.status)} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Status Indicator */}
                  <div className="pt-1.5 flex-shrink-0 relative group/status">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full ${getStatusColor(activity.status)} transition-all duration-300 group-hover:scale-110`}
                    />
                    <div className={`absolute inset-0 -m-1 rounded-full ${getStatusColor(activity.status)} opacity-0 group-hover:opacity-20 transition-all scale-50 group-hover:scale-100`} />
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountabilitySection;
