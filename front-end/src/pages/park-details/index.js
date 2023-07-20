import { useParams } from "react-router-dom";
import styles from "./park-details.module.scss";
import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../../components/ParkDetailsTabPanel";
import PhotosAndReviews from "../../components/PhotosAndReviews";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedParkID } from "../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import { retrieveParkDetails } from "../../redux/ParkDetails/ParkDetails.thunks";
import ParkMap from "../../components/Map/index.js";
import { ClimbingBoxLoader } from "react-spinners";
export default function ParkDetails() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const parkDetails = useSelector((store) => store.parkDetails.details);
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(setSelectedParkID(id));
    dispatch(retrieveParkDetails());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClimbingBoxLoader size={60} color="#667761" />
        </div>
      ) : (
        <div className={styles.parkDetailsWrapper}>
          <Typography variant="h3" sx={{ m: 2 }}>
            {parkDetails.fullName}
          </Typography>

          <img
            className={styles.mainImg}
            alt={"park"}
            src={parkDetails.images[0].url}
          />
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Description" />
            <Tab label="Operating Hours" />
            <Tab label="Weather Info" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box
              className={styles.descriptionContainer}
              sx={{ borderBottom: 1, borderColor: "grey.500" }}
            >
              <Box
                sx={{ borderRight: 1, borderColor: "grey.500", mb: 2, pt: 4 }}
                className={styles.description}
              >
                <Typography>{parkDetails.description}</Typography>
              </Box>
              <ParkMap
                lon={parkDetails.longitude}
                lat={parkDetails.latitude}
                name={parkDetails.fullName}
              ></ParkMap>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ borderBottom: 1, borderColor: "grey.500", pb: 2 }}>
              <Typography>
                {parkDetails.operatingHours[0].description}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box sx={{ borderBottom: 1, borderColor: "grey.500", pb: 3 }}>
              <Typography>{parkDetails.weatherInfo}</Typography>
            </Box>
          </TabPanel>
          <PhotosAndReviews />
        </div>
      )}
    </div>
  );
}
