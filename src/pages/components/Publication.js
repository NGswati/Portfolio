export function Publication({ title, authors, conference, journal }) {
    return (
      <div className="publication">
        <h3>{title}</h3>
        <p>{authors}</p>
        <p>{conference}</p>
        <p>{journal}</p>
      </div>
    );
  }
