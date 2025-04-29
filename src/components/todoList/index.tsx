import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import styles from "./TodoList.module.scss";

interface ITask {
  id: number;
  name: string;
  isCompleted: boolean;
}

const TodoList = (props: any) => {
  const { task } = props;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const handleSubmit = () => {
    if (selectedTask) {
      const clone = [...tasks];
      const index = clone.findIndex((res) => res?.id === selectedTask?.id);
      const objClone = { ...clone[index] };
      objClone.name = inputValue;
      clone[index] = objClone;
      setTasks(clone);

      // const updateValue = tasks.map((res) => {
      //   if (selectedTask?.id === res?.id) {
      //     return { ...res, name: inputValue };
      //   }
      //   return res;
      // });
      // setTasks(updateValue);
      setSelectedTask(null);
    } else {
      setTasks([
        ...tasks,
        { id: Math.random(), name: inputValue, isCompleted: false },
      ]);
    }
    setInputValue("");
  };

  const handleUpdate = (task: ITask) => {
    setSelectedTask(task);
    setInputValue(task.name);
  };

  const handleDelete = (index: number) => {
    // const filterTask = tasks.filter((_, i) => i !== index);
    // setTasks(filterTask);

    const newTodos = [...tasks];
    newTodos.splice(index, 1);
    setTasks(newTodos);
  };

  const handleChange = (value: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === value ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskDetails}>
        <div className={styles.taskName}>
          {task?.id}.{task?.title}
        </div>
        <div className={styles.taskDescription}>{task.description}</div>
      </div>
      <div className={styles.taskSection}>
        <label className={styles.label}>{`Add a new task :`}</label>
        <div className={styles.fieldGrid}>
          <input
            type="text"
            name="name"
            placeholder="Enter a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={handleSubmit}
            disabled={!inputValue}
            className={`${styles.addButton}  ${
              !inputValue ? styles.updateDisabledButton : ""
            }`}
          >
            {selectedTask !== null ? `EDIT` : `ADD`}
          </button>
        </div>
      </div>

      <div className={styles.taskList}>
        <div className={styles.taskId}>{`Tasks (${tasks?.length})`}</div>
        {tasks.length === 0 ? (
          <div className={styles.noTask}>No tasks yet. Add one above</div>
        ) : (
          tasks.map((res, index) => {
            return (
              <div
                className={`${styles.todosList}  ${
                  selectedTask?.id === res?.id ? styles.lightBorder : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={res.isCompleted}
                  onChange={() => handleChange(res.id)}
                  className={styles.checkIcon}
                ></input>
                <div
                  className={`${styles.listName} ${
                    res.isCompleted ? styles.unVisible : ""
                  } `}
                >
                  {res.name}
                </div>
                <div className={styles.gridButton}>
                  <EditOutlinedIcon onClick={() => handleUpdate(res)} />
                  <DeleteOutlinedIcon onClick={() => handleDelete(index)} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodoList;
