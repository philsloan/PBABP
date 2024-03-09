import { useQuery } from "@apollo/client";
// import projectForm from "../components/projectForm";
// import projectList from "../components/projectList";
import { QUERY_PROJECTS } from "../utils/queries";

const Home = () => {
  const { posts, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  return (
    // <main>
    //   {/* <projectForm /> */}
    //   {posts ? (
    //     <div>Looking for posts...</div>
    //   ) : (
    //     // <projectList projects={projects} />
    //   )}
    // </main>
    <div>home</div>
  );
};

export default Home;
