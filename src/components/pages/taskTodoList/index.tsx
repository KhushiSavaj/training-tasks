import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addTodos,
  clearComplete,
  deleteTodo,
  localStorageSetData,
  setFilter,
  updateTodos,
} from "../../../redux/taskTodoList/action";
import styles from "./TaskTodoList.module.scss";

interface OptionType {
  label: string;
  value: string;
}

interface todoTaskDropDownProps {
  name?: string;
  options: OptionType[];
  value: string;
  onChange: any;
  className?: string;
  placeholder?: string;
  showCheckIcon?: boolean;
}

const priorityOption = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const filterOption = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export const DropDownSelect = ({
  name,
  options,
  value,
  onChange,
  placeholder = "",
  className = "",
}: todoTaskDropDownProps) => {
  return (
    <Select
      displayEmpty
      name={name}
      value={value}
      onChange={onChange}
      renderValue={(selected) => (selected ? selected : placeholder)}
      className={className}
      sx={{
        "& .MuiSelect-select": {
          textTransform: "capitalize",
          paddingRight: 2,
          paddingLeft: 2,
          paddingTop: 1,
          paddingBottom: 1,
        },
      }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          value={option.value}
          sx={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <span style={{ width: "30%" }}>
            {option.value === value && (
              <CheckOutlinedIcon
                fontSize="small"
                sx={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: 1,
                }}
              />
            )}
          </span>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

const validationSchema = Yup.object({
  taskName: Yup.string().required("please add your tasks"),
  priority: Yup.string().required("select a priority"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskTodo = (props: any) => {
  const { task } = props;
  const todos = useSelector((state: any) => state.todos);
  const filterValues = useSelector((state: any) => state.filterValues);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedTodoId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTodoId(null);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      taskName: "",
      priority: "low",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addTodos(values));
      resetForm();
    },
  });

  const todoListData = todos.filter((todo: any) =>
    filterValues === "all"
      ? true
      : filterValues === "active"
      ? !todo.completed
      : todo.completed
  );

  useEffect(() => {
    dispatch(localStorageSetData({ key: "todos", data: todos }));
  }, [todos, dispatch]);

  const confirmDelete = () => {
    if (selectedTodoId !== null) {
      dispatch(deleteTodo(selectedTodoId));
      handleClose();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            {task?.id}
            {`.`}
            {task?.title}
          </div>
          <div className={styles.taskDescription}>{task?.description}</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.taskSection}>
            <TextField
              name="taskName"
              placeholder="Add a new todo..."
              value={formik.values.taskName}
              onChange={formik.handleChange}
              error={formik.touched.taskName && Boolean(formik.errors.taskName)}
              className={`${styles.addField}`}
            />
            <DropDownSelect
              name={"priority"}
              options={priorityOption}
              value={formik.values.priority}
              onChange={formik.handleChange}
              placeholder="Low"
              className={styles.priority}
            />
            <Button
              type="submit"
              className={styles.addButton}
              sx={{
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {`Add`}
            </Button>
          </div>
        </form>
        <div className={styles.menuSection}>
          <DropDownSelect
            name={"filter"}
            options={filterOption}
            value={filterValues}
            onChange={(e: any) => {
              dispatch(setFilter(e.target.value));
            }}
            placeholder="All"
            className={styles.filterItems}
          />
          <Button
            className={styles.clearComplete}
            onClick={() => dispatch(clearComplete())}
          >
            {`Clear Complete`}
          </Button>
        </div>
        {todoListData?.length > 0 ? (
          todoListData.map((todo: any) => (
            <div className={styles.todoListData} key={todo.id}>
              <div className={styles.todoListName}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => dispatch(updateTodos(todo.id))}
                />
                <div
                  className={`${styles.todoText} ${
                    todo.completed ? styles.completed : ""
                  }`}
                >
                  {todo.taskName}
                </div>
              </div>
              <div className={styles.statusButton}>
                <Chip
                  label={todo.priority}
                  color={
                    todo.priority === "low"
                      ? "success"
                      : todo.priority === "medium"
                      ? "warning"
                      : "error"
                  }
                  sx={{ textTransform: "capitalize" }}
                  className={styles.status}
                />
                <DeleteOutlinedIcon
                  className={styles.deleteButton}
                  onClick={() => handleOpen(todo.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noDataSection}>
            <div className={styles.noDataContain}>{`No Data Found`}</div>
          </div>
        )}
        <div className={styles.totalTasks}>
          <div className={styles.total}>
            {`Total : `}
            {todos.length}
          </div>
          <div className={styles.active}>
            {`Active : `}
            {todos.filter((total: any) => !total.completed).length}
          </div>
          <div className={styles.completed}>
            {`Completed : `}
            {todos.filter((total: any) => total.completed).length}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div
            style={{ textAlign: "center", marginBottom: "25px" }}
          >{`Are you sure you want to delete this todo ?`}</div>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={confirmDelete}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              {`Yes`}
            </Button>
            <Button onClick={handleClose} variant="outlined">
              {`No`}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskTodo;
