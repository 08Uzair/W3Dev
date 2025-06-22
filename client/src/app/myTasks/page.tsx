"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([
    { text: "Task content 1", completed: false },
    { text: "Task content 2", completed: false },
    { text: "Task content 3", completed: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const toggleComplete = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const openEditDialog = (index: number) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const updated = [...tasks];
    updated[editingIndex].text = editedText;
    setTasks(updated);
    setIsEditing(false);
    toast.success("Task updated");
  };

  const deleteTask = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    toast.success("Task deleted successfully");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="transition-shadow border rounded-xl w-[700px] h-auto p-6 space-y-[3rem] bg-white">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Saved Tasks</h1>
        </header>

        <section className="space-y-4">
          {tasks.map((task, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow border rounded-xl"
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleComplete(idx)}
                  />
                  <span
                    className={`text-base ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="space-x-2">
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(idx)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTask(idx)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Edit Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <DialogFooter className="mt-4">
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
