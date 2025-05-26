import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import { IconButton, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useReducer, useState } from "react";
import { initialState, userReducer } from "../../../reducer/userTodoList";
import {
  addUser,
  deleteUser,
  localStorageSetData,
  searchUser,
  updateUser,
} from "../../../reducer/userTodoList/action";
import Menu from "../../shared/userTodoList/menu";
import styles from "./UserTodoList.module.scss";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";

interface ITableHeader {
  header: string | any;
  accessor: string;
  width?: number;
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

interface ITableCreateUserData {
  header?: string | any;
  accessor?: string;
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

interface IGenderImage {
  onClick?: any;
  src?: string;
}

const GenderImage = ({ src, onClick }: IGenderImage) => (
  <img src={src} alt="icon" onClick={onClick} className={styles.genderImg} />
);

const UserTodo = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [createUser, setCreateUser] = useState(false);
  const [userData, setUserData] = useState<any>({
    gender: "",
    name: "",
    birthDate: "",
  });
  const [selectedData, setSelectedData] = useState<any>(null);
  const [editFields, setEditFields] = useState<string[]>([]);
  const [errorFields, setErrorFields] = useState<any[]>([]);

  const allUsers = state?.search ? state.searchUsers : state?.allUsers;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const isError = (field: string) => errorFields?.includes(field);

  const addUserHandler = (field: string) => {
    const valid = Object.values(userData).every((val) => val !== "");
    if (valid) {
      dispatch(addUser(userData));
      setUserData({ gender: "", name: "", birthDate: "" });
      setErrorFields([]);
      setCreateUser(false);
    } else {
      const inValidField = Object.entries(userData)
        .map(([key, val]) => {
          if (val === "") return key;
        })
        .filter((ele) => typeof ele === "string");
      setErrorFields([...errorFields, ...inValidField]);
    }
    setEditFields([]);
  };

