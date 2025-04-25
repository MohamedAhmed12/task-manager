import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Task } from "./task-columns";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  status: z.enum(["pending", "in-progress", "completed"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  onSubmit: (data: TaskFormData) => Promise<void>;
  task?: Task;
  actionType: "create" | "update";
}

export default function TaskDialog({
  isOpen,
  setIsOpen,
  isPending,
  onSubmit,
  task,
  actionType,
}: TaskDialogProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {},
  });

  useEffect(() => {
    if (isOpen == false) {
      // reset form on closing the dialog
      task ? reset(task) : reset();
    }
  }, [isOpen, task, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {actionType === "create" ? (
          <Button
            variant="outline"
            className="mb-10 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Icons.plus />
            <span className="ml-2 capitalize">{actionType} task</span>
          </Button>
        ) : (
          <Icons.pencil size={15} color="black" className="cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {actionType === "create" ? "Create a New Task" : "Update Task"}
          </DialogTitle>
          <DialogDescription>
            {actionType === "create"
              ? "Fill in the details to create a new task."
              : "Update the details of the task."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="dueDate" className="mb-2">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register("due_date")}
              className="block cursor-pointer"
            />
            {errors.due_date && (
              <span className="text-red-500">{errors.due_date.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="status" className="mb-2">
              Status
            </Label>
            <select id="status" {...register("status")}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit" className="cursor-pointer">
              {isPending && (
                <Icons.loaderCircle color="white" className="animate-spin" />
              )}
              {actionType === "create" ? "Create Task" : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
