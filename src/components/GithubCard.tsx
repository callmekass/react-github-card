import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
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
      <div id="gh-header">
        {name}
        <FontAwesomeIcon
          className="gh-link gh-fa"
          icon={faArrowUpRightFromSquare}
        />
      </div>
      <div id="gh-desc">{desc}</div>
      <div id="gh-stats">
        <FontAwesomeIcon className="gh-stars gh-fa" icon={faStar} />
        {stars}
        <FontAwesomeIcon className="gh-watchers gh-fa" icon={faEye} />
        {subs}
      </div>
      <div>{langs}</div>
    </a>
  );
};
