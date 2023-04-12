import React from 'react';
import { Story } from '@storybook/react';
import { GithubCard, GithubCardProps } from '../components/GithubCard';

export default {
  title: 'Github Card',
  component: GithubCard,
};

const Template: Story<GithubCardProps> = (args) => <GithubCard {...args} />;

export const card = Template.bind({});
card.args = {
  children: 'Github Card',
  apiUrl: 'https://api.github.com/repos/callmekass/pfSense-palenight',
};
