import React, { useState } from "react";
import { Task } from "./types";

interface TaskItemProps {
    task: Task;
    onAddSubTask: (parentId: number, text: string) => void;
    showSubTaskForm?: boolean,
    type: string
}

export const TaskItem = ({ task, onAddSubTask, type }: TaskItemProps) => {
    const [showSubTaskForm, setshowSubTaskForm] = useState(false)
    const [subTask, setSubTask] = useState("")

    const handleAddSubTask = () => {
        if (subTask) {
            onAddSubTask(task.id, subTask);
            setSubTask("")
            setshowSubTaskForm(false)
        }
    };

    const toggleSubTaskForm = () => {
        setshowSubTaskForm((prev) => !prev)
    }

    return (
        <div className={`task__item ${showSubTaskForm && type === "child" ? "task__item__nested" : ""}`}>
            <div className="task__title__container">
                <h4>{task.text}</h4>
                {type === "parent" ? <button className="task__btn add__task__btn" onClick={toggleSubTaskForm}>Add Sub Task</button> : null}
            </div>
            {
                showSubTaskForm &&
                <div className="sub__task__form">
                    <input className="task__input" onChange={(e) => setSubTask(e.target.value)} autoFocus />
                    <button className="task__btn add__task__btn" onClick={handleAddSubTask} disabled={!subTask.length}>Add Task</button>
                </div>}
            {task.subTasks && (
                <ul>
                    {task.subTasks.map((subTask) => (
                        <li key={subTask.id} className="sub__task__item">
                            <TaskItem task={subTask} onAddSubTask={onAddSubTask} showSubTaskForm={showSubTaskForm} type={"child"} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};