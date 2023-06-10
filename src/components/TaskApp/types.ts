export type Task = {
    id: number;
    text: string;
    subTasks?: Task[];
}

export type TaskItemProps = {
    task: Task;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTask: Task) => void;
    onAddSubTask: (id: number, subTask: Task) => void;
}

export type TaskListProps = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTask: Task) => void;
}