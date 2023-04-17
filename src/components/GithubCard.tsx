import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCodeFork,
  faLink,
  faStar,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

export interface GithubCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  apiUrl: string;
  desc?: boolean;
  homepage?: boolean;
  starCount?: boolean;
  subCount?: boolean;
  forkCount?: boolean;
  topics?: boolean;
  langs?: boolean;
}

export const GithubCard: React.FC<GithubCardProps> = ({ children, apiUrl }) => {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [srcUrl, setSrcUrl] = useState<string>('');
  const [homepage, setHomepage] = useState('');
  const [starCount, setStarCount] = useState<number>(0);
  const [subCount, setSubCount] = useState<number>(0);
  const [forkCount, setForkCount] = useState<number>(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDesc(data.description);
        setSrcUrl(data.html_url);
        setHomepage(data.homepage);
        setStarCount(data.stargazers_count);
        setSubCount(data.subscribers_count);
        setForkCount(data.forks_count);
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
      <div className="gh-header">
        {name}
        <FontAwesomeIcon
          className="gh-link gh-fa"
          icon={faArrowUpRightFromSquare}
        />
      </div>
      <div className="gh-desc">{desc}</div>
      <div>{topics}</div>
      <div>{langs}</div>
      <div className="gh-stats">
        <FontAwesomeIcon className="gh-star gh-fa" icon={faStar} />
        {starCount}
        <FontAwesomeIcon className="gh-sub gh-fa" icon={faEye} />
        {subCount}
        <FontAwesomeIcon className="gh-fork gh-fa" icon={faCodeFork} />
        {forkCount}
        <FontAwesomeIcon className="gh-fork gh-fa" icon={faLink} />
        <a href={homepage} target="_blank class">
          {homepage}
        </a>
      </div>
    </a>
  );
};
