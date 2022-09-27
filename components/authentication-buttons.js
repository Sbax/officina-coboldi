import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useLogoutFunction,
  useRedirectFunctions,
  withAuthInfo,
} from "@propelauth/react";
import Link from "next/link";
import styles from "../styles/auth-buttons.module.scss";
import Button from "./button";

function AuthenticationButtons({ isLoggedIn, user }) {
  const logoutFn = useLogoutFunction();
  const { redirectToLoginPage } = useRedirectFunctions();

  if (isLoggedIn) {
    return (
      <>
        <span>{user.email}</span>{" "}
        <span>
          <Link href="/admin" passHref>
            <a>admin</a>
          </Link>
        </span>{" "}
        <span>
          <a href="#" onClick={() => logoutFn(true)}>
            logout
          </a>
        </span>
      </>
    );
  } else {
    return (
      <a href="#" onClick={redirectToLoginPage}>
        <FontAwesomeIcon icon={faLock} /> admin
      </a>
    );
  }
}

export default withAuthInfo(AuthenticationButtons);
