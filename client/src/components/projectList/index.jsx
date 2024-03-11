import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  if (!projects) {
    return <h4>No projects yet</h4>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <Link className="" to={`/project/${project._id}`}>
              <h2>{project.projectTitle}</h2>
            </Link>
            <br />
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
