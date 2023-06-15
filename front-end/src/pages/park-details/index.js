import { useParams } from "react-router-dom";
import styles from "./park-details.module.scss";
import { useEffect, useState } from "react";
import { getParkDetails } from "../../services/park-service";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../components/ParkDetailsTabPanel";
import PhotosAndReviews from "../../components/PhotosAndReviews";
import { MyMap } from "../../components/Map/Map";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedParkCode } from "../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import { retrieveParkDetails } from "../../redux/ParkSearchInfo/ParkSearchInfo.thunks";

export default function ParkDetails() {
  const { parkCode } = useParams();
  //   const [parkDetails, setParkDetails] = useState();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const parkDetails = useSelector((store) => store.parkSearchInfo.parkDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // async function fetchParkDetails() {
    //   const res = await getParkDetails(parkCode);
    //   setParkDetails(res.data.data[0]);
    //   console.log(parkDetails);
    // }
    // fetchParkDetails();
    dispatch(setSelectedParkCode(parkCode));
    dispatch(retrieveParkDetails());
  }, []);

  if (!parkDetails) {
    return <div> loading...</div>;
  }

  return (
    <div className={styles.parkDetailsWrapper}>
      <h2>{parkDetails.fullName}</h2>
      <img
        className={styles.mainImg}
        alt={"park"}
        src={parkDetails.images[0].url}
      />
      {/* {JSON.stringify(parkDetails)} */}
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
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>{parkDetails.description}</div>
          <MyMap
            lon={parkDetails.longitude}
            lat={parkDetails.latitude}
            name={parkDetails.fullName}
          ></MyMap>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {parkDetails.operatingHours[0].description}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {parkDetails.weatherInfo}
      </TabPanel>
      <PhotosAndReviews />
    </div>
  );
}