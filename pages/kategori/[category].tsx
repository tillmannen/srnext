import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProgramsByCategory, Program } from '../../lib/api';
import 'bulma/css/bulma.min.css';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    if (category && typeof category === 'string') {
      fetchProgramsByCategory(category).then((data) => {
        setPrograms(data);
      });
    }
  }, [category]);

  const groupedPrograms = programs.reduce((groups: Record<string, Program[]>, program) => {
    const firstLetter = program.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(program);
    return groups;
  }, {});

  return (
    <div className="container">
      {Object.entries(groupedPrograms).map(([letter, group]) => (
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
      ))}
    </div>
  );
};

export default CategoryPage;
