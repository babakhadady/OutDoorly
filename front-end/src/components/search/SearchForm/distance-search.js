import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRoutes } from "../../../routes";
import Typography from "@mui/material/Typography";
import styles from "./form.module.scss";
import {
  setSearchDistance,
  setSearchMode,
  setSearchCity,
} from "../../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import Slider from "@mui/material/Slider";
import PlacesAutoComplete from "../PlacesAutoComplete";
import { useForm, Controller } from "react-hook-form";

export default function DistanceForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distance: 0,
    },
  });

  function onSubmitDistanceSearch({ city, distance }) {
    dispatch(setSearchMode("PROXIMITY"));
    dispatch(setSearchCity(city));
    dispatch(setSearchDistance(distance));
    navigate(getRoutes().searchResults);
  }

  function valuetext(value) {
    return `${value}km`;
  }

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit(onSubmitDistanceSearch)}
    >
      <Typography variant="body" sx={{ mt: 5, mb: 1, fontWeight: "medium" }}>
        An asterisk (*) indicates a required field
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 2, fontWeight: "medium" }}>
        Which city are you located in? *
      </Typography>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <PlacesAutoComplete onChange={onChange} />
        )}
        name="city"
      />
      {errors.city && (
        <Typography variant="p" style={{ color: "red" }}>
          Please enter a city
        </Typography>
      )}
      <Typography variant="h5" sx={{ mt: 3, mb: 2, fontWeight: "medium" }}>
        {" "}
        How far are you willing to travel? (in km) *
      </Typography>
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (v) => v > 0,
        }}
        render={({ field: { onChange, value } }) => (
          <Slider
            className={styles.slider}
            value={value}
            onChange={onChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            max={800}
          />
        )}
        name="distance"
      />
      {errors.distance && (
        <Typography variant="p" style={{ color: "red" }}>
          Please choose a non-zero distance in km
        </Typography>
      )}
      <div className={styles.submitButton}>
        <Button variant="contained" type="submit">
          Search parks
        </Button>
      </div>
    </form>
  );
}
