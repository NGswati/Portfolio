// import { ExperienceCard } from './components/ExperienceCard';

const experiences = [
  {
    company: 'IIIT Guwahati',
    role: 'Research Intern',
    date: 'Winter 2023',
    desc: 'Published paper on Real Time Multicore Processor scheduling.'
  },
  {
    company: 'IIIS Delhi',
    role: 'Software Engineering Research Intern',
    date: 'Jan - May 2023', 
    desc: 'Published papers on Fuzzy topsis .'
  }
];

export default function Experience() {
  return (
    <>
      <div className="content">
        <h1>Experience</h1>

        <div className="exp-list">
          {experiences.map(exp => (
            <ExperienceCard 
              company={exp.company}
              role={exp.role}
              date={exp.date}
              desc={exp.desc} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
