import styles from './ToDoList.module.css';
import { Task } from "./Task";
import Clipboard from '../assets/Clipboard.png';
import { PlusCircle } from 'phosphor-react';
import { useState, FormEvent, ChangeEvent, } from 'react';

export function ToDoList() {
    


    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState<string>('');

    const incompleteTasks = tasks.filter(task => task.status);

    function generateUniqueId(): string {
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000); // Número aleatório entre 0 e 999
        return `${timestamp}-${randomNum}`;
    }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const taskId = generateUniqueId();
        setTasks([...tasks, { id: taskId, status: false, content: newTaskText }]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTaskText(event.target.value);
    }


    function changeTaskStatus(taskIdToChange: string) {
        const taskWithoutDeletedOne = tasks.map(task => {
            if (task.id === taskIdToChange) {
                return { ...task, status: !task.status };
            }
            return task;
        });
        setTasks(taskWithoutDeletedOne);
    }

    function deleteTask(taskIdToDelete: string) {
        const taskWithoutDeletedOne = tasks.filter(task => {
            return task.id != taskIdToDelete;
        });
        setTasks(taskWithoutDeletedOne);
    }

    const isNewTaskEmpty = newTaskText.length === 0;

    return (

        <main className={styles.divTask}>
            <form className={styles.bar} onSubmit={handleCreateNewTask}>
                <input
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    className={styles.inputTaskbar}
                    placeholder='Adicione uma nova tarefa'>
                </input>
                <button className={styles.btnTaskbar} disabled={isNewTaskEmpty}>
                    Criar
                    < PlusCircle size={20} />
                </button>
            </form>
            <header className={styles.headerTaskList}>
                <div className={styles.divScore}>
                    <strong className={styles.totalTasks}>Tarefas criadas</strong>
                    <span>{tasks.length}</span>
                </div>
                <div className={styles.divScore}>
                    <strong className={styles.completedTasks}>Concluídas</strong>
                    <span>{tasks.length == 0 ? 0 : incompleteTasks.length + " de " + tasks.length}</span>
                </div>
            </header>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onChangeTaskStatus={changeTaskStatus}
                        onDeleteTask={deleteTask}
                    />
                ))
            ) : (
                <div className={styles.withoutTasks}>
                    <img src={Clipboard}></img>
                    <p>
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        Crie tarefas e organize seus itens a fazer
                    </p>
                </div>
            )}
        </main>
    );
}