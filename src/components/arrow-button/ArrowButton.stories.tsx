import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonWithState = () => {
	return (
		<>
			<ArrowButton openState={true} toggleOpen={() => console.log('')} />
		</>
	);
};

export const ArrowButtonStory: Story = {
	render: () => <ArrowButtonWithState />,
};
