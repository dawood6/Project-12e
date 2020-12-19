import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Result, { ResultProps } from '../components/Result';

export default {
    title: 'Components/Result',
    component: Result,

} as Meta;

const Template: Story<ResultProps> = (args) => <Result {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    link: "Ck9LCsAhW"
    , sender: "Dawood", reciever: "Daniyal", message: "Greetings"
}