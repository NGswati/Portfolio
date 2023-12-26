import { ProjectCard } from './components/ProjectCard';

const projects = [
  { 
    name: 'Journey Calendar',
    desc: 'Animated portfolio site made with React and Three.js',
  },
  {
   name: 'Real Estate Website',
   desc: 'Dynamic real estate website with SQL database', 
  },
];

export default function Projects() {
  return (
    <>
      <div className="content">
        <h1>Projects</h1>

        <div className="project-list">
          {projects.map(project => (
            <ProjectCard 
              name={project.name}
              desc={project.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
}