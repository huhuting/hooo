<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('replyreply')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('studyRecordReplyReply') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <ReplyreplyListPage ref="replyreplyListPage"  field-name="reply_reply.replys_id" :field-value="masterRecord.record_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </ReplyreplyListPage>
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
import ReplyreplyListPage from "../replyreply/list.vue";
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
const store = usePageStore('STUDYRECORDS');
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
	 
	// set replyreply form data
	const replyreplyStore = usePageStore('replyreply');
	replyreplyStore.setFormData({  });
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
