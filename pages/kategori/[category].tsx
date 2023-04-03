import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProgramsByCategory, Program } from '../../lib/api';
import 'bulma/css/bulma.min.css';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [programs, setPrograms] = useState<Program[]>([]);
  const sortedPrograms = [...programs].sort((a, b) => a.name.localeCompare(b.name, 'sv'));

  useEffect(() => {
    if (category && typeof category === 'string') {
      fetchProgramsByCategory(category).then((data) => {
        setPrograms(data);
      });
    }
  }, [category]);

  
  const groupedPrograms = sortedPrograms.reduce((groups: Record<string, Program[]>, program) => {
  //const groupedPrograms = programs.reduce((groups: Record<string, Program[]>, program) => {
    const firstLetter = program.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(program);
    return groups;
  }, {});

  const letterLinks = Object.keys(groupedPrograms).map((letter) => (
    <a key={letter} href={`#${letter}`} className="button is-light">
      {letter}
    </a>
  ));


  return (
    <div className="container">
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <div className="buttons has-addons">{letterLinks}</div>
          </div>
        </div>
      </div>
      {Object.entries(groupedPrograms).map(([letter, group]) => (
        <div key={letter} id={letter}>
          <div key={letter}>
          <h2 className="title is-2">{letter}</h2>
          <div className="columns is-multiline">
            {group.map((program) => (
              <div className="column is-one-quarter" key={program.id}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={program.programimage} alt={program.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{program.name}</p>
                        <p className="subtitle is-6">{program.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
