export default {
	app: {
		name: "ht_study2",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "ff1410e6a96b2473b5719c88492cd489",
		language: "english",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "2e07e33A-1ax%W@82582YY6Q!!0-7de03a23691a99f9f9ac",
		apiTokenSecret: "3a76e388$Xax%W!ff90d9B#Q-!078c902e55ff43a44c54c7",
		jwtDuration: 20, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"huting_dsmp",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "123456",
		port: "3306",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"15779313462@163.com",
		password: "MHQPTVewRxrUiYEY",
		senderemail:"15779313462@163.com",
		sendername:"huting",
		host: "pop.163.com",
		secure: true,
		port: "465"
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		file_path: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		video: {
			filenameType: "random",
			extensions: "mp3,mp4,webm,wav,avi,mpg,mpeg",
			limit: "1",
			maxFileSize: "3000",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		photo: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
	locales: {
		'english': 'English',
	}

}