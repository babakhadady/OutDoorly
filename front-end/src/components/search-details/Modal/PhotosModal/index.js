import Backdrop from "@mui/material/Backdrop";
import { useRef } from "react";
import { Modal, Fade, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./photos-modal.module.scss";
import { useDispatch } from "react-redux";
import { postParkImage } from "../../../../redux/ParkDetails/ParkDetails.thunks";

export default function PhotosModal(props) {
  const setVisible = props.setVisible;
  const [open] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const uploadRef = useRef();
  const dispatch = useDispatch();

  function handleClose() {
    setVisible(false);
  }

  function uploadPhoto() {
    uploadRef.current.click();
  }

  function handleUpload() {
    setUploadedFiles(uploadRef.current.files);
  }

  function handleSubmit() {
    setVisible(false);
    dispatch(postParkImage(Array.from(uploadedFiles)[0]));
    props.setAlert(true);
  }

  const displayUpload = Array.from(uploadedFiles).map((file) => {
    return (
      <img
        src={URL.createObjectURL(file)}
        alt="uploaded"
        className={styles.uploadImagePreview}
      />
    );
  });
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
          className={styles.modalBox}
        >
          <Typography
            sx={{ mx: "5rem", mt: "1rem" }}
            className={styles.modalHeader}
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Add Photos
          </Typography>
          <input
            ref={uploadRef}
            accept="image/*"
            multiple
            hidden
            type="file"
            onChange={handleUpload}
          />
          <Button
            onClick={uploadPhoto}
            variant="contained"
            sx={{ mb: ".5rem" }}
          >
            Upload File
          </Button>
          {displayUpload}
          <Button sx={{ mb: ".5rem" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
