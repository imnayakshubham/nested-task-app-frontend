import React, { useEffect, useState } from "react";
import { Task } from "./types";
import { TaskItem } from "./TaskItem";

export const TaskApp = () => {
    const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem("nested-task-app-tasks") ?? "[]"));
    const [task, setTask] = useState("")

    useEffect(() => {
        if (!!tasks.length) {
            localStorage.setItem("nested-task-app-tasks", JSON.stringify(tasks))
        }
    }, [tasks])


    const handleAddTask = () => {
        if (task) {
            const newTask: Task = {
                id: tasks.length + 1,
                text: task,
            };
            setTasks([...tasks, newTask]);
            setTask("")
        }
    };

    const handleAddSubTask = (parentId: number, text: string) => {
        const newSubTask: Task = {
            id: tasks.length + 1,
            text: text,
        };
        const updatedTasks = tasks.map((task) => {
            if (task.id === parentId) {
                if (task.subTasks) {
                    task.subTasks.push(newSubTask);
                } else {
                    task.subTasks = [newSubTask];
                }
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div>
            <div className="task__input__container">
                <input className="task__input" value={task} onChange={(e) => setTask(e.target.value)} />
                <button className="task__btn add__task__btn" disabled={!task.length} onClick={handleAddTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task__item__container">
                        <TaskItem task={task} onAddSubTask={handleAddSubTask} type={"parent"} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
