import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthURLRoute } from "../../routes";
import styles from "./login.module.scss";

export const Login = () => {
  const [authURL, setAuthURL] = useState("");

  useEffect(() => {
    // Fetch the Google Auth URL from the server
    axios.get(getAuthURLRoute()).then((response) => {
      if (!authURL) {
        setAuthURL(response.data.googleURL);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      style={{ textDecoration: "none" }}
      href={authURL}
      className={styles.googleLogin}
    >
      LOGIN WITH GOOGLE
    </a>
  );
};
