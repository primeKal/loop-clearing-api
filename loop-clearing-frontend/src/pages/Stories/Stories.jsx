import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../EndPoints";
import AddStory from "./AddStory";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";

function Stories() {
  const [data, setData] = React.useState([]);

  const images = [
    "https://images.unsplash.com/photo-1525711857929-4272fb4a040f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=hasan-almasi-OwqLxCvoVxI-unsplash.jpg",
    "https://downloadscdn6.freepik.com/273609/46/45878.jpg?filename=happy-surprised-attractive-afro-american-woman-raises-hands-reacts-awesome-unexpected-relevation.jpg&token=exp=1711787817~hmac=50ca7046dd9eaeab04d2921c874dad31",
    "https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=neom-EbIvcXzgU4s-unsplash.jpg",
    "https://images.unsplash.com/photo-1528194663420-bfa489364cb5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=valentin-salja-9kbaq1xoIr0-unsplash.jpg",
    "https://images.unsplash.com/photo-1580922110301-a666f6745565?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=levi-meir-clancy-LheHIV3XpGM-unsplash.jpg",
    "https://images.unsplash.com/photo-1563804951831-49844db19644?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=duncan-kidd-Cju-BkSkM1k-unsplash.jpg",
  ];
  const headerImages = [
    "img/testimonials/01.jpg",
    "img/testimonials/02.jpg",
    "img/testimonials/03.jpg",
    "img/testimonials/04.jpg",
    "img/testimonials/05.jpg",
    "img/testimonials/06.jpg",
  ];

  const isLoggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
  const userData = useSelector((state) => state.loggedInStatus.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedClearingId, setSelectedClearingId] = useState("");

  if (!userData) {
    navigate("/");
  }
  useEffect(() => {
    console.log("user data", userData);
    getStories(userData?.id);
  }, []);

  const getStories = async () => {
    try {
      setSearchTerm("");
      const response = await fetch(
        baseUrl + "clearing/byUserId/" + userData?.id
      );
      const data = await response.json();
      console.log("my name", data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (id) => {};
  const handleUpdate = (row) => {
    const userConfirmed = window.confirm(
      `Intiate Clearing Algorithm for ${row.clearing_cycle} ?`
    );

    // Check if the user clicked 'OK'
    if (userConfirmed) {
      // User clicked 'OK', execute the method
      userConfirmedAction(row.id);
    } else {
      // User clicked 'Cancel', do not execute the method
      console.log("User cancelled the action.");
    }
  };
  const handleStartClearing = (id) => {};

  function userConfirmedAction(id) {
    // This is the method to execute if the user confirms
    console.log("User confirmed action. Method executed.");

    fetch(baseUrl + `clearing/Update/${id}`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        getStories();
        closeModal();
        return response.json();
      })
      .catch((error) => {
        // handle error
        console.error("There was an error!", error);
      });
  }

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>let The Games Begin</h2>
        </div>
        <div>
          <div>
            <p>start by creating a clearing cycle</p>
          </div>
          <div className="logged-in">
            <input
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ..."
              style={{
                borderRadius: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                fontSize: "16px",
                width: "200px",
                outline: "none",
                boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
              }}
            ></input>
            {
              isLoggedIn && (
                // <div className="logged-in">
                <a
                  href="#services"
                  className="btn btn-custom btn-lg page-scroll"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add New
                </a>
              )
              // </div>
            }
          </div>
        </div>
        <div>
          {data.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cycle</TableCell>
                    <TableCell>Number of Transactions</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total Cleared Amount</TableCell>
                    <TableCell>Remaining to Clear</TableCell>
                    <TableCell>Clearing Steps</TableCell>
                    <TableCell>
                      Number of Future Clearing Transactions
                    </TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.clearing_cycle}</TableCell>
                      <TableCell>{row?.transactions?.length}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.total_cleared_amount}</TableCell>
                      <TableCell>{row.remaining_amount}</TableCell>
                      <TableCell>{row.clearingStems}</TableCell>
                      <TableCell>
                        {row.numberOfFutureClearingTransactions}
                      </TableCell>
                      <TableCell>
                        {row.status == "Draft" && (
                          <IconButton onClick={() => handleUpdate(row)}>
                            <UpdateIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              <h1>Opps!</h1>
              <p>can't find no clearing involving you</p>
              <p>Click on Add new to start adding clearings</p>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddStory
          isOpen={isModalOpen}
          closeModal={closeModal}
          getStories={getStories}
        ></AddStory>
      )}
    </div>
  );
}

export default Stories;
