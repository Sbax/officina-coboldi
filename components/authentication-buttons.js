import {
  useLogoutFunction,
  useRedirectFunctions,
  withAuthInfo,
} from "@propelauth/react";
import Link from "next/link";
import Button from "./button";
import styles from "../styles/auth-buttons.module.scss";

function AuthenticationButtons({ isLoggedIn, user }) {
  const logoutFn = useLogoutFunction();
  const { redirectToLoginPage } = useRedirectFunctions();

  if (isLoggedIn) {
    return (
      <section className={styles.buttons}>
        <span>{user.email}</span>

        <div>
          <Link href="/admin" passHref>
            <Button>Admin</Button>
          </Link>

          <Button onClick={() => logoutFn(true)}>Logout</Button>
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.buttons}>
        <Button onClick={redirectToLoginPage}>Login</Button>
      </section>
    );
  }
}

export default withAuthInfo(AuthenticationButtons);
