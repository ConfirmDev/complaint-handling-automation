import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  User,
  Calendar,
  DollarSign,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface Task {
  id: string;
  caseId: string;
  location: string;
  resident: string;
  category: string;
  issue: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  estimatedPrice: number;
  dateAssigned: string;
  deadline: string;
  residentPhone?: string;
  residentEmail?: string;
}

export function ContractorMobileDashboard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [reviewPrice, setReviewPrice] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Mock data for contractor tasks
  const tasks: Task[] = [
    {
      id: '1',
      caseId: 'FCL-2024-001',
      location: 'Room 304, Block A',
      resident: 'Ahmad',
      category: 'Electrical',
      issue: 'Power socket not working',
      description: 'Main power socket in the room is not working. Need replacement.',
      priority: 'high',
      status: 'pending',
      estimatedPrice: 150,
      dateAssigned: '2024-11-23',
      deadline: '2024-11-25',
      residentPhone: '+60 12-345 6789',
      residentEmail: 'ahmad@student.edu.my',
    },
    {
      id: '2',
      caseId: 'FCL-2024-008',
      location: 'Room 215, Block B',
      resident: 'Sarah',
      category: 'Electrical',
      issue: 'Ceiling fan making noise',
      description: 'Ceiling fan making loud noise and needs inspection.',
      priority: 'medium',
      status: 'pending',
      estimatedPrice: 100,
      dateAssigned: '2024-11-23',
      deadline: '2024-11-26',
      residentPhone: '+60 13-456 7890',
    },
    {
      id: '3',
      caseId: 'FCL-2024-007',
      location: 'Room 201, Block A',
      resident: 'John',
      category: 'Electrical',
      issue: 'Light fixture flickering',
      description: 'Light fixture in bedroom is flickering constantly.',
      priority: 'medium',
      status: 'in-progress',
      estimatedPrice: 80,
      dateAssigned: '2024-11-22',
      deadline: '2024-11-24',
      residentPhone: '+60 14-567 8901',
      residentEmail: 'john@student.edu.my',
    },
    {
      id: '4',
      caseId: 'FCL-2024-005',
      location: 'Room 102, Block C',
      resident: 'Lisa',
      category: 'Electrical',
      issue: 'Circuit breaker tripping',
      description: 'Circuit breaker keeps tripping. Checked and fixed loose connection.',
      priority: 'high',
      status: 'completed',
      estimatedPrice: 200,
      dateAssigned: '2024-11-20',
      deadline: '2024-11-22',
    },
    {
      id: '5',
      caseId: 'FCL-2024-003',
      location: 'Common Area, Block A',
      resident: 'Admin',
      category: 'Electrical',
      issue: 'Hallway lights not working',
      description: 'Multiple hallway lights not working. Replaced bulbs and tested.',
      priority: 'low',
      status: 'completed',
      estimatedPrice: 120,
      dateAssigned: '2024-11-18',
      deadline: '2024-11-20',
    },
    {
      id: '6',
      caseId: 'FCL-2024-002',
      location: 'Room 405, Block B',
      resident: 'Michael',
      category: 'Electrical',
      issue: 'AC power not working',
      description: 'Air conditioning unit power socket issue. Resident cancelled request.',
      priority: 'medium',
      status: 'cancelled',
      estimatedPrice: 150,
      dateAssigned: '2024-11-15',
      deadline: '2024-11-17',
    },
  ];

  const todayTasks = tasks.filter(
    (task) => task.status === 'pending' && task.dateAssigned === '2024-11-23'
  );

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'text-gray-600';
      case 'medium':
        return 'text-blue-600';
      case 'high':
        return 'text-orange-600';
      case 'urgent':
        return 'text-red-600';
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    if (task.status === 'pending') {
      setShowDetailsModal(true);
    }
  };

  const handleAgree = () => {
    if (selectedTask) {
      toast.success(`Task ${selectedTask.caseId} accepted!`);
      setShowDetailsModal(false);
      setSelectedTask(null);
    }
  };

  const handleReviewCase = () => {
    setShowDetailsModal(false);
    setShowReviewModal(true);
    if (selectedTask) {
      setReviewPrice(selectedTask.estimatedPrice.toString());
    }
  };

  const handleSubmitReview = () => {
    if (selectedTask) {
      toast.success(`Review submitted for ${selectedTask.caseId}. Admin will be notified.`);
      setShowReviewModal(false);
      setSelectedTask(null);
      setReviewPrice('');
      setReviewNotes('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Contractor Dashboard</h1>
            <p className="text-gray-500 text-sm">Ahmad bin Hassan - Electrician</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            AH
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Today's Tasks Circle */}
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={() => {
              if (todayTasks.length > 0) {
                handleTaskClick(todayTasks[0]);
              } else {
                toast.info('No new tasks today');
              }
            }}
            className="relative group"
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex flex-col items-center justify-center text-white transition-transform group-active:scale-95">
              <div className="text-5xl">{todayTasks.length}</div>
              <div className="text-sm mt-2">New Tasks Today</div>
            </div>
            {todayTasks.length > 0 && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                !
              </div>
            )}
          </button>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-gray-900 mb-3">Filter Tasks</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Pending ({tasks.filter((t) => t.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === 'in-progress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              In Progress ({tasks.filter((t) => t.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Completed ({tasks.filter((t) => t.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Cancelled ({tasks.filter((t) => t.status === 'cancelled').length})
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <h2 className="text-gray-900 px-1">Task History</h2>
          {filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="w-full bg-white rounded-lg shadow-sm p-4 text-left active:scale-98 transition-transform"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-900">{task.caseId}</span>
                    <Badge className={`${getStatusColor(task.status)} border flex items-center gap-1 text-xs`}>
                      {getStatusIcon(task.status)}
                      {task.status}
                    </Badge>
                  </div>
                  <div className="text-gray-600 text-sm">{task.issue}</div>
                </div>
                <div className={`text-sm ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {task.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {task.dateAssigned}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div className="text-gray-600 text-sm">Estimated Price</div>
                <div className="text-gray-900">RM {task.estimatedPrice}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Task Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getStatusColor(selectedTask.status)} border`}>
                    {selectedTask.status}
                  </Badge>
                  <span className={`text-sm ${getPriorityColor(selectedTask.priority)}`}>
                    Priority: {selectedTask.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Case ID</div>
                  <div className="text-gray-900">{selectedTask.caseId}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-sm mb-1">Category</div>
                  <div className="text-gray-900">{selectedTask.category}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-sm mb-1">Issue</div>
                  <div className="text-gray-900">{selectedTask.issue}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-sm mb-1">Description</div>
                  <div className="text-gray-600 text-sm">{selectedTask.description}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Location</div>
                    <div className="text-gray-900 text-sm">{selectedTask.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Resident</div>
                    <div className="text-gray-900 text-sm">{selectedTask.resident}</div>
                  </div>
                </div>

                {selectedTask.residentPhone && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone className="w-4 h-4" />
                    {selectedTask.residentPhone}
                  </div>
                )}

                {selectedTask.residentEmail && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail className="w-4 h-4" />
                    {selectedTask.residentEmail}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Assigned Date</div>
                    <div className="text-gray-900 text-sm">{selectedTask.dateAssigned}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Deadline</div>
                    <div className="text-gray-900 text-sm">{selectedTask.deadline}</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-5 h-5" />
                      <span>Estimated Price</span>
                    </div>
                    <div className="text-gray-900 text-xl">RM {selectedTask.estimatedPrice}</div>
                  </div>
                </div>
              </div>

              {selectedTask.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleAgree}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    Agree & Start
                  </Button>
                  <Button
                    onClick={handleReviewCase}
                    variant="outline"
                    className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    Review Case
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Case Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Case</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-sm mb-1">Case ID</div>
                <div className="text-gray-900">{selectedTask.caseId}</div>
                <div className="text-gray-600 text-sm mt-2">{selectedTask.issue}</div>
              </div>

              <div>
                <Label htmlFor="reviewPrice">Proposed Price (RM)</Label>
                <Input
                  id="reviewPrice"
                  type="number"
                  value={reviewPrice}
                  onChange={(e) => setReviewPrice(e.target.value)}
                  placeholder="Enter your proposed price"
                  className="mt-1"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Original estimate: RM {selectedTask.estimatedPrice}
                </p>
              </div>

              <div>
                <Label htmlFor="reviewNotes">Notes for Admin</Label>
                <Textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Explain why you need to adjust the price or discuss with admin..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSubmitReview} className="flex-1">
                  Submit Review
                </Button>
                <Button
                  onClick={() => {
                    setShowReviewModal(false);
                    setShowDetailsModal(true);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
