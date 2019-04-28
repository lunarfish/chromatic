var VueImage = Vue.component('vue-image', {
	props: ['src','alt'],
  dataSrc: "",
  template: '<img v-bind:src="imageSrc" v-bind:alt="alt"/>',
  data: function() {
  	var data_path = this.src.replace('/assets/images','/image');
  	
  	return this.$http.get(data_path)
  	.then(response => {
  		var data;
  		data = response.body;
  		this.dataSrc = data.data;
  		return data;
  	})
  	.then(data => {
  		this.$forceUpdate();
  	});

  },
  computed: {
  	imageSrc: function() {
  		return (this.dataSrc.length > 0)?this.dataSrc:this.src;
  	}
  }
});

var app = new Vue({
  el: '#vue',
  data: {
    message: 'Hello Vue!'
  }
});
