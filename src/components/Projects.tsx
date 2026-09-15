import { useState } from "react";
import { PROJECTS_DATA } from "../data/ProjectsData";
import nextIcon from "../assets/icons/next.svg";

const route66Screens = Object.entries(
  import.meta.glob("../assets/bg/route66screens/*.jpg", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
  .map(([, image]) => image as string);

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = PROJECTS_DATA[currentIndex];

  const showPreviousProject = () => {
    setCurrentIndex((index) => (index - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  const showNextProject = () => {
    setCurrentIndex((index) => (index + 1) % PROJECTS_DATA.length);
  };

  return (
    <section id="projects" className="relative flex min-h-screen flex-col overflow-hidden border-t-[20px] border-gray-500 pt-16 pb-16 shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
      <h2 className="section-heading">Projects</h2>

      <div className="relative flex flex-1 items-center justify-center">
        {currentProject?.title === "Route66" && (
          <div className="project-screen-carousel" aria-hidden="true">
            <div className="project-screen-track">
              {[...route66Screens, ...route66Screens].map((screen, index) => (
                <img
                  className="project-screen"
                  key={`${screen}-${index}`}
                  src={screen}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="View previous project"
          className="absolute inset-y-0 left-0 z-0 flex w-1/5 cursor-w-resize items-center justify-center bg-transparent"
          onClick={showPreviousProject}
        >
          <img className="h-10 w-10 rotate-180 invert" src={nextIcon} alt="" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="View next project"
          className="absolute inset-y-0 right-0 z-0 flex w-1/5 cursor-e-resize items-center justify-center bg-transparent"
          onClick={showNextProject}
        >
          <img className="h-10 w-10 invert" src={nextIcon} alt="" aria-hidden="true" />
        </button>

        {currentProject && (
          <article className="project-details-card relative z-10 mx-auto flex min-h-[60vh] max-w-xl flex-col gap-6 px-6 py-6">
            <h3 className="m-0 font-bold">{currentProject.title}</h3>

            <div className="flex flex-1 items-center justify-center">
              <p className="m-0">{currentProject.desc}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {currentProject.stack.map((technology) => (
                <span className="px-1 py-1" key={technology}>
                  {technology}
                </span>
              ))}
            </div>

            {currentProject.githubURL && (
              <a href={currentProject.githubURL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </article>
        )}
      </div>

    </section>
  );
}

export default Projects;