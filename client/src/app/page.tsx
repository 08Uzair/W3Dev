'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [savedTasks, setSavedTasks] = useState<{ text: string; completed: boolean }[]>([]);

  const handleGenerate = async () => {
    // Dummy data for now
    setGeneratedTasks([
      'Watch a Python tutorial',
      'Build a simple script',
      'Understand data types',
      'Practice loops and conditionals',
      'Explore libraries like pandas',
    ]);
  };

  const handleSave = (task: string) => {
    setSavedTasks([...savedTasks, { text: task, completed: false }]);
  };

  const toggleComplete = (index: number) => {
    const tasks = [...savedTasks];
    tasks[index].completed = !tasks[index].completed;
    setSavedTasks(tasks);
  };

  const handleDelete = (index: number) => {
    const tasks = [...savedTasks];
    tasks.splice(index, 1);
    setSavedTasks(tasks);
  };

  const completedCount = savedTasks.filter(t => t.completed).length;

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Generator Dashboard</h1>
        <div className="space-x-4">
          <Button variant="ghost">My Tasks</Button>
          <Button variant="ghost">Sign Out</Button>
        </div>
      </header>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Input placeholder="Enter a topic to generate tasks..." value={topic} onChange={(e) => setTopic(e.target.value)} />
          <Button onClick={handleGenerate}>Generate Tasks</Button>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-semibold">Generated Tasks</h2>
        {generatedTasks.map((task, idx) => (
          <div key={idx} className="flex justify-between items-center border rounded p-2 my-2">
            <span>{task}</span>
            <Button variant="outline" onClick={() => handleSave(task)}>Save</Button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Saved Tasks</h2>
        <Card>
          <CardContent className="p-4">
            <p className="mb-2 font-medium">Your Todos</p>
            <p className="mb-4 text-sm text-gray-600">{completedCount} of {savedTasks.length} tasks completed</p>
            <div className="h-2 bg-gray-200 rounded">
              <div className="h-2 bg-black rounded" style={{ width: `${(completedCount / savedTasks.length) * 100}%` }}></div>
            </div>
            {savedTasks.map((task, idx) => (
              <div key={idx} className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleComplete(idx)} />
                  <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(idx)}>Delete</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
