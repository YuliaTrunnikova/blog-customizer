import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { IAllOptions } from 'src/index';

export type ChangeSelectFn = (selection: OptionType) => void;

interface PropsArticleParamsForm {
	setPageState: React.Dispatch<React.SetStateAction<IAllOptions>>;
}

export const ArticleParamsForm = ({ setPageState }: PropsArticleParamsForm) => {
	const [formState, setFormState] = useState<IAllOptions>(defaultArticleState);
	const [isOpen, setOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function toggleOpen() {
		setOpen((value: boolean) => !value);
	}

	function setDefaultOptions() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	function submitForm(evt: React.SyntheticEvent) {
		evt.preventDefault();
		setPageState(formState);
	}

	return (
		<>
			<ArrowButton toggleOpen={toggleOpen} openState={isOpen} />
			{
				<div className={styles.overlay}>
					<aside
						className={clsx(styles.container, {
							[styles.container_open]: isOpen,
						})}
						ref={rootRef}>
						<form className={styles.form} onSubmit={submitForm}>
							<Text as='h1' size={31} weight={800} uppercase>
								Задайте параметры
							</Text>
							<Select
								title='шрифт'
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={(selected) =>
									setFormState((previousState) => ({
										...previousState,
										fontFamilyOption: selected,
									}))
								}
							/>
							<RadioGroup
								title='размер шрифта'
								name='font-size'
								selected={formState.fontSizeOption}
								options={fontSizeOptions}
								onChange={(selected) =>
									setFormState((previousState) => ({
										...previousState,
										fontSizeOption: selected,
									}))
								}
							/>
							<Select
								title='цвет шрифта'
								selected={formState.fontColor}
								options={fontColors}
								onChange={(selected) =>
									setFormState((previousState) => ({
										...previousState,
										fontColor: selected,
									}))
								}
							/>
							<Separator />
							<Select
								title='цвет фона'
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={(selected) =>
									setFormState((previousState) => ({
										...previousState,
										backgroundColor: selected,
									}))
								}
							/>
							<Select
								title='ширина контента'
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={(selected) =>
									setFormState((previousState) => ({
										...previousState,
										contentWidth: selected,
									}))
								}
							/>
							<div className={styles.bottomContainer}>
								<Button
									title='Сбросить'
									type='reset'
									onClick={setDefaultOptions}
								/>
								<Button title='Применить' type='submit' />
							</div>
						</form>
					</aside>
				</div>
			}
		</>
	);
};
