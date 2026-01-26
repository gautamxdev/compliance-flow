import { User, FileText, CheckCircle, Upload } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const activities = [
  {
    icon: Upload,
    user: "Rahul M.",
    action: "uploaded",
    target: "Balance Sheet - FY 2024-25",
    time: "2 hours ago",
    client: "Sharma Enterprises",
    status: "neutral",
  },
  {
    icon: CheckCircle,
    user: "Priya K.",
    action: "marked as filed",
    target: "GST R1 - October",
    time: "Yesterday",
    client: "Patel Industries",
    status: "success",
  },
  {
    icon: FileText,
    user: "Amit S.",
    action: "created task",
    target: "ITR Filing - FY 2024-25",
    time: "2 days ago",
    client: "Kumar & Sons",
    status: "pending",
  },
  {
    icon: User,
    user: "Rahul M.",
    action: "assigned to",
    target: "Tax Audit Review",
    time: "3 days ago",
    client: "Sharma Enterprises",
    status: "neutral",
  },
];

const statusColors = {
  success: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  neutral: "bg-muted text-text-secondary",
};

const AccountabilitySection = () => {
  const { ref, visible } = useInView();

  const rowTransition = "transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content - No animations on text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Know exactly who did what
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Every upload, edit, and filing is logged. Complete audit trail without dependency on memory.
            </p>
            
            <ul className="space-y-4">
              {["Complete audit trail for every action", "Employee-wise work attribution", "Historical records accessible anytime"].map((item, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity Log Mockup - Primary animation zone */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-divider bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <h3 className="font-medium text-sm">Recent Activity</h3>
              </div>
            </div>
            <div className="divide-y divide-divider">
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`px-5 py-4 flex items-start gap-4 hover:bg-muted/30 cursor-default ${rowTransition} ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Icon with subtle pulse effect */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${statusColors[activity.status as keyof typeof statusColors]}`}>
                    <activity.icon className="w-4 h-4" />
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
