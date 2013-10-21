({
    appDir: "../",
    baseUrl: "js",
    dir: "../../build",
    removeCombined: true,
    modules: [
        {
            name: "main"
        }
    ],
     paths: {
    	jquery: 'libs/jquery/jquery-min',
    	underscore: 'libs/underscore-amd/underscore-min',
    	backbone: 'libs/backbone-amd/backbone-min'
  	}
})