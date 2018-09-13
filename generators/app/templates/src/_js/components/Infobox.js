export default function Infobox(props){
	return(
		<div className="u-posr u-tac u-c-text o-infobox">
			<div className="u-c-text2 u-boxshadow u-posr u-z1 u-bgc-fff o-infobox__inner" style={{ fontSize: 13, lineHeight: '16px', padding: '12px 24px' }}>
				{ props.text }
			</div>
			<div className="u-horizontal-center u-z1 u-t100p o-infobox__arrow" />
		</div>
	)
}
