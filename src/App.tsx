import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import styles from './App.module.css';


function App() {

  return (
    <div>
      <Header />
      <main className={styles.mainApp}>
        <ToDoList />
      </main>
    </div>
  );
}

export default App;
