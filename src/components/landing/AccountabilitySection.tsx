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
  },
  {
    icon: CheckCircle,
    user: "Priya K.",
    action: "marked as filed",
    target: "GST R1 - October",
    time: "Yesterday",
    client: "Patel Industries",
  },
  {
    icon: FileText,
    user: "Amit S.",
    action: "created task",
    target: "ITR Filing - FY 2024-25",
    time: "2 days ago",
    client: "Kumar & Sons",
  },
  {
    icon: User,
    user: "Rahul M.",
    action: "assigned to",
    target: "Tax Audit Review",
    time: "3 days ago",
    client: "Sharma Enterprises",
  },
];

const AccountabilitySection = () => {
  const { ref, visible } = useInView();

  const baseTransition = "transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";
  const rowTransition = "transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content */}
          <div>
            <h2 
              className={`text-3xl md:text-4xl font-semibold tracking-tight mb-4 ${baseTransition} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              Know exactly who did what
            </h2>
            <p 
              className={`text-text-secondary text-lg mb-8 ${baseTransition} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Every upload, edit, and filing is logged. Complete audit trail without dependency on memory.
            </p>
            
            <ul className="space-y-4">
              {["Complete audit trail for every action", "Employee-wise work attribution", "Historical records accessible anytime"].map((item, index) => (
                <li 
                  key={index}
                  className={`flex items-start gap-3 ${baseTransition} ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity Log Mockup */}
          <div 
            className={`bg-card rounded-xl border border-border overflow-hidden ${baseTransition} ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="px-5 py-4 border-b border-divider bg-muted/30">
              <h3 className="font-medium text-sm">Recent Activity</h3>
            </div>
            <div className="divide-y divide-divider">
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`px-5 py-4 flex items-start gap-4 hover:bg-muted/30 cursor-default ${rowTransition} ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-text-secondary" />
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
