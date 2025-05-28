<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('likes')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('materialLikes') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <LikesListPage ref="likesListPage"  field-name="likes.material_id" :field-value="masterRecord.material_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                            </LikesListPage>
                        </div>
                    </TabPanel>
                </template>
                <template v-if="auth.canView('materialsreply')">
                    <TabPanel>
                        <template #header>
                            <div class=" text-lg font-bold" >
                                {{ $t('materialMaterialsReply') }}
                            </div>
                        </template>
                        <div class="card my-3 p-3 surface-50">
                            <MaterialsreplyListPage ref="materialsreplyListPage"  field-name="materials_reply.material_id" :field-value="masterRecord.material_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                            </MaterialsreplyListPage>
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
import LikesListPage from "../likes/list.vue";
import MaterialsreplyListPage from "../materialsreply/list.vue";
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
const store = usePageStore('MATERIALS');
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
	 
	// set likes form data
	const likesStore = usePageStore('likes');
	likesStore.setFormData({ material_id:record?.material_id });
	 
	// set materialsreply form data
	const materialsreplyStore = usePageStore('materialsreply');
	materialsreplyStore.setFormData({  });
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
