<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('userDetails') }}
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 comp-grid" >
                                <div class="">
                                    <div>
                                        <button v-on:click="toggleFollow" class="styled-button" :disabled="followStatus === null">{{ followStatus === true ? 'unfollow': 'follow' }}</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="grid ">
                                    <div class="col">
                                        <div class="mb-3 grid ">
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                        <div class="font-bold">{{ item.user_id }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('username') }}</div>
                                                        <div class="font-bold">{{ item.username }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('email') }}</div>
                                                        <div class="font-bold">{{ item.email }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('bio') }}</div>
                                                        <div class="font-bold">{{ item.bio }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('createdAt') }}</div>
                                                        <div class="font-bold">{{$utils.humanDatetime( item.created_at )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('updatedAt') }}</div>
                                                        <div class="font-bold">{{$utils.humanDatetime( item.updated_at )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('usertele') }}</div>
                                                        <div class="font-bold">{{ item.usertele }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('userRoleId') }}</div>
                                                        <div class="font-bold">
                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('rolesDetail')" v-if="item.user_role_id" @click="app.openPageDialog({ page: 'roles/view', url: `/roles/view/${item.user_role_id}` , closeBtn: true })" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('isTeacher') }}</div>
                                                        <div class="font-bold">{{ item.is_teacher }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- action buttons -->
                                        <div  class=" flex gap-3 justify-content-start">
                                            <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
                                        </div>
                                    </div>
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  my-3 p-1">
                                                <component :is="masterDetailPage" :scroll-into-view="false"></component>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                <div class="text-500">{{ $t('loading') }} </div>
            </div>
        </template>
    </main>
</template>
<script setup>
	import { defineAsyncComponent, computed, ref, toRefs, onMounted } from 'vue';
	import { ApiService } from 'src/services/api';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'user_id',
		},
		pageStoreKey: {
			type: String,
			default: 'USERS',
		},
		pageName: {
			type: String,
			default: 'users',
		},
		routeName: {
			type: String,
			default: 'usersview',
		},
		apiPath: {
			type: String,
			default: 'users/view',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		titleBeforeDelete: {
			type: String,
			default: $t('deleteRecord'),
		},
		msgBeforeDelete: {
			type: String,
			default: () => $t('promptDeleteRecord'),
		},
		msgAfterDelete: {
			type: String,
			default: () => $t('recordDeletedSuccessfully'),
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		}
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	
	const page = useViewPage({ store, props }); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			command: (event) => { app.openPageDialog({ page:'users/edit', url: `/users/edit/${data.user_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canManage('users/edit', data.user_id)
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.user_id) },
			icon: "pi pi-trash",
			visible: auth.canManage('users/delete', data.user_id)
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('userDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isFollow = ref(false)
const followcounter = ref(0); 
onMounted(()=>{
    getFollowCount(props.id);
});
const followStatus = ref(null);
onMounted(async () => {
    await getFollowStatus(props.id,auth.userId);
})
const getFollowStatus = async (following_id, follower_id) => {
    try {
        const response = await ApiService.get("follows/status/" + following_id + "/" + follower_id);
        if (response.data && response.data.length > 0) {
            followStatus.value = true;
            } else {
            followStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking follow status:', error);
        followStatus.value = false;
    }
};
const toggleFollow = async () => {
    followStatus.value = !followStatus.value
    if (followStatus.value) {
        await follow(); 
        } else {
        await unfollow(); 
    }
};
const follow = async () => {
    console.log("==props.id==", props.id);
    isFollow.value = !isFollow.value;
    await postFollow();
    await getFollowCount(props.id);
};
const unfollow = async () => {  
    await deleteFollowCount(props.id,auth.userId);
};
async function postFollow() {
    console.log("==postFllow====");
    try {
        let postData = {
            following_id: props.id,
            follower_id: auth.userId,
        };
        let response = await ApiService.post("follows/add", postData); 
        } catch (e) {
        console.error(e);
    }
}
async function getFollowCount(fol_id) {
    const response = await ApiService.get("follows/getfollowcount/" + fol_id); 
    console.log("==getFollowCount():",response.data[0].followcount);
    followcounter.value = response.data[0].followcount;
}
async function deleteFollowCount(following_id, follower_id) {
    try {
        const url = `follows/del/${following_id}/${follower_id}`;
        const response = await ApiService.get(url);
        if (response.data && response.data.length > 0) {
            followcounter.value = response.data[0].followcount;
            } else {
            console.error('No follow count data received or invalid response format');
            followcounter.value = 0; 
        }
        } catch (error) {
        console.error('Error fetching follow count:', error);
        followcounter.value = 0; 
    }
}
</script>
<style scoped>
</style>
