
import { createRouter, createWebHashHistory } from 'vue-router';

import { useAuth } from 'src/composables/auth';


function passRouteToProps(route){
	return {
		queryParams: route.query,
		fieldName: route.params.fieldName, 
		fieldValue: route.params.fieldValue
	}
}


let routes = [
	//Dashboard routes


//audits routes
			{
				path: '/audits/:fieldName?/:fieldValue?',
				name: 'auditslist',
				component: () => import('./pages/audits/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/audits/view/:id', 
				name: 'auditsview', 
				component: () => import('./pages/audits/view.vue'), 
				props: true
			},
		

//collect routes
			{
				path: '/collect/:fieldName?/:fieldValue?',
				name: 'collectlist',
				component: () => import('./pages/collect/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/collect/view/:id', 
				name: 'collectview', 
				component: () => import('./pages/collect/view.vue'), 
				props: true
			},
		
			{ 
				path: '/collect/add', 
				name: 'collectadd', 
				component: () => import('./pages/collect/add.vue'), 
				props: true
			},
	
			{ 
				path: '/collect/edit/:id', 
				name: 'collectedit', 
				component: () => import('./pages/collect/edit.vue'), 
				props: true
			},
		

//follows routes
			{
				path: '/follows/:fieldName?/:fieldValue?',
				name: 'followslist',
				component: () => import('./pages/follows/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/follows/view/:id', 
				name: 'followsview', 
				component: () => import('./pages/follows/view.vue'), 
				props: true
			},
		
			{ 
				path: '/follows/add', 
				name: 'followsadd', 
				component: () => import('./pages/follows/add.vue'), 
				props: true
			},
	
			{ 
				path: '/follows/edit/:id', 
				name: 'followsedit', 
				component: () => import('./pages/follows/edit.vue'), 
				props: true
			},
		

//hstart routes
			{
				path: '/hstart/:fieldName?/:fieldValue?',
				name: 'hstartlist',
				component: () => import('./pages/hstart/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/hstart/view/:id', 
				name: 'hstartview', 
				component: () => import('./pages/hstart/view.vue'), 
				props: true
			},
		
			{ 
				path: '/hstart/add', 
				name: 'hstartadd', 
				component: () => import('./pages/hstart/add.vue'), 
				props: true
			},
	
			{ 
				path: '/hstart/edit/:id', 
				name: 'hstartedit', 
				component: () => import('./pages/hstart/edit.vue'), 
				props: true
			},
		

//likes routes
			{
				path: '/likes/:fieldName?/:fieldValue?',
				name: 'likeslist',
				component: () => import('./pages/likes/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/likes/view/:id', 
				name: 'likesview', 
				component: () => import('./pages/likes/view.vue'), 
				props: true
			},
		
			{ 
				path: '/likes/add', 
				name: 'likesadd', 
				component: () => import('./pages/likes/add.vue'), 
				props: true
			},
	
			{ 
				path: '/likes/edit/:id', 
				name: 'likesedit', 
				component: () => import('./pages/likes/edit.vue'), 
				props: true
			},
		

//materials routes
			{
				path: '/materials/:fieldName?/:fieldValue?',
				name: 'materialslist',
				component: () => import('./pages/materials/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/materials/view/:id', 
				name: 'materialsview', 
				component: () => import('./pages/materials/view.vue'), 
				props: true
			},
		
			{ 
				path: '/materials/add', 
				name: 'materialsadd', 
				component: () => import('./pages/materials/add.vue'), 
				props: true
			},
	
			{ 
				path: '/materials/edit/:id', 
				name: 'materialsedit', 
				component: () => import('./pages/materials/edit.vue'), 
				props: true
			},
		

//materialsreply routes
			{
				path: '/materialsreply/:fieldName?/:fieldValue?',
				name: 'materialsreplylist',
				component: () => import('./pages/materialsreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/materialsreply/view/:id', 
				name: 'materialsreplyview', 
				component: () => import('./pages/materialsreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/materialsreply/add', 
				name: 'materialsreplyadd', 
				component: () => import('./pages/materialsreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/materialsreply/edit/:id', 
				name: 'materialsreplyedit', 
				component: () => import('./pages/materialsreply/edit.vue'), 
				props: true
			},
		

//notification routes
			{
				path: '/notification/:fieldName?/:fieldValue?',
				name: 'notificationlist',
				component: () => import('./pages/notification/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/notification/view/:id', 
				name: 'notificationview', 
				component: () => import('./pages/notification/view.vue'), 
				props: true
			},
		
			{ 
				path: '/notification/add', 
				name: 'notificationadd', 
				component: () => import('./pages/notification/add.vue'), 
				props: true
			},
	
			{ 
				path: '/notification/edit/:id', 
				name: 'notificationedit', 
				component: () => import('./pages/notification/edit.vue'), 
				props: true
			},
		
			{
				path: '/notification/loginapgelist/:fieldName?/:fieldValue?',
				name: 'notificationloginapgelist',
				component: () => import('./pages/notification/loginapgelist.vue'), 
				props: route => passRouteToProps(route)
			},
	

//permissions routes
			{
				path: '/permissions/:fieldName?/:fieldValue?',
				name: 'permissionslist',
				component: () => import('./pages/permissions/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/permissions/view/:id', 
				name: 'permissionsview', 
				component: () => import('./pages/permissions/view.vue'), 
				props: true
			},
		
			{ 
				path: '/permissions/add', 
				name: 'permissionsadd', 
				component: () => import('./pages/permissions/add.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/edit/:id', 
				name: 'permissionsedit', 
				component: () => import('./pages/permissions/edit.vue'), 
				props: true
			},
		

//replyreply routes
			{
				path: '/replyreply/:fieldName?/:fieldValue?',
				name: 'replyreplylist',
				component: () => import('./pages/replyreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/replyreply/view/:id', 
				name: 'replyreplyview', 
				component: () => import('./pages/replyreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/replyreply/add', 
				name: 'replyreplyadd', 
				component: () => import('./pages/replyreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/replyreply/edit/:id', 
				name: 'replyreplyedit', 
				component: () => import('./pages/replyreply/edit.vue'), 
				props: true
			},
		

//roles routes
			{
				path: '/roles/:fieldName?/:fieldValue?',
				name: 'roleslist',
				component: () => import('./pages/roles/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/roles/view/:id', 
				name: 'rolesview', 
				component: () => import('./pages/roles/view.vue'), 
				props: true
			},
		
			{ 
				path: '/roles/add', 
				name: 'rolesadd', 
				component: () => import('./pages/roles/add.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/edit/:id', 
				name: 'rolesedit', 
				component: () => import('./pages/roles/edit.vue'), 
				props: true
			},
		

//studyrecords routes
			{
				path: '/studyrecords/:fieldName?/:fieldValue?',
				name: 'studyrecordslist',
				component: () => import('./pages/studyrecords/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/studyrecords/view/:id', 
				name: 'studyrecordsview', 
				component: () => import('./pages/studyrecords/view.vue'), 
				props: true
			},
		
			{ 
				path: '/studyrecords/add', 
				name: 'studyrecordsadd', 
				component: () => import('./pages/studyrecords/add.vue'), 
				props: true
			},
	
			{ 
				path: '/studyrecords/edit/:id', 
				name: 'studyrecordsedit', 
				component: () => import('./pages/studyrecords/edit.vue'), 
				props: true
			},
		

//tags routes
			{
				path: '/tags/:fieldName?/:fieldValue?',
				name: 'tagslist',
				component: () => import('./pages/tags/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/tags/view/:id', 
				name: 'tagsview', 
				component: () => import('./pages/tags/view.vue'), 
				props: true
			},
		
			{ 
				path: '/tags/add', 
				name: 'tagsadd', 
				component: () => import('./pages/tags/add.vue'), 
				props: true
			},
	
			{ 
				path: '/tags/edit/:id', 
				name: 'tagsedit', 
				component: () => import('./pages/tags/edit.vue'), 
				props: true
			},
		

//teachers routes
			{
				path: '/teachers/:fieldName?/:fieldValue?',
				name: 'teacherslist',
				component: () => import('./pages/teachers/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/teachers/view/:id', 
				name: 'teachersview', 
				component: () => import('./pages/teachers/view.vue'), 
				props: true
			},
		
			{ 
				path: '/teachers/add', 
				name: 'teachersadd', 
				component: () => import('./pages/teachers/add.vue'), 
				props: true
			},
	
			{ 
				path: '/teachers/edit/:id', 
				name: 'teachersedit', 
				component: () => import('./pages/teachers/edit.vue'), 
				props: true
			},
		

//userauthentications routes
			{
				path: '/userauthentications/:fieldName?/:fieldValue?',
				name: 'userauthenticationslist',
				component: () => import('./pages/userauthentications/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/userauthentications/view/:id', 
				name: 'userauthenticationsview', 
				component: () => import('./pages/userauthentications/view.vue'), 
				props: true
			},
		
			{ 
				path: '/userauthentications/add', 
				name: 'userauthenticationsadd', 
				component: () => import('./pages/userauthentications/add.vue'), 
				props: true
			},
	
			{ 
				path: '/userauthentications/edit/:id', 
				name: 'userauthenticationsedit', 
				component: () => import('./pages/userauthentications/edit.vue'), 
				props: true
			},
		

//users routes
			{
				path: '/users/:fieldName?/:fieldValue?',
				name: 'userslist',
				component: () => import('./pages/users/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/users/view/:id', 
				name: 'usersview', 
				component: () => import('./pages/users/view.vue'), 
				props: true
			},
		
			{ 
				path: '/index/register', 
				name: 'usersuserregister', 
				component: () => import('./pages/index/userregister.vue'), 
				props: true
			},
	
			{ 
				path: '/account/edit', 
				name: 'usersaccountedit', 
				component: () => import('./pages/account/accountedit.vue'), 
				props: true
			},
	
			{ 
				path: '/account', 
				name: 'usersaccountview', 
				component: () => import('./pages/account/accountview.vue'), 
				props: true
			},
	
			{ 
				path: '/users/add', 
				name: 'usersadd', 
				component: () => import('./pages/users/add.vue'), 
				props: true
			},
	
			{ 
				path: '/users/edit/:id', 
				name: 'usersedit', 
				component: () => import('./pages/users/edit.vue'), 
				props: true
			},
		

	
	
//Password reset routes
			{ 
				path: '/index/forgotpassword', 
				name: 'forgotpassword', 
				component: () => import('./pages/index/forgotpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword', 
				name: 'resetpassword', 
				component: () => import('./pages/index/resetpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword_completed', 
				name: 'resetpassword_completed', 
				component: () => import('./pages/index/resetpassword_completed.vue'), 
				props: true
			},
	
	
	
	{ 
		path:  '/error/forbidden', 
		name: 'forbidden', 
		component: () => import('./pages/errors/forbidden.vue'),
		props: true
	},
	{ 
		path: '/error/notfound', 
		name: 'notfound',
		component: () => import('./pages/errors/pagenotfound.vue'),
		props: true
	},
	{
		path: '/:catchAll(.*)', 
		component: () => import('./pages/errors/pagenotfound.vue')
	}
];

export default () => {
	
const auth = useAuth();

	
	const user = auth.user;
	if(user){
		const roleName = auth.userRole.toLowerCase();
		let rolePage;
		switch(roleName){
			case "admin":
				rolePage = "admin";
				break;
			case "student":
				rolePage = "student";
				break;
			case "lecturer":
				rolePage = "lecturer";
				break;
			default:
				rolePage = "home";
		}
		
		//Dashboard route
		//Display page based on user role
		routes.push({
			path: '/',
			alias: '/home', 
			name: 'home', 
			component: () => import(`./pages/home/${rolePage}.vue`),
			props: true
		});
	}
	else{
		routes.push({
			path: '/', 
			alias: '/index', 
			name: 'index', 
			component: () => import('./pages/index/index.vue'),
			props: true
		});
	}

	const router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPostion){
			if(savedPostion) return savedPostion;
			return { top:0 }
		}
	});
	
	router.beforeEach((to, from, next) => {
		const user = auth.user;
		let path = to.path;
		let authRequired = auth.pageRequiredAuth(path);
		if (authRequired) {
			if(!user){
				return next({ path: '/',  query: { nexturl: to.fullPath } });
			}
			//authorize user
			if (!auth.canView(path)) {
				return next({path: "/error/forbidden"});
			}
		}

		if(user && to.name == "index"){
			//already logged in, show home when try to access index page
			return next({ path: "/home"});
		}

		//navigate to redirect url if available
		if(to.name == "home" && to.query.nexturl){
			return next({ path: to.query.nexturl});
		}

 		//close dialog from previous page
		//store.closeDialogs('app/closeDialogs');
		
		next();
	});

	return router;
}
