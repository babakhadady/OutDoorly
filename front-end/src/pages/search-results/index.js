import { useDispatch, useSelector } from "react-redux";
import styles from "./search-results.module.scss";
import { useEffect } from "react";
import ResultsListing from "../../components/search-results/ResultsListing";
import { Button } from "@mui/material";
import { searchForParks } from "../../redux/ParkSearchInfo/ParkSearchInfo.thunks";
import {
  A_TO_Z_SORTING,
  INCREASING,
  setPageNumber,
  toggleDistanceSort,
  toggleSort,
} from "../../redux/ParkSearchInfo/ParkSearchInfo.slice";
import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export default function SearchResults() {
  const searchResults = useSelector(
    (state) => state.parkSearchInfo.searchResults
  );
  const searchCity = useSelector((state) => state.parkSearchInfo.searchCity);
  const searchDistance = useSelector(
    (state) => state.parkSearchInfo.searchDistance
  );
  const sortDir = useSelector((state) => state.parkSearchInfo.sortDir);
  const distanceSortDir = useSelector(
    (state) => state.parkSearchInfo.distanceSortDir
  );
  const searchMode = useSelector((state) => state.parkSearchInfo.searchMode);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.parkSearchInfo.loading);

  useEffect(() => {
    if (!searchMode) {
      window.location.href = "/";
    }
    window.scrollTo(0, 0);
    dispatch(setPageNumber(1));
    dispatch(searchForParks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDir, distanceSortDir]);

  if (!loading && searchResults?.data?.length === 0) {
    return (
      <div className={styles.noResults}>
        <img
          src="https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="pug"
        />
        <h2>Oops! No results. Please try again.</h2>
      </div>
    );
  }
  return (
    <div>
      {loading || !searchResults ? (
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
        <div>
          <div className={styles.sortButton}>
            {searchMode === "PREFERENCES" ? (
              <Button onClick={() => dispatch(toggleSort())}>
                {sortDir === A_TO_Z_SORTING ? "Sort A-Z" : "Sort Z-A"}
              </Button>
            ) : (
              <Button onClick={() => dispatch(toggleDistanceSort())}>
                {distanceSortDir === INCREASING ? (
                  <>
                    <ArrowDropUp /> Sort by Increasing Distance
                  </>
                ) : (
                  <>
                    <ArrowDropDown /> Sort by Decreasing Distance
                  </>
                )}
              </Button>
            )}
          </div>
          <div className={styles.searchResultsWrapper}>
            <ResultsListing searchResults={searchResults} />
          </div>
        </div>
      )}
    </div>
  );
}
