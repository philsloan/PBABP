import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import ProjectList from "../components/projectList";
import ProjectForm from "../components/projectForm";

const Profile = () => {
  const { username } = useParams();
  const loggedInUser = username? username: Auth.getProfile().authenticatedPerson.username
  const { loading, data } = useQuery(QUERY_USERS, {
    variables: { username: loggedInUser },
  });
  const user = data?.users[0] || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }
  if (loading) {
    return <div>Loading project...</div>;
  }
  return (
    <div>
      <h2>Profile</h2>
      <div>
        <div>
          Name: <span>{user.username}</span>
        </div>
        <div>
          Email: <span>{user.email}</span>
        </div>
      </div>
      {!username && (<ProjectForm />)}
      <ProjectList projects={user.projects} />
    </div>
  );
};

export default Profile;