  const userOnChangeHandler = (field: string, value: string) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }));
    if (value === "") {
      setErrorFields((prev) => [...prev, field]);
    } else {
      setErrorFields((prev) => prev.filter((f) => f !== field));
    }
  };

  const updateUserHandler = () => {
    dispatch(updateUser(selectedData));
    setSelectedData(null);
    setEditFields([]);
  };

  const handleDoubleClick = (field: string, user: any, event?: any) => {
    if (event) handleClick(event);
    if (selectedData?.id === user.id) {
      if (!editFields.includes(field)) {
        setEditFields((prev) => [...prev, field]);
      }
    } else {
      setCreateUser(false);
      setSelectedData(user);
      setEditFields([field]);
    }
  };

  const updateFieldChangeHandler = (field: string, value: any) => {
    setSelectedData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const initialStateUser = () => {
    setCreateUser(false);
    setUserData({ gender: "", name: "", birthDate: "" });
    setErrorFields([]);
    setEditFields([]);
    setSelectedData(null);
  };

  const handleGenderSelect = (gender: string) => {
    handleClose();
    if (selectedData && editFields.includes("gender")) {
      setSelectedData((prev: any) => ({ ...prev, gender }));
    } else {
      setUserData((prev: any) => ({ ...prev, gender }));
    }
  };

  useEffect(() => {
    let payload = { key: "users", data: state?.allUsers };
    dispatch(localStorageSetData(payload));
  }, [state?.allUsers]);

  const tableHeader: ITableHeader[] = [
    {
      header: (
        <div className={styles.vector}>
          <img src="/images/gender.png" alt="icon" />
        </div>
      ),
      accessor: "gender",
      width: 5,
      align: "center",
    },
    { header: "Name", accessor: "name", width: 25 },
    { header: "Birth Date", accessor: "birthDate", align: "left" },
    { header: "", accessor: "action", align: "left", width: 1 },
  ];

  const tableCreateUserData: ITableCreateUserData[] = [
    {
      header: userData.gender ? (
        userData.gender === "male" ? (
          <MaleOutlinedIcon onClick={handleClick} className={styles.gender} />
        ) : (
          <FemaleOutlinedIcon onClick={handleClick} className={styles.gender} />
        )
      ) : (
        <GenderImage
          src={
            errorFields?.includes("gender")
              ? "/images/errorGender.png"
              : "/images/genderIcon.png"
          }
          onClick={handleClick}
        />
      ),
    },
    {
      header: (
        <TextField
          className={`${styles.dataFiled} ${
            isError("name") ? styles.errorBorder : ""
          }`}
          onChange={(e) => userOnChangeHandler("name", e.target.value)}
          value={userData.name || ""}
        />
      ),
      accessor: "name",
    },
    {
      header: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={`${styles.dataFiled} ${
              isError("birthDate") ? styles.errorBorder : ""
            }`}
            slotProps={{ textField: { size: "small" } }}
            value={userData.birthDate ? dayjs(userData.birthDate) : null}
            onChange={(date) =>
              userOnChangeHandler("birthDate", date?.format("MM-DD-YYYY") || "")
            }
          />
        </LocalizationProvider>
      ),
      accessor: "Birth Date",
    },
    { header: "", accessor: "action" },
  ];

  const tableData = allUsers?.map((val) => {
    return {
      gender: (
        <div
          style={{ textAlign: "center" }}
          onDoubleClick={(e) => handleDoubleClick("gender", val, e)}
        >
          {selectedData?.id === val.id && editFields.includes("gender") ? (
            selectedData.gender === "female" ? (
              <FemaleOutlinedIcon className={styles.gender} />
            ) : (
              <MaleOutlinedIcon className={styles.gender} />
            )
          ) : val.gender === "female" ? (
            <FemaleOutlinedIcon className={styles.gender} />
          ) : (
            <MaleOutlinedIcon className={styles.gender} />
          )}
        </div>
      ),
      name: (
        <div
          className={styles.userData}
          onDoubleClick={() => handleDoubleClick("name", val)}
        >
          {selectedData?.id === val.id && editFields?.includes("name") ? (
            <TextField
              className={styles.dataFiled}
              value={selectedData.name || ""}
              onChange={(e) => updateFieldChangeHandler("name", e.target.value)}
            />
          ) : (
            val.name
          )}
        </div>
      ),
      birthDate: (
        <div
          className={styles.userData}
          onDoubleClick={() => handleDoubleClick("birthDate", val)}
        >
          {selectedData?.id === val.id && editFields?.includes("birthDate") ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                className={styles.dataFiled}
                value={dayjs(selectedData.birthDate)}
                onChange={(date) =>
                  updateFieldChangeHandler(
                    "birthDate",
                    date?.format("MM-DD-YYYY") || ""
                  )
                }
              />
            </LocalizationProvider>
          ) : (
            val.birthDate
          )}
        </div>
      ),
      action: (
        <div>
          {selectedData?.id === val.id && (
            <div style={{ top: "28px" }} className={styles.genderIcon}>
              <CheckOutlinedIcon
                className={styles.iconButton}
                onClick={() => {
                  updateUserHandler();
                  initialStateUser();
                }}
              />
              <CloseOutlinedIcon
                className={styles.iconButton}
                onClick={() => initialStateUser()}
              />
            </div>
          )}
          <IconButton
            className="deleteIcon"
            sx={{ visibility: "hidden" }}
            onClick={() => dispatch(deleteUser(val.id))}
          >
            <DeleteOutlinedIcon className={styles.deleteIcon} />
          </IconButton>
        </div>
      ),
    };
  });

  const genderOptions = [
    {
      label: "Female",
      value: "female",
      icon: <FemaleOutlinedIcon className={styles.gender} />,
    },
    {
      label: "Male",
      value: "male",
      icon: <MaleOutlinedIcon className={styles.gender} />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <div className={styles.header}>
          <div className={styles.headerDetails}>
            <FamilyRestroomOutlinedIcon className={styles.userIcon} />
            <div className={styles.userFont}>{`User Details`}</div>
          </div>
          <AddOutlinedIcon
            className={styles.plushIcon}
            onClick={() => {
              setCreateUser(true);
              setSelectedData(null);
              setEditFields([]);
            }}
          />
        </div>
        <TextField
          placeholder="search...."
          className={styles.searchFiled}
          onChange={(e) => dispatch(searchUser(e.target.value))}
        />
        <TableContainer
          sx={{
            width: "100%",
            minHeight:
              (allUsers && allUsers?.length > 0) || createUser
                ? "max-content"
                : "40vh",
          }}
        >
          <Table
            sx={{
              position: "relative",
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {tableHeader.map((val, id) => {
                  return (
                    <TableCell
                      key={id}
                      align={val.align}
                      className={styles.headContain}
                      sx={{
                        width: val.width ? `${val.width}%` : "max-content",
                        paddingLeft: 0,
                        paddingRight: 1,
                        paddingTop: 1,
                        paddingBottom: 1,
                      }}
                    >
                      {val.header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            {(allUsers && allUsers?.length > 0) || createUser ? (
              <TableBody>
                {createUser && (
                  <TableRow
                    sx={{
                      position: "relative",
                    }}
                  >
                    {tableCreateUserData.map((ele, id) => {
                      return (
                        <TableCell
                          key={id}
                          sx={{
                            paddingLeft: 0,
                            paddingRight: 1,
                            paddingTop: 1,
                            paddingBottom: 1,
                          }}
                        >
                          {ele.header}
                          {ele.accessor === "action" && (
                            <div className={styles.genderIcon}>
                              <CheckOutlinedIcon
                                onClick={() => addUserHandler("")}
                                className={styles.iconButton}
                              />
                              <CloseOutlinedIcon
                                className={styles.iconButton}
                                onClick={initialStateUser}
                              />
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
                {tableData?.map((row: any, rowIndex) => (
                  <TableRow
                    className={styles.deleteHover}
                    sx={{
                      position: "relative",
                      "&:Hover .deleteIcon": { visibility: "visible" },
                    }}
                    key={rowIndex}
                  >
                    {tableHeader.map((col, colIndex) => (
                      <TableCell
                        key={colIndex}
                        sx={{
                          paddingLeft: 0,
                          paddingRight: 1,
                          paddingTop: 1,
                          paddingBottom: 1,
                        }}
                      >
                        {row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody className={styles.noDataSection}>
                <TableRow>
                  <TableCell className={styles.noDataContain}>
                    {`No Data Found`}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      <Menu anchorEl={anchorEl} handleClose={handleClose}>
        {genderOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleGenderSelect(option.value)}
          >
            {option.icon}
            <span
              style={{ color: "#969DAD", fontSize: "16px", marginLeft: "8px" }}
            >
              {option.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserTodo;
