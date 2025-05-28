<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('follows')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFollows') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FollowsListPage ref="followsListPage"  field-name="follows.follower_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FollowsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('follows')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFollows') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FollowsListPage ref="followsListPage"  field-name="follows.following_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FollowsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('likes')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userLikes') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <LikesListPage ref="likesListPage"  field-name="likes.user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                            </LikesListPage>
                        </div>
                    </TabPanel>
                </template>
                <template v-if="auth.canView('hstart')">
                    <TabPanel>
                        <template #header>
                            <div class=" text-lg font-bold" >
                                {{ $t('userHStart') }}
                            </div>
                        </template>
                        <div class="card my-3 p-3 surface-50">
                            <HstartListPage ref="hstartListPage"  field-name="h_start.starteduser_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                            </HstartListPage>
                        </div>
                    </TabPanel>
                </template>
            </TabView>
        </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { useAuth } from 'src/composables/auth';
import { $t } from 'src/services/i18n';
import { usePageStore } from 'src/store/page';
import FollowsListPage from "../follows/list.vue";
import LikesListPage from "../likes/list.vue";
import HstartListPage from "../hstart/list.vue";
const props = defineProps({
	isSubPage: {
		type : Boolean,
		default : true,
	},
	scrollIntoView: {
		type : Boolean,
		default : false,
	},
});
const store = usePageStore('USERS');
const app = useApp();
const auth = useAuth();
const masterRecord = computed(() => store.state.currentRecord);
const activeTab = ref(0);
const pageReady = computed(() => masterRecord.value != null);
//scroll detail page into view
function scrollToDetailPage() {
	if (props.scrollIntoView) {
		const pageElement = document.getElementById('master-detailpage');
		if(pageElement){
			pageElement.scrollIntoView({behavior:'smooth', block:'start'});
		}
	}
}
// pass form data from master to detail
function setDetailPageFormData(){
	const record = masterRecord.value;
	 
	// set follows form data
	const followsStore = usePageStore('follows');
	followsStore.setFormData({ follower_id:record?.user_id, following_id:record?.user_id });
	 
	// set likes form data
	const likesStore = usePageStore('likes');
	likesStore.setFormData({ user_id:record?.user_id });
	 
	// set hstart form data
	const hstartStore = usePageStore('hstart');
	hstartStore.setFormData({ starteduser_id:record?.user_id });
}
watch(() => masterRecord, () => {
		setDetailPageFormData();
		scrollToDetailPage();
	},
	{ deep: true, immediate: true }
);
onMounted(()=>{ 
    scrollToDetailPage();
});
</script>
