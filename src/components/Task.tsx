
import inputNoChecked from '../assets/inputNoChecked.svg';
import inputChecked from '../assets/inputChecked.svg';
import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
    task: Task;
    onDeleteTask: (task: string) => void;
    onChangeTaskStatus: (task: string) => void;
}

export interface Task {
    id: string,
    status: boolean,
    content: string
}


export function Task({ task, onDeleteTask, onChangeTaskStatus }: TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(task.id);
    }
    
    function handleChangeTaskStatus() {
        onChangeTaskStatus(task.id)
    }
    
    return (
        <article className={styles.divTask}>
            <button onClick={handleChangeTaskStatus}>
                <img className={styles.inputTask} src={task.status == true ? inputChecked : inputNoChecked} alt="" />
            </button>
            
            <p className={styles.contentTask}>
                {task.content}
            </p>
            <button onClick={handleDeleteTask}>
                <Trash className={styles.deleteTask} />
            </button>
        </article>
    );
}