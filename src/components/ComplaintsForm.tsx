import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

export function ComplaintsForm() {
  const [formData, setFormData] = useState({
    location: "",
    residentName: "",
    email: "",
    phone: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Facility complaint registered successfully!");
    // Reset form
    setFormData({
      location: "",
      residentName: "",
      email: "",
      phone: "",
      category: "",
      priority: "",
      subject: "",
      description: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">
          Register Facility Complaint
        </h1>
        <p className="text-gray-500">
          Report facility issues and maintenance requests
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="space-y-6">
          {/* Location & Resident Information Section */}
          <div>
            <h2 className="text-gray-900 mb-4">
              Location & Resident Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">
                  Room/Location *
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleChange("location", e.target.value)
                  }
                  required
                  placeholder="e.g., Room 304, Block A, Common Area"
                />
              </div>
              <div>
                <Label htmlFor="residentName">
                  Resident Name *
                </Label>
                <Input
                  id="residentName"
                  type="text"
                  value={formData.residentName}
                  onChange={(e) =>
                    handleChange("residentName", e.target.value)
                  }
                  required
                  placeholder="Enter resident name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                  placeholder="resident@student.edu.my"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                  required
                  placeholder="(+60) 10 0000 000"
                />
              </div>
            </div>
          </div>

          {/* Complaint Details Section */}
          <div>
            <h2 className="text-gray-900 mb-4">
              Issue Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">
                        Electrical
                      </SelectItem>
                      <SelectItem value="carpentry">
                        Carpentry
                      </SelectItem>
                      <SelectItem value="plumbing">
                        Plumbing
                      </SelectItem>
                      <SelectItem value="air-conditioning">
                        Air Conditioning
                      </SelectItem>
                      <SelectItem value="elevator">
                        Elevator
                      </SelectItem>
                      <SelectItem value="cleaning">
                        Cleaning/Sanitation
                      </SelectItem>
                      <SelectItem value="security">
                        Security
                      </SelectItem>
                      <SelectItem value="furniture">
                        Furniture/Fittings
                      </SelectItem>
                      <SelectItem value="other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleChange("priority", value)
                    }
                    required
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">
                        Medium
                      </SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">
                        Urgent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Issue Summary *</Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    handleChange("subject", e.target.value)
                  }
                  required
                  placeholder="Brief summary of the issue"
                />
              </div>

              <div>
                <Label htmlFor="description">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                  required
                  placeholder="Provide detailed information about the facility issue..."
                  rows={6}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="px-6">
              Submit Complaint
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  location: "",
                  residentName: "",
                  email: "",
                  phone: "",
                  category: "",
                  priority: "",
                  subject: "",
                  description: "",
                })
              }
            >
              Clear Form
            </Button>
          </div>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-900 text-sm">
          <span>💡 Tip:</span> Fields marked with * are
          required. For urgent issues (electrical hazards, water leaks, elevator malfunctions), 
          please also contact the facility manager immediately.
        </p>
      </div>
    </div>
  );
}