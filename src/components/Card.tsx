import cx from '../utils/cx'

type Props = {
	children: React.ReactNode
	styles?: string
}

export default function Card({ children, styles }: Props): JSX.Element {
	const _styles = {
		card: cx('relative gap-8 rounded-xl bg-white-default px-6 py-8 tablet/sm:gap-12', styles)
	}

	return <div className={_styles.card}>{children}</div>
}
