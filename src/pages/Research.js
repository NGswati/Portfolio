import { Publication } from './components/Publication';

const publications = [
  {
   title: 'Detecting Toxicity in Conversational AI',
   authors: 'Swati Gupta, James Clark',  
   conference: 'NeurIPS 2022'
  },
  {
    title: 'Optimizing Semantic Consistency in Dialogue',
    authors: 'Swati Gupta, Marie Wang',
    journal: 'AI Journal 2023'
  }
];

export default function Research() {
  return (
    <>
      <div className="content">
        <h1>Research</h1>
        
        <div className="publication-list">
          {publications.map(pub => (
            <Publication
              title={pub.title}
              authors={pub.authors}
              conference={pub.conference}
              journal={pub.journal}
            />
          ))}  
        </div>
      </div>
    </>
  );
}
