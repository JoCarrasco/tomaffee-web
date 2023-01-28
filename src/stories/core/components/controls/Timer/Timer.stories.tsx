import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ControlTimerComponent } from '../../../../../core/components/Controls/Timer/Timer.component';
import {
  TimeEntryDurationComponent,
  TimeEntryHelper,
} from '../../../../../core';

export default {
  title: 'Controls/Timer',
  component: ControlTimerComponent,
  subcomponents: { TimeEntryDurationComponent },
} as ComponentMeta<typeof ControlTimerComponent>;

const Template: ComponentStory<typeof ControlTimerComponent> = (args) => (
  <ControlTimerComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};
