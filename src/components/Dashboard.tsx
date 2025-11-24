import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  FileText,
  History,
  Calendar,
  BarChart3,
  Settings,
  Users,
  Activity,
  MessageSquare,
  Archive,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (
    page: "dashboard" | "list" | "contractor" | "register" | "stats",
  ) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Today Total Complaints",
      value: "12",
      //subtitle: "Updated in real-time",
      icon: Package,
      color: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Weekly Total Complaints",
      value: "47",
      //subtitle: "Updated in last time",
      icon: TrendingUp,
      color: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Total Pending Case",
      value: "8",
      //subtitle: "Updated in real-time",
      icon: Clock,
      color: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      title: "Total Resolved Case",
      value: "39",
      //subtitle: "Updated in last time",
      icon: CheckCircle2,
      color: "bg-green-50",
      iconColor: "text-green-500",
    },
  ];

  const quickActions = [
    {
      label: "Contact",
      icon: Phone,
      color: "text-blue-500",
    },
    {
      label: "Open Sheet",
      icon: FileText,
      color: "text-green-500",
    },
    {
      label: "History",
      icon: History,
      color: "text-red-500",
    },
    {
      label: "Schedule",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      label: "Reports",
      icon: BarChart3,
      color: "text-pink-500",
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-blue-500",
    },
    { label: "Users", icon: Users, color: "text-orange-500" },
    {
      label: "Analytics",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      color: "text-pink-500",
    },
    {
      label: "Archives",
      icon: Archive,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">
          Hostel Facilities Management
        </h1>
        <p className="text-gray-500">
          Overview of facility maintenance and complaints
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-gray-600 text-sm mb-2">
                  {stat.title}
                </div>
                <div className="text-gray-900 text-3xl mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.subtitle}
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon
                  className={`w-6 h-6 ${stat.iconColor}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => {
                if (action.label === "Open Sheet") {
                  onNavigate("list");
                }
              }}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-2 ${action.color}`}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-gray-700 text-sm text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}