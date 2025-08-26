import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

interface TaskFormProps {
  onSubmit: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">
  ) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    } else if (formData.title.length > 100) {
      newErrors.title = "제목은 100자 이하로 입력해주세요.";
    }

    if (formData.description.length > 500) {
      newErrors.description = "설명은 500자 이하로 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">새 작업 추가</h3>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="form-label">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className={`form-input ${
            errors.title ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="작업 제목을 입력하세요"
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.title.length}/100자
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="form-label">
          설명
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className={`form-input ${
            errors.description ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="작업에 대한 상세 설명을 입력하세요 (선택사항)"
          rows={3}
          maxLength={500}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/500자
        </p>
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="form-label">
          우선순위
        </label>
        <select
          id="priority"
          value={formData.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          className="form-input"
        >
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
              추가 중...
            </div>
          ) : (
            "작업 추가"
          )}
        </button>
      </div>
    </form>
  );
};
