import { withAuthInfo } from "@propelauth/react";

function AuthInfo(props) {
  const { user } = props;

  return (
    <span>
      <h2>User Info</h2>
      {user && user.pictureUrl && <img src={user.pictureUrl} />}
      <pre>user: {JSON.stringify(user, null, 2)}</pre>
    </span>
  );
}

export default withAuthInfo(AuthInfo);
