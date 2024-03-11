// import { } from '';

const ProjectList = ({ projects, title, showUsername = true, showProjectTitle = true }) => {
    if (!projects) {
      return <h4>No projects yet</h4>;
    }
  
    return (
      <div>
        {showProjectTitle && <h2>{title}</h2>}
        {projects && projects.map((project) => (
          <div key={project._id} className="">
            {showUsername ? (
              <Link className="" to={`/profiles/${project.projectAuthor}`}>
                {project.projectAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  built this project on {project.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You started this project on {project.createdAt}
                </span>
              </>
            )}
            <div className="">
              <p>{project.projectText}</p>
            </div>
            <Link className="" to={`/`}>
              What do you think of this project?
            </Link>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProjectList;
  