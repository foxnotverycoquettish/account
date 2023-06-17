<template>
	<u-read-more show-height="150" :toggle="true" v-for="i in 9">
		<rich-text :nodes="content"></rich-text>
	</u-read-more>
</template>

<script> 
	export default {
		data() {
			return {
				// 这是一段很长的文字，也可能包含有HTML标签等内容
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				？`,
			}
		}
	}
</script>
