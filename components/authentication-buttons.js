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
      <section className={styles.buttons}>
        <span>{user.email}</span>

        <div>
          <Link href="/admin" passHref>
            <a>
              <Button>Admin</Button>
            </a>
          </Link>

          <Button onClick={() => logoutFn(true)}>Logout</Button>
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.buttons}>
        <Button onClick={redirectToLoginPage}>
          <FontAwesomeIcon icon={faLock} /> Admin
        </Button>
      </section>
    );
  }
}

export default withAuthInfo(AuthenticationButtons);
