export default ({
	name,
	data = {}
}) => {
	return new Promise((resolve, reject) => {
		const loading = data.isLoading;
		data.isLoading && delete data.isLoading;
		!loading && uni.showLoading({
			title: "加载中"
		});
		uniCloud.callFunction({
			name,
			data,
			success({
				result
			}) {
				// 能够拿到数据
				if (result.code === 0) {
					resolve(result.data);
				} else {
					// 后端没有显示
					uni.showToast({
						icon: "none",
						title: result.msg
					})
				}
			},
			fail(err) {
				reject(err)
			},
			complete() {
				!loading && uni.hideLoading()
			}
		})
	})
}
