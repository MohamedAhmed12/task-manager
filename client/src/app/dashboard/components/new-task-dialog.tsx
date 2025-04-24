"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  status: z.enum(["pending", "in-progress", "completed"]),
});

type TaskFormData = z.infer<typeof taskSchema>;

export function NewTaskDialog() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-10 cursor-pointer">
          <Icons.plus /> <span className="ml-2 capitalize">new task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new task.
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
            <Input id="dueDate" type="date" {...register("dueDate")} className="block cursor-pointer"/>
            {errors.dueDate && (
              <span className="text-red-500">{errors.dueDate.message}</span>
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
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
