import { NewTaskForm } from "@/components/dashboard/new-task-form";

export default function NewTaskPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <NewTaskForm />
    </div>
  );
}