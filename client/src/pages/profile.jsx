import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import projectForm from "../components/projectForm";
// import projectList from "../components/projectList";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { username } = useParams();
  const { loading, data } = useQuery(QUERY_USERS, {
    variables: { username },
  });
  const users = data?.users || [];

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
          Name: <span>{users[0].username}</span>
        </div>
        <div>
          Email: <span>{users[0].email}</span>
        </div>
      </div>
      {users[0].projects.map((project) => (
        <div>
          {" "}
          <Link to = {`/project/${project._id}`}>
            <div>
              Project: <span>{project.projectTitle}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Profile;
