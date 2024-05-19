import {
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminPollApi } from "../redux/slice/AdminPollSlice";
import { dispatch } from "../redux/store/store";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { MdEdit } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

import { resetReducer } from "../redux/slice/TitleEditSlice";
import { addPollResetReducer } from "../redux/slice/AddPollSlice";
import { deleteResetReducer } from "../redux/slice/DeletePollSlice";
import AddOptionModal from "../components/AddOptionModal";
import { addOptionResetReducer } from "../redux/slice/AddOptionSlice";
import LogoutModal from "../components/LogoutModal";
import DeleteOptionsModal from "../components/DeleteOptionsModal";
import { deleteOptionResetReducer } from "../redux/slice/DeleteOptionSlice";

function AdminDashBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const deleteData = useSelector((state) => state.deletePoll);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOptionOpen, setAddOptionOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [addOptionId, setAddOptionId] = useState(null);
  const [deleteOpen,setDeleteOpen]=useState(false);
  const [deleteText,setDeleteText]=useState(null);
  const editdata = useSelector((state) => state.editPoll);
  const addPollData = useSelector((state) => state.addPoll);
  const addOptionData = useSelector((state) => state.addOption);
  const deleteOption=useSelector((state)=>state.deletePollOptions);

  const handleDelete = async (id) => {
    const selectedPoll = adminPollData.find((poll) => poll._id === id);
    if (selectedPoll) {
      setOpen(true);
      setDeleteId(id);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEdit = async (id) => {
    const selectedPoll = adminPollData.find((poll) => poll._id === id);
    if (selectedPoll) {
      setEditId(id);
      setTitle(selectedPoll.title);
      setEditOpen(true);
    }
  };
  const handleAddOption = (id) => {
    setAddOptionId(id);
    setAddOptionOpen(true);
  };
  const handleAddOptionClose = () => {
    setAddOptionOpen(false);
  };
  const handleLogoutClose=()=>{
setLogoutOpen(false);
  }
  const handleDeleteOptions=(id,option)=>{
    setDeleteId(id),
    setDeleteText(option);
    setDeleteOpen(true);
  }
  const handleDeleteClose=()=>{
    setDeleteOpen(false);
  }
  useEffect(() => {
    if (addPollData && addPollData.isSuccess) {
      toast.success("Poll added successfully", { autoClose: 1000 });
      dispatch(addPollResetReducer());
    } else if (addPollData && addPollData.isError) {
      toast.error("Poll not added successfully", { autoClose: 1000 });
      dispatch(addPollResetReducer());
    } else if (deleteData && deleteData.isSuccess) {
      console.log("delete");
      toast.success("Poll  deleted successfully", { autoClose: 1000 });
      dispatch(deleteResetReducer());
    } else if (deleteData && deleteData.isError) {
      toast.error("Poll not  deleted successfully", { autoClose: 1000 });
      dispatch(deleteResetReducer());
    } else if (editdata && editdata.isSuccess) {
      toast.success("Title edited successfully", { autoClose: 1000 });
      dispatch(resetReducer());
    } else if (editdata && editdata.isError) {
      toast.error("Poll not  edited successfully", { autoClose: 1000 });
      dispatch(resetReducer());
    } else if (addOptionData && addOptionData.isSuccess) {
      toast.success("Option added successfully", { autoClose: 1000 });
      dispatch(addOptionResetReducer());
    } else if (addOptionData && addOptionData.isError) {
      toast.error("Option not added successfully", { autoClose: 1000 });
      dispatch(addOptionResetReducer());
    }
    else if(deleteOption && deleteOption.isSuccess){
      toast.success("Option deleted successfully ",{autoClose:1000})
      dispatch(deleteOptionResetReducer());
    }
    else if(deleteOption && deleteOption.isError){
      toast.error("Option not deleted ",{autoClose:1000});
      dispatch(deleteOptionResetReducer());
    }
  }, [
    deleteData.isSuccess,
    deleteData.isError,
    editdata.isSuccess,
    editdata.isError,
    addPollData.isError,
    addPollData.isSuccess,
    addOptionData.isSuccess,
    addOptionData.isError,
    deleteOption.isSuccess,
    deleteOption.isError,
  ]);

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [
    deleteId,
    deleteData.isSuccess,
    editId,
    editdata.isSuccess,
    addOptionId,
    addOptionData.isSuccess,
    deleteOption.isSuccess,
  ]);

  const reversedPollList = [...adminPollData].reverse();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = reversedPollList.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        margin: "auto",
        background:"#f5f5f5"
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "97%",
          margin: "auto",
          justifyContent: {lg:"space-between",md:"space-between",sm:"space-between",justifyContent:"center"},
          padding: 1,
        }}
      >
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((user) => (
            <Card
              key={user._id}
              sx={{
                width: { lg: "49%", sm: "49%", md: "49%", xs: "95%" },
                borderRadius: 5,
                marginTop: {lg:3,md:3,sm:2,xs:1.5},
                pt: 2,
                border:"1px solid #aca9a9",
                height:"auto",
                minHeight: "300px",
                "&:hover": {
                  boxShadow: "5px 5px 5px grey",
                },
              }}
            >
              {user && (
                <CardContent sx={{height:"90%",
                display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                  <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      background: "#08B3B7",
                    }}
                  >
                    <Typography p={1} sx={{fontSize:"19px",fontWeight:"600"}}>{user.title}</Typography>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                      }}
                    >
                      <Button
                      variant="contained"
                      onClick={() => handleEdit(user._id)}
                        sx={{
                          backgroundColor:"#178393",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        {" "}
                        <MdEdit
                          fontSize={23}
                          
                        />
                      </Button>
                    </Box>
                  </Box>

                  {user.options.map((e, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop:"4px"
                      }}
                    >
                      <Typography p={1}>{e.option}</Typography>
                     <Box sx={{display:"flex",width:"77px"}}><Typography>Vote {e.vote}</Typography>
                     <Box sx={{":hover":{cursor:"pointer"}}}><MdDelete color="red" fontSize={22}  onClick={()=>handleDeleteOptions(user._id,e.option)}/></Box>
                     </Box>    
                    </Box>
                  ))}
                  </Box>
                  <Box>
                  {user.options.length < 4 && (
                    <Button
                      variant="contained"
                      onClick={() => handleAddOption(user._id)}
                      sx={{
                        mr: 1,
                        background: "#168594",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#168594",
                        },
                      }}
                    >
                      Add Option
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDelete(user._id)}
                    sx={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      background: "#FF0000",
                      "&:hover": {
                        backgroundColor: "red",
                      },
                    }}
                  >
                    <MdDelete fontSize={25} />
                  </Button>
                  </Box>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <Typography variant="h6" textAlign={"center"}></Typography>
        )}
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: { sm: "70%", display: "flex", justifyContent: "center" },
        }}
      >    
      </Box>
     {
         currentItems.length>2? <Pagination
         sx={{
           margin: "auto",
           width: {
             lg: "35%",
             sm: "70%",
             bottom: 0,
             display: "flex",
             justifyContent: "center",
           },
         }}
         count={Math.ceil(adminPollData.length / itemsPerPage)}
         page={currentPage}
         onChange={handlePageChange}
         color="primary"
       />:
       <Pagination
         sx={{
           margin: "auto",
           width: {
             lg: "35%",
             sm: "70%",
             bottom: 0,
             display: "flex",
             justifyContent: "center",
             position:"fixed",
             left: "50%",
             transform: "translateX(-50%)",
            //  '& .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem': {
            //   background:"red",
            // },
           },
         }}
         count={Math.ceil(adminPollData.length / itemsPerPage)}
         page={currentPage}
         onChange={handlePageChange}
         color="primary"
       />
     }
      <ToastContainer />
      <DeleteModal open={open} deleteId={deleteId} handleClose={handleClose} />
      <EditModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editId={editId}
        title={title}
      />
      <AddOptionModal
        handleAddOptionClose={handleAddOptionClose}
        addOptionOpen={addOptionOpen}
        addOptionId={addOptionId}
      />
      <DeleteOptionsModal deleteOpen={deleteOpen} deleteId={deleteId} handleDeleteClose={handleDeleteClose} deleteText={deleteText}/>
    </Box>
  );
}

export default AdminDashBoard;
