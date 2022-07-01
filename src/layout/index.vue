<template>
	<div class="app-wrapper">
		<NavBar class="nav-bar"/>
		<Sidebar class="sidebar-container" />
		<div class="main-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { NavBar, Sidebar } from "./components";
export default {
	name: "Layout",
	components: {
		NavBar,
		Sidebar,
	},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	overflow-y: auto;

	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
</style>
