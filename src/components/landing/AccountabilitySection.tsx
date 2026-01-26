import { User, FileText, CheckCircle, Upload } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useState, useEffect } from "react";

const initialActivities = [
  {
    id: 1,
    icon: Upload,
    user: "Rahul M.",
    action: "uploaded",
    target: "Balance Sheet - FY 2024-25",
    time: "2 hours ago",
    client: "Sharma Enterprises",
    type: "upload",
  },
  {
    id: 2,
    icon: CheckCircle,
    user: "Priya K.",
    action: "marked as filed",
    target: "GST R1 - October",
    time: "Yesterday",
    client: "Patel Industries",
    type: "filed",
  },
  {
    id: 3,
    icon: FileText,
    user: "Amit S.",
    action: "created task",
    target: "ITR Filing - FY 2024-25",
    time: "2 days ago",
    client: "Kumar & Sons",
    type: "neutral",
  },
  {
    id: 4,
    icon: User,
    user: "Rahul M.",
    action: "assigned to",
    target: "Tax Audit Review",
    time: "3 days ago",
    client: "Sharma Enterprises",
    type: "assigned",
  },
];

const AccountabilitySection = () => {
  const { ref, visible } = useInView();
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      const newActivity = {
        ...initialActivities[Math.floor(Math.random() * initialActivities.length)],
        id: Date.now(),
        time: "Just now",
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 6000);
    return () => clearInterval(interval);
  }, [visible]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "upload": return "bg-blue-50/50 dark:bg-blue-900/10";
      case "filed": return "bg-green-50/50 dark:bg-green-900/10";
      case "assigned": return "bg-gray-50/50 dark:bg-gray-900/10";
      default: return "bg-transparent";
    }
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-divider">
      <div className="container mx-auto px-6">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content - Static as per instructions */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Know exactly who did what — always
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Every upload, edit, and filing is logged. See which employee handled which task. Stop dependency on memory or verbal updates.
            </p>
            
            <ul className="space-y-4">
              {["Complete audit trail for every action", "Employee-wise work attribution", "Historical records accessible anytime"].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-[pulse-once_2s_ease-in-out]"></div>
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity Log Mockup */}
          <div 
            className={`bg-card rounded-xl border border-border overflow-hidden transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="px-5 py-4 border-b border-divider bg-muted/30">
              <h3 className="font-medium text-sm">Recent Activity</h3>
            </div>
            <div className="relative h-[340px] overflow-hidden">
              <div className="divide-y divide-divider">
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className={`px-5 py-4 flex items-start gap-4 transition-all duration-500 ease-out ${getTypeStyles(activity.type)} ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/40 mt-2 flex-shrink-0 animate-[pulse-once_2s_ease-in-out]" />
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
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-once {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}} />
    </section>
  );
};

export default AccountabilitySection;
