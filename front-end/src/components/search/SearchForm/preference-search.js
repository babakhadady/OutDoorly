import styles from "./form.module.scss";
import { fetchParkActivities } from "../../../redux/ParkSearchInfo/ParkSearchInfo.thunks";
import Button from "@mui/material/Button";
import { getAmenities } from "../../../services/park-service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRoutes } from "../../../routes";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import { STATE_OPTIONS } from "./state-codes";
import {
  setSearchActivities,
  setSearchAmenities,
  setSearchMode,
  setSearchStates,
} from "../../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import { useForm, Controller } from "react-hook-form";

export default function PreferenceSearch() {
  const [amenities, setAmenities] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activities = useSelector(
    (store) => store.parkSearchInfo.activityOptions
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchParkActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function populateAmenities() {
      const response = await getAmenities();
      setAmenities(
        response.data.data.map((amenity) => {
          return { label: amenity.name, value: amenity.id };
        })
      );
    }
    populateAmenities();
  }, []);

  function onSubmitSearchForm({ activities, state, amenities }) {
    dispatch(setSearchMode("PREFERENCES"));
    dispatch(setSearchActivities(activities || []));
    dispatch(setSearchStates(state));
    dispatch(setSearchAmenities(amenities || []));
    navigate(getRoutes().searchResults);
  }

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit(onSubmitSearchForm)}
    >
      <Typography variant="body" sx={{ mt: 5, mb: 1, fontWeight: "medium" }}>
        An asterisk (*) indicates a required field
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "medium" }}>
        Which activities are you interested in?
      </Typography>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={activities}
            className={styles.selector}
            value={value}
            onChange={onChange}
            isMulti
            sx={{ mb: 2 }}
            placeholder="Select some activities"
          />
        )}
        name="activities"
      />
      {errors.activities && (
        <Typography variant="p" style={{ color: "red" }}>
          Please choose at least one activity.
        </Typography>
      )}
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "medium" }}>
        Which amenities are you interested in?
      </Typography>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={amenities}
            className={styles.selector}
            value={value}
            onChange={onChange}
            isMulti
            sx={{ mb: 2 }}
            placeholder="Select some amenities"
          />
        )}
        name="amenities"
      />
      {errors.amenities && (
        <Typography variant="p" style={{ color: "red" }}>
          Please choose at least one amenity.
        </Typography>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "medium" }}>
        Which state are you interested in visiting? *
      </Typography>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Select
            options={STATE_OPTIONS}
            className={styles.selector}
            value={value}
            onChange={onChange}
            sx={{ mb: 2 }}
            placeholder="Select a state"
          />
        )}
        name="state"
      />
      {errors.state && (
        <Typography variant="p" style={{ color: "red" }}>
          Please choose a state.
        </Typography>
      )}

      <div className={styles.submitButton}>
        <Button variant="contained" type="submit">
          Find parks
        </Button>
      </div>
    </form>
  );
}
