import React, { useEffect, useState } from 'react';

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
  const [forks, setForks] = useState<number>(0);
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
        setForks(data.forks_count);
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
    <a className="github-card" href={srcUrl}>
      <p>{name}</p>
      <p>{desc}</p>
      <p>{srcUrl}</p>
      <p>{stars}</p>
      <p>{forks}</p>
      <p>{subs}</p>
      <p>{topics}</p>
      <p>{langs}</p>
    </a>
  );
};
