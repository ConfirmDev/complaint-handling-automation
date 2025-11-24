import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { ComplaintsList } from "./components/ComplaintsList";
import { ComplaintsForm } from "./components/ComplaintsForm";
import { ContractorList } from "./components/ContractorList";
import { ContractorMobileDashboard } from "./components/ContractorMobileDashboard";
import { Bell, User, X } from "lucide-react";
import { FloatingActionButton } from "./components/FloatingActionButton";

type Page = "dashboard" | "list" | "contractor" | "register" | "stats";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'urgent' | 'info' | 'success';
}

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If mobile, show contractor dashboard
  if (isMobile) {
    return <ContractorMobileDashboard />;
  }

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Urgent: Elevator Malfunction',
      message: 'Building A elevator is out of service. Maintenance team dispatched.',
      time: '5 min ago',
      read: false,
      type: 'urgent'
    },
    {
      id: '2',
      title: 'AC Repair Completed',
      message: 'Air conditioning unit in Room 304 has been fixed.',
      time: '1 hour ago',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'New Complaint Registered',
      message: 'Toilet plumbing issue reported in Block C, Room 205.',
      time: '2 hours ago',
      read: false,
      type: 'info'
    },
    {
      id: '4',
      title: 'Scheduled Maintenance',
      message: 'Electrical inspection scheduled for tomorrow at 9 AM.',
      time: '3 hours ago',
      read: true,
      type: 'info'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white">A</span>
            </div>
            <div>
              <div className="text-gray-900">Admin</div>
              <div className="text-gray-500 text-sm">
                @ADMIN
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notif.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notif.type === 'urgent' ? 'bg-red-500' :
                            notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="text-gray-900 text-sm">{notif.title}</div>
                            <div className="text-gray-600 text-xs mt-1">{notif.message}</div>
                            <div className="text-gray-400 text-xs mt-1">{notif.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-blue-500 text-sm hover:text-blue-600">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="relative">
              <User className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 flex gap-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`px-3 py-3 border-b-2 transition-colors ${
              currentPage === "dashboard"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage("list")}
            className={`px-3 py-3 border-b-2 transition-colors ${
              currentPage === "list"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Complaints
          </button>
          <button
            onClick={() => setCurrentPage("contractor")}
            className={`px-3 py-3 border-b-2 transition-colors ${
              currentPage === "contractor"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Contractor
          </button>
          <button
            onClick={() => setCurrentPage("register")}
            className={`px-3 py-3 border-b-2 transition-colors ${
              currentPage === "register"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Register Panel
          </button>
          <button
            onClick={() => setCurrentPage("stats")}
            className={`px-3 py-3 border-b-2 transition-colors ${
              currentPage === "stats"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Settings
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {currentPage === "dashboard" && (
          <Dashboard onNavigate={setCurrentPage} />
        )}
        {currentPage === "list" && <ComplaintsList />}
        {currentPage === "contractor" && <ContractorList />}
        {currentPage === "register" && <ComplaintsForm />}
        {currentPage === "stats" && (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-gray-900 mb-2">
              Statistics Report
            </h1>
            <p className="text-gray-500 mb-6">
              Detailed analytics and reports
            </p>
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Statistics page content coming soon...
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setCurrentPage("register")} />
    </div>
  );
}