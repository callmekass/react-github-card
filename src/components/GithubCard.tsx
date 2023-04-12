import React from 'react';

export interface GithubCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  apiUrl: string;
  linkUrl?: string;
}

export const GithubCard: React.FC<GithubCardProps> = ({
  children,
  apiUrl,
  linkUrl,
}) => {
  return <div className="github-card">{children}</div>;
};
