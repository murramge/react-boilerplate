import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskCard } from "@/renderer/components/TaskCard";
import { TaskForm } from "@/renderer/components/TaskForm";
import { api } from "@/renderer/services/api";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export const Tasks: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const queryClient = useQueryClient();

  // Fetch tasks
  const {
    data: tasksResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => api.get("/tasks").then((res) => res.data),
  });

  const tasks: Task[] = (tasksResponse as any) || [];

  console.log(tasksResponse);

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (
      newTask: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">
    ) => api.post("/tasks", newTask).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setShowForm(false);
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Task> & { id: string }) =>
      api.put(`/tasks/${id}`, updates).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleCreateTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">
  ) => {
    createTaskMutation.mutate(taskData);
  };

  const handleToggleTask = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      completed: !task.completed,
    });
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("정말로 이 작업을 삭제하시겠습니까?")) {
      deleteTaskMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center text-red-600">
          <p>작업을 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-sm mt-2">
            {error instanceof Error ? error.message : "알 수 없는 오류"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">작업 관리</h1>
          <p className="text-gray-600 mt-1">
            총 {tasks.length}개 작업 중{" "}
            {tasks.filter((t) => t.completed).length}개 완료
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? "취소" : "+ 새 작업"}
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="card p-6">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            isLoading={createTaskMutation.isPending}
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex space-x-4">
        {(["all", "pending", "completed"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filterOption === "all" && "전체"}
            {filterOption === "pending" && "진행 중"}
            {filterOption === "completed" && "완료"}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500">
              {filter === "all" && "아직 작업이 없습니다."}
              {filter === "pending" && "진행 중인 작업이 없습니다."}
              {filter === "completed" && "완료된 작업이 없습니다."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              isUpdating={updateTaskMutation.isPending}
              isDeleting={deleteTaskMutation.isPending}
            />
          ))
        )}
      </div>
    </div>
  );
};
