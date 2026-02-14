import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onChange: (state: ArticleStateType) => void;
}
export const ArticleParamsForm = ({onChange}:ArticleParamsFormProps) => {

	const [isOpen, setOpen] = useState(false);
	const [currenrFont, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [currentFontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [currentFontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [currentBackgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [currentContentWidth, setContentWidth] = useState(defaultArticleState.contentWidth)
	const container = useRef<HTMLElement|null>(null);

	useLayoutEffect(()=>{
		if(container.current){
			if(isOpen){
				container.current.classList.add(styles.container_open);
			} else {
				container.current.classList.remove(styles.container_open);
			}
		}
	});

	const submitForm = () => {
		const articleState: ArticleStateType = {
			fontFamilyOption: currenrFont,
			fontSizeOption: currentFontSize,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentContentWidth
		}
		onChange(articleState);

	}

	const resetForm = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => {setOpen(!isOpen)}} />
			<aside className={styles.container} ref={container}>
				<form className={styles.form}>
					<Select title="Шрифт" 
						options={fontFamilyOptions} 
						selected={currenrFont} 
						onChange={(selected)=>setFont(selected)}
					/>
					<RadioGroup title="Размер шрифта"
						name = ""
						options={fontSizeOptions}
						selected={currentFontSize}
						onChange={(selected)=>setFontSize(selected)}
					/>
					<Select title="Цвет шрифта" 
						options={fontColors} 
						selected={currentFontColor} 
						onChange={(selected)=>setFontColor(selected)}
					/>
					<Separator/>
					<Select title="Цвет фона" 
						options={backgroundColors} 
						selected={currentBackgroundColor} 
						onChange={(selected)=>setBackgroundColor(selected)}
					/>
					<Select title="Ширина контента" 
						options={contentWidthArr} 
						selected={currentContentWidth} 
						onChange={(selected)=>setContentWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetForm}/>
						<Button title='Применить' htmlType='button' type='apply' onClick={submitForm}/>
					</div>
				</form>
			</aside>
		</>
	);
};
