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
                            <div  class="col-11 " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('materialDetails') }}
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                                <Button :label="$t('reply')" icon="pi pi-file-edit"  @click="app.openPageDialog({ page: 'materialsreply/add', url: `/materialsreply/add` , closeBtn: true })"  class="p-button p-button-sm bg-pink-200 "  />
                            </div>
                            <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                                <div class="">
                                    <div>
                                        <button v-on:click="toggleLike" class="styled-button" :disabled="likeStatus === null">
                                        <!-- 添加图标 -->
                                        <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                        {{ likeStatus === true ? 'unlike' : 'like' }}
                                        </button>
                                        <span class="like-counter" v-if="likeStatus !== null">
                                        {{ likeStatus === true ? 'liked' : 'like' }} | {{likecounter}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                                <div class="">
                                    <div>
                                        <button v-on:click="toggleCollect" class="styled-button" :disabled="collectStatus === null">
                                        <!-- 只保留文字 -->
                                        {{ collectStatus === true ? 'Uncollect' : 'Collect' }}
                                        </button>
                                        <span class="collect-counter" v-if="collectStatus !== null">
                                        {{ collectStatus === true ? 'Collected' : 'Collect' }} | {{ collectcounter }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 comp-grid" >
                                <div class="">
                                    <button 
                                    v-on:click="toggleStart" 
                                    class="styled-button" 
                                    :disabled="cstartStatus === null"
                                    >
                                    <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                    {{
                                    cstartStatus === null 
                                    ? '加载中...' 
                                    : (cstartStatus 
                                    ? (cfans === 1 ? '互关' : '取消关注') 
                                    : '关注')
                                    }}
                                    </button>
                                    <span class="like-counter" v-if="cstartStatus !== null">
                                    {{
                                    cstartStatus 
                                    ? (cfans === 1 ? '互相关注' : '已关注作者') 
                                    : '你未关注作者'
                                    }}
                                    | {{ startCounter }}
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col-12 comp-grid" >
                            <div >
                                <div class="grid ">
                                    <div class="col">
                                        <div class="mb-3 grid ">
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('materialId') }}</div>
                                                        <div class="font-bold">{{ item.material_id }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                        <div class="font-bold">
                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('usersDetail')" v-if="item.user_id" @click="app.navigateTo(`/users/view/${item.user_id}`)" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('title') }}</div>
                                                        <div class="font-bold">{{ item.title }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('filePath') }}</div>
                                                        <div class="font-bold">
                                                            <image-viewer image-size="large" image-preview-size="" :src="item.file_path" width="150px" height="150px" class="img-fluid" :num-display="1">
                                                            </image-viewer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('description') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.description , 5, '...')}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('category') }}</div>
                                                        <div class="font-bold">{{ item.category }}</div>
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
                                                        <div class="text-400 mb-1">{{ $t('video') }}</div>
                                                        <div class="font-bold">{{ item.video }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('tagId') }}</div>
                                                        <div class="font-bold">{{ item.tag_id }}</div>
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
	import UsersViewPage from "../users/view.vue";
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'material_id',
		},
		pageStoreKey: {
			type: String,
			default: 'MATERIALS',
		},
		pageName: {
			type: String,
			default: 'materials',
		},
		routeName: {
			type: String,
			default: 'materialsview',
		},
		apiPath: {
			type: String,
			default: 'materials/view',
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
			command: (event) => { app.openPageDialog({ page:'materials/edit', url: `/materials/edit/${data.material_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canManage('materials/edit', data.user_id)
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.material_id) },
			icon: "pi pi-trash",
			visible: auth.canManage('materials/delete', data.user_id)
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('materialDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isLiked = ref(false); 
const likecounter = ref(0); 
onMounted(()=>{
    getLikeCount(props.id);
});
const likeStatus = ref(null);
onMounted(async () => {
    await getLikeStatus(props.id,auth.userId);
})
const getLikeStatus = async (material_id, user_id) => {
    try {
        const response = await ApiService.get("likes/status/" + material_id + "/" + user_id);
        if (response.data && response.data.length > 0) {
            likeStatus.value = true;
            } else {
            likeStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking like status:', error);
        likeStatus.value = false;
    }
};
const toggleLike = async () => {
    likeStatus.value = !likeStatus.value
    if (likeStatus.value) {
        await like(); 
        } else {
        await unlike(); 
    }
};
const like = async () => {  
    await postLike();
};
const unlike = async () => {  
    await deleteLikeCount(props.id,auth.userId);
};
async function postLike() {
    console.log("==postLike====");
    try {
        let postData = {
            material_id: props.id,
            user_id: auth.userId,
        };
        let response = await ApiService.post("likes/add", postData); 
        } catch (e) {
        console.error(e);
    }
}
async function getLikeCount(mat_id) {
    const response = await ApiService.get("likes/getlikecount/" + mat_id); 
    console.log("==getLikeCount():",response.data[0].likecount);
    likecounter.value = response.data[0].likecount;
}
async function deleteLikeCount(material_id, user_id) {
    try {
        const url = `likes/del/${material_id}/${user_id}`;
        const response = await ApiService.get(url);
        if (response.data && response.data.length > 0) {
            likecounter.value = response.data[0].likecount;
            } else {
            console.error('No like count data received or invalid response format');
            likecounter.value = 0; 
        }
        } catch (error) {
        console.error('Error fetching like count:', error);
        likecounter.value = 0; 
    }
}
//=================================================================
const isCollected = ref(false); 
const collectcounter = ref(0); 
onMounted(()=>{
    getCollectCount(props.id);
});
const collectStatus = ref(null);
onMounted(async () => {
    await getCollectStatus(props.id,auth.userId);
})
const getCollectStatus = async (material_id, user_id) => {
    try {
        const response = await ApiService.get("collect/status/" + material_id + "/" + user_id);
        if (response.data && response.data.length > 0) {
            collectStatus.value = true;
            } else {
            collectStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking collect status:', error);
        collectStatus.value = false;
    }
};
const toggleCollect = async () => {
    collectStatus.value = !collectStatus.value
    if (collectStatus.value) {
        await collect(); 
        } else {
        await uncollect(); 
    }
};
const collect = async () => {  
    await postCollect();
};
const uncollect = async () => {  
    await deleteCollectCount(props.id,auth.userId);
};
async function postCollect() {
    console.log("==postCollect====");
    try {
        let postData = {
            material_id: props.id,
            user_id: auth.userId,
        };
        let response = await ApiService.post("collect/add", postData); 
        } catch (e) {
        console.error(e);
    }
}
async function getCollectCount(mat_id) {
    const response = await ApiService.get("collect/getcollectcount/" + mat_id);
    console.log("==getCollectCount():",response.data[0].collectcount);
    collectcounter.value = response.data[0].collectcount;
}
async function deleteCollectCount(material_id, user_id) {
    try {
        const url = `collect/del/${material_id}/${user_id}`;
        const response = await ApiService.get(url);
        if (response.data && response.data.length > 0) {
            collectcounter.value = response.data[0].collectcount;
            } else {
            console.error('No collect count data received or invalid response format');
            collectcounter.value = 0; 
        }
        } catch (error) {
        console.error('Error fetching collect count:', error);
        collectcounter.value = 0; 
    }
}
//===============================================================
console.log("=============================start==============================")
const isStarted = ref(false); // 是否已经开始
const startCounter = ref(0); // 计数器
const startedid = ref(0); // 文章作者 ID
const cstartStatus = ref(null); // 当前用户是否关注文章作者
const cfans = ref(null); // 互关标志，1 为互关，0 为单方面关注
onMounted(async () => {
    try {
        // 第一步：获取文章作者 ID
        console.log("============startedid:", startedid.value);
        await getStartedid(props.id);
        console.log("============startedid:", startedid.value);
        // 第二步：如果获取到了作者 ID，查询关注数量
        if (startedid.value) {
            await getStartCount(startedid.value);
        }
        // 第三步：查询当前用户是否关注作者
        await getStartStatus(startedid.value, auth.userId);
        // 判断关注状态并进一步处理互关逻辑
        if (cstartStatus.value) {
            // 如果已关注作者，检查是否互关
            await checkMutualFollow(auth.userId, startedid.value);  // 确保这个调用完成后再判断
            console.log("cfans.value:", cfans.value);  // 打印 cfans 的值
            if (cfans.value === 1) {
                console.log("互关");
                } else {
                console.log("作者关注了你");
            }
            } else {
            console.log("你需要先关注作者");
        }
        } catch (error) {
        console.error('初始化过程中发生错误:', error);
    }
});
// 获取文章作者 ID
const getStartedid = async (material_id) => {  
    try {
        console.log("API Response:"); 
        const response = await ApiService.get("follows/getstarteddid/" + material_id);
        console.log("API Response:", response.data); // 打印响应数据
        // 正确检查数据并赋值
        if (response.data && response.data.startedid !== undefined) {
            startedid.value = response.data.startedid; // 直接从对象中获取 startedid
            console.log("Started ID:", startedid.value);
            } else {
            // 如果数据中没有 startedid，处理为空的情况
            console.warn("No startedid found for material_id:", material_id);
            startedid.value = 0;
        }
        } catch (error) {
        console.error("Error fetching startedid:", error);
        startedid.value = 0;
    }
};
// 获取关注数量
const getStartCount = async (following_id) => {  
    try {
        const response = await ApiService.get("follows/getfollowcount/" + following_id);
        console.log("=========getStartCount=========", response.data[0].followcount);
        startCounter.value = response.data[0].followcount; // 从数组提取值
        } catch (error) {
        console.error('Error fetching start count:', error);
        startCounter.value = 0;
    }
};
// 获取当前用户是否关注文章作者
const getStartStatus = async (following_id, follower_id) => {  
    try {
        const response = await ApiService.get("follows/status/" + following_id + "/" + follower_id);
        if (response.data && response.data.length > 0) {
            cstartStatus.value = true; // 当前用户已关注文章作者
            } else {
            cstartStatus.value = false; // 当前用户未关注文章作者
        }
        } catch (error) {
        console.error('Error checking start status:', error);
        cstartStatus.value = null; // 默认没有关注
    }
};
const checkMutualFollow = async (follower_id, following_id) => {
    try {
        // 检查当前用户是否关注了作者
        const response1 = await ApiService.get("follows/fans/" + follower_id + "/" + following_id);
        // 检查作者是否也关注了当前用户
        const response2 = await ApiService.get("follows/fans/" + following_id + "/" + follower_id);
        console.log('Response1 (current user -> author):', response1.data);
        console.log('Response2 (author -> current user):', response2.data);
        // 只有两个条件都成立时才算互关
        if (response1.data && response1.data.length > 0 && response2.data && response2.data.length > 0) {
            cfans.value = 1; // 互关
            console.log("互关");
            } else {
            cfans.value = 0; // 非互关
            console.log("单方面关注");
        }
        } catch (error) {
        console.error("Error checking mutual follow:", error);
        cfans.value = null; // 默认没有互关
    }
};
const toggleStart = async () => {
    try {
        // 切换关注状态
        cstartStatus.value = !cstartStatus.value;
        if (cstartStatus.value) {
            // 当前用户关注作者
            await addStart();
            // 检查是否为互关
            await checkMutualFollow(auth.userId, startedid.value);
            console.log("你已关注作者");
            } else {
            // 当前用户取消关注作者
            await deleteStart(startedid.value, auth.userId);
            // 更新互关状态为单方面关注
            cfans.value = 0;
            console.log("你已取消关注作者");
        }
        } catch (error) {
        console.error("切换关注状态时发生错误:", error);
    }
};
async function addStart() {
    console.log("====================add===============")
    try {
        const postData = {
            following_id: startedid.value,
            follower_id: auth.userId
        };
        console.log("===============postData:",postData)
        let response = await ApiService.post("follows/add", postData);
        } catch (e) {
        console.error('Error adding collect:', e);
    }
};
async function deleteStart(following_id, follower_id) {
    try {
        console.log("===============del==============");
        const url = `follows/del/${following_id}/${follower_id}`;
        console.log("DELETE URL:", url); // 打印 URL
        const response = await ApiService.get(url);
        console.log("Delete Response:", response.data);
        if (response.data && response.data.success) {
            console.log("start removed successfully.");1
            await getStartCount(material_id); // 更新收藏计数
            } else {
            console.error("Delete operation failed:", response.data.message);
        }
        } catch (error) {
        console.error("Error removing start:", error.message);
        console.error("Error Details:", error.response ? error.response.data : error); // 打印更多信息
    }
}
</script>
<style scoped>
button.styled-button {
  background-color: #ffb6c1; /* 粉色背景 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
button.styled-button:hover {
  background-color: #ff8c94; /* 深粉色悬停效果 */
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
button.styled-button:active {
  background-color: #c71585; /* 更深的粉色按下效果 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
}
button.styled-button:disabled {
  background-color: #c0c0c0;
  color: #ffffff;
  cursor: not-allowed;
  box-shadow: none;
}
/* 图标样式 */
button.styled-button i {
  font-size: 18px; /* 图标大小 */
  vertical-align: middle; /* 图标垂直居中 */
}
/* 点赞计数器样式 */
.like-counter {
  font-size: 14px;
  color: #777;
  margin-left: 10px;
  font-weight: 600;
}
/* 可选：确保按钮计数器的垂直对齐 */
.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}
/* 可选：调整按钮和计数器的间距 */
.like-counter,
.collect-counter {
    margin-top: 4px;
    font-size: 14px;
    color: #555;
}
</style>
