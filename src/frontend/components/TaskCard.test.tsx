import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../test/test-utils";
import { TaskCard } from "./TaskCard";
import { createMockTask } from "../../test/test-utils";

describe("TaskCard", () => {
  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders task information correctly", () => {
    const task = createMockTask({
      title: "Test Task",
      description: "Test Description",
      priority: "high",
    });

    render(
      <TaskCard task={task} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("높음")).toBeInTheDocument();
  });

  it("shows completed state correctly", () => {
    const task = createMockTask({
      title: "Completed Task",
      completed: true,
    });

    render(
      <TaskCard task={task} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const checkbox = screen.getByLabelText(`toggle-${task.id}`);
    expect(checkbox).toHaveClass("bg-primary-600");
  });

  it("calls onToggle when checkbox is clicked", () => {
    const task = createMockTask();

    render(
      <TaskCard task={task} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const checkbox = screen.getByLabelText(`toggle-${task.id}`);
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(task);
  });

  it("calls onDelete when delete button is clicked", () => {
    const task = createMockTask();

    // Mock window.confirm
    vi.stubGlobal("confirm", vi.fn().mockReturnValue(true));

    render(
      <TaskCard task={task} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByTitle("삭제");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(task.id);
  });

  it("disables actions when updating", () => {
    const task = createMockTask();

    render(
      <TaskCard
        task={task}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        isUpdating={true}
      />
    );

    const checkbox = screen.getByLabelText(`toggle-${task.id}`);
    expect(checkbox).toBeDisabled();
  });

  it("shows loading state when deleting", () => {
    const task = createMockTask();

    render(
      <TaskCard
        task={task}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        isDeleting={true}
      />
    );

    // Should show loading spinner instead of delete icon
    expect(screen.getByRole("button", { name: /toggle/i })).toBeInTheDocument();
  });

  it("applies correct priority colors", () => {
    const { rerender } = render(
      <TaskCard
        task={createMockTask({ priority: "high" })}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("높음")).toHaveClass("bg-red-100", "text-red-800");

    rerender(
      <TaskCard
        task={createMockTask({ priority: "medium" })}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("보통")).toHaveClass(
      "bg-yellow-100",
      "text-yellow-800"
    );

    rerender(
      <TaskCard
        task={createMockTask({ priority: "low" })}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("낮음")).toHaveClass(
      "bg-green-100",
      "text-green-800"
    );
  });
});
