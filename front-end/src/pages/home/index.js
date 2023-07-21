import styles from "./home.module.scss";
import PreferencesForm from "../../components/PreferencesForm";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSearchResults } from "../../redux/ParkSearchInfo/ParkSearchInfo.slice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearchResults());
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <div className={styles.headingContainer}>
          <Typography
            fontWeight="fontWeightMedium"
            className={styles.titleHeading}
          >
            OutDoorly
          </Typography>
          <Typography className={styles.subHeading}>
            Exploring national parks in the US
          </Typography>
        </div>
      </div>
      <br />
      <br />
      <div className={styles.form}>
        <PreferencesForm />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
