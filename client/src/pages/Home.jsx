import { useQuery } from "@apollo/client";
import ProjectList from "../components/projectList";
import { QUERY_PROJECTS } from "../utils/queries";

const Home = () => {
  const { posts, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];
  console.log(projects)

  return (
    <main>
      {posts ? (
        <div>Looking for posts...</div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </main>
  );
};

export default Home;
