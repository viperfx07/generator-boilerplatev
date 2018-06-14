export default el => {
	$(el).find('.collapse')
		.on('show.bs.collapse', ev => {
			$(ev.currentTarget).closest('.panel').addClass('active');
		})
		.on('hide.bs.collapse', ev => {
			$(ev.currentTarget).closest('.panel').removeClass('active');
		})
}
