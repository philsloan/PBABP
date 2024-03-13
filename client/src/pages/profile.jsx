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
      <section>
        <h4>
          Name: <span>{user.username}</span>
        </h4>
        <h4>
          Email: <span>{user.email}</span>
        </h4>
      </section>
      {!username && (<ProjectForm />)}
      <div id="projectlist">
      <ProjectList projects={user.projects} />
      </div>
    </div>
  );
};

export default Profile;
