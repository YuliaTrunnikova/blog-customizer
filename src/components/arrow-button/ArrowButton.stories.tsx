import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};
export default meta;

type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOpen: OnClick = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<>
			<ArrowButton toggleOpen={toggleOpen} openState={isOpen} />
		</>
	);
};
