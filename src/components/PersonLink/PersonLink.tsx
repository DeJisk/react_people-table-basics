import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

function getParams(personName: string | null, personBorn: number | undefined) {
  if (personName && personBorn) {
    return `${personName.toLocaleLowerCase().split(' ').join('-')}-${personBorn}`;
  }
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personName } = useParams();
  const params = getParams(person.name, person.born);

  const allNames = people?.map(human => human.name);

  const hasMotherInList = allNames.includes(person.motherName || '');
  const hasFatherInList = allNames.includes(person.fatherName || '');

  let mother = null;
  let father = null;

  if (hasMotherInList) {
    mother = people.find(human => human.name === person.motherName);
  }

  if (hasFatherInList) {
    father = people.find(human => human.name === person.fatherName);
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personName === params,
      })}
    >
      <td>
        <Link
          to={`/people/${params}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {hasMotherInList ? (
        <td>
          <Link
            className="has-text-danger"
            to={`/people/${getParams(person.motherName, mother?.born)}`}
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}
      {hasFatherInList ? (
        <td>
          <Link to={`/people/${getParams(person.fatherName, father?.born)}`}>
            {person.fatherName}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
