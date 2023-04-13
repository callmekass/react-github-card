import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faStar, faEye } from '@fortawesome/free-regular-svg-icons';

export interface GithubCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  apiUrl: string;
}

export const GithubCard: React.FC<GithubCardProps> = ({ children, apiUrl }) => {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [srcUrl, setSrcUrl] = useState<string>('');
  const [stars, setStars] = useState<number>(0);
  const [subs, setSubs] = useState<number>(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDesc(data.description);
        setSrcUrl(data.html_url);
        setStars(data.stargazers_count);
        setSubs(data.subscribers_count);
        setTopics(data.topics);
        fetch(data.languages_url)
          .then((lang_response) => lang_response.json())
          .then((lang_data) => {
            setLangs(Object.keys(lang_data));
          });
      });
  }, []);
  console.log(langs);
  return (
    <a className="gh-card" href={srcUrl} target="_blank">
      <div className="gh-header">{name}</div>
      <div>{desc}</div>
      <div>{topics} </div>
      <div>{langs}</div>
      <div>
        <FontAwesomeIcon className="gh-stars" icon={faStar} />
        {stars}
      </div>
      <div>
        <FontAwesomeIcon className="gh-watchers" icon={faEye} />
        {subs}
      </div>
      <div>
        <FontAwesomeIcon className="gh-source" icon={faCode} /> View Source Code
      </div>
    </a>
  );
};
