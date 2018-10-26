<template>
  <div id="app">
	  <router-view></router-view>
	  <router-view name="main"></router-view>
	  <router-view name="sidebar"></router-view>
  </div>
</template>

<style lang="scss">
#app{
	height:100%;
	width:100%;
}
</style>
