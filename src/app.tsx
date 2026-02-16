import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "./constants/articleProps";
import styles from './styles/index.module.scss';
import clsx from 'clsx';
import { ArticleParamsForm } from "./components/article-params-form";
import { Article } from "./components/article";

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const applyChanges = (state: ArticleStateType) => {
		setArticleState(state);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={applyChanges}/>
			<Article />
		</main>
	);
};