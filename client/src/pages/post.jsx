import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentForm from "../components/commentForm";
import CommentList from "../components/commentList";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const SingleProject = () => {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });
  const project = data?.project || {};
  if (loading) {
    return <div>Loading project...</div>;
  }
  return (
    <div>
        <Link to = {`/profile/${project.projectAuthor}`}>
      <h3>
        {project.projectAuthor} <br />
      </h3>
      </Link>
      <div>{project.projectText}</div>
      <div>
        <CommentList comments={project.comments} />
      </div>
      <div>
        <CommentForm projectId={project._id} />
      </div>
    </div>
  );
};

export default SingleProject;
