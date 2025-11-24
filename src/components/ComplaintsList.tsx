import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Complaint {
  id: string;
  complaintId: string;
  customerName: string;
  email: string | null;
  category: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  subject: string;
  date: string;
}

export function ComplaintsList() {
  const [searchQuery, setSearchQuery] = useState("");

  const complaints: Complaint[] = [
    {
      id: "1",
      complaintId: "FCL-2024-001",
      customerName: "Room 304 - Ahmad",
      email: "ahmad@student.edu.my",
      category: "Electrical",
      status: "pending",
      priority: "high",
      subject: "Power socket not working",
      date: "2024-11-23",
    },
    {
      id: "2",
      complaintId: "FCL-2024-002",
      customerName: "Room 205 - Sarah",
      email: null,
      category: "Air Conditioning",
      status: "in-progress",
      priority: "medium",
      subject: "AC not cooling properly",
      date: "2024-11-22",
    },
    {
      id: "3",
      complaintId: "FCL-2024-003",
      customerName: "Room 108 - Michael",
      email: "michael@student.edu.my",
      category: "Plumbing",
      status: "resolved",
      priority: "low",
      subject: "Slow water drainage in toilet",
      date: "2024-11-21",
    },
    {
      id: "4",
      complaintId: "FCL-2024-004",
      customerName: "Block A - Emily",
      email: "emily@student.edu.my",
      category: "Elevator",
      status: "pending",
      priority: "urgent",
      subject: "Elevator stuck on 3rd floor",
      date: "2024-11-23",
    },
    {
      id: "5",
      complaintId: "FCL-2024-005",
      customerName: "Room 412 - David",
      email: "david@student.edu.my",
      category: "Carpentry",
      status: "closed",
      priority: "medium",
      subject: "Broken wardrobe door",
      date: "2024-11-20",
    },
    {
      id: "6",
      complaintId: "FCL-2024-006",
      customerName: "Common Area - Lisa",
      email: "lisa@student.edu.my",
      category: "Plumbing",
      status: "in-progress",
      priority: "high",
      subject: "Water leak in common toilet",
      date: "2024-11-23",
    },
    {
      id: "7",
      complaintId: "FCL-2024-007",
      customerName: "Room 201 - John",
      email: "john@student.edu.my",
      category: "Electrical",
      status: "pending",
      priority: "medium",
      subject: "Light fixture flickering",
      date: "2024-11-22",
    },
  ];

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (
    priority: Complaint["priority"],
  ) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "urgent":
        return "bg-red-100 text-red-700";
    }
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      complaint.complaintId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (complaint.email &&
        complaint.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      complaint.subject
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Facility Complaints List</h1>
        <p className="text-gray-500">
          Manage and track all facility maintenance requests
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Location/Resident
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-900">
                    {complaint.complaintId}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">
                        {complaint.customerName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {complaint.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {complaint.subject}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {complaint.category}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={getPriorityColor(
                        complaint.priority,
                      )}
                    >
                      {complaint.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={getStatusColor(
                        complaint.status,
                      )}
                    >
                      {complaint.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {complaint.date}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            Showing {filteredComplaints.length} of{" "}
            {complaints.length} complaints
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}