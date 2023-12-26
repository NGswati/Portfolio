// import { ExperienceCard } from './components/ExperienceCard';

const experiences = [
  {
    company: 'Google',
    role: 'Software Engineer Intern',
    date: 'Summer 2022',
    desc: 'Developed and launched new features for Google Cloud.'
  },
  {
    company: 'Anthropic',
    role: 'AI Research Intern',
    date: 'Jan - May 2023', 
    desc: 'Published 3 papers on conversational AI.'
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
