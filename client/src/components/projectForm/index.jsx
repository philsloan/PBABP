import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ProjectForm = () => {
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    projectText: "",
    paypalLink: ""
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProject({
        variables: {
          ...newProject,
          projectAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });

      setNewProject({
        projectTitle: "",
        projectText: "",
        paypalLink: ""
      });
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "projectText" && value.length <= 5000) {
      setNewProject({
        ...newProject,
        [name]: value,
      });
      setCharacterCount(value.length);
    } else if (name === "projectTitle") {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    } else if (name === "paypalLink") {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h3>What are you working on?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 5000 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/5000
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="projectTitle"
                placeholder="New project name..."
                value={newProject.projectTitle}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
              <input
                name="paypalLink"
                placeholder="Paypal client ID"
                value={newProject.paypalLink}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <Link to="https://developer.paypal.com/api/rest/">How to get your paypal client ID.</Link>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="projectText"
                placeholder="Here's a new project..."
                value={newProject.projectText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Project
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your projects. Please{" "}
          <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ProjectForm;
