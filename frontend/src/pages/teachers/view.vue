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
                                    {{ $t('teacherDetails') }}
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 comp-grid" >
                                <div class="">
                                    <div>
                                        <button 
                                        v-on:click="toggleFollow" 
                                        class="styled-button" 
                                        :disabled="followStatus === null" 
                                        :class="{'followed': followStatus, 'unfollowed': !followStatus}">
                                        <!-- 星星图标 -->
                                        <i class="pi pi-star" style="margin-right: 8px;"></i> 
                                        {{ followStatus === true ? 'unfollow' : 'follow' }}
                                        </button>
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
                                <div class="mb-3 grid ">
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('teacherId') }}</div>
                                                <div class="font-bold">{{ item.teacher_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                <div class="font-bold">
                                                    <Button class="p-button-text" icon="pi pi-eye" :label="$t('usersDetail')" v-if="item.user_id" @click="app.openPageDialog({ page: 'users/view', url: `/users/view/${item.user_id}` , closeBtn: true })" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('experience') }}</div>
                                                <div class="font-bold">{{ item.experience }}</div>
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
                                                <div class="text-400 mb-1">{{ $t('photo') }}</div>
                                                <div class="font-bold">
                                                    <image-viewer image-size="medium" image-preview-size="" :src="item.photo" width="auto" height="auto" class="img-fluid" :num-display="1">
                                                    </image-viewer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- action buttons -->
                                <div  class=" flex gap-3 justify-content-start">
                                    <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
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
	import {  ref, toRefs, onMounted } from 'vue';
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
			default: 'teacher_id',
		},
		pageStoreKey: {
			type: String,
			default: 'TEACHERS',
		},
		pageName: {
			type: String,
			default: 'teachers',
		},
		routeName: {
			type: String,
			default: 'teachersview',
		},
		apiPath: {
			type: String,
			default: 'teachers/view',
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
			command: (event) => { app.openPageDialog({ page:'teachers/edit', url: `/teachers/edit/${data.teacher_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canView('teachers/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.teacher_id) },
			icon: "pi pi-trash",
			visible: auth.canView('teachers/delete')
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = $t('teacherDetails');
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
/* Scoped styles for the follow/unfollow button */
.styled-button {
    background-color: #ffcc00; /* 黄色背景 */
    color: #fff; /* 白色文字 */
    border: 2px solid #ffcc00; /* 黄色边框 */
    border-radius: 4px; /* 圆角边框 */
    padding: 10px 20px; /* 上下左右内边距 */
    font-size: 16px; /* 字体大小 */
    font-weight: bold; /* 加粗字体 */
    cursor: pointer; /* 鼠标变为指针 */
    transition: all 0.3s ease; /* 平滑过渡效果 */
}
.styled-button:hover {
    background-color: #ffb300; /* 悬浮时的稍深黄色 */
    border-color: #ffb300; /* 悬浮时的边框颜色 */
}
.styled-button:active {
    background-color: #e6a800; /* 按下时的更深黄色 */
    border-color: #e6a800; /* 按下时的边框颜色 */
}
.styled-button:disabled {
    background-color: #f2e0a3; /* 禁用时的浅黄色背景 */
    color: #a9a9a9; /* 禁用时的文字颜色 */
    border: 2px solid #f2e0a3; /* 禁用时的边框颜色 */
    cursor: not-allowed; /* 禁用时的光标 */
}
.styled-button .pi {
    margin-right: 8px; /* 图标与文字之间的间距 */
}
/* 自定义样式，用于更改按钮的状态显示 */
.followed .styled-button {
    background-color: #ff9800; /* 关注后的黄色按钮 */
    border-color: #ff9800; /* 黄色边框 */
}
.unfollowed .styled-button {
    background-color: #ffcc00; /* 取消关注后的黄色按钮 */
    border-color: #ffcc00; /* 黄色边框 */
}
</style>
