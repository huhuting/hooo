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
                                    {{ $t('studyRecordDetails') }}
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
                                                        <div class="text-400 mb-1">{{ $t('recordId') }}</div>
                                                        <div class="font-bold">{{ item.record_id }}</div>
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
                                                        <div class="text-400 mb-1">{{ $t('materialId') }}</div>
                                                        <div class="font-bold">
                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('materialsDetail')" v-if="item.material_id" @click="app.openPageDialog({ page: 'materials/view', url: `/materials/view/${item.material_id}` , closeBtn: true })" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('studyDuration') }}</div>
                                                        <div class="font-bold">{{ item.study_duration }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('studyDate') }}</div>
                                                        <div class="font-bold">{{$utils.humanDatetime( item.study_date )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('blocknum') }}</div>
                                                        <div class="font-bold">{{ item.blocknum }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('syHash') }}</div>
                                                        <div class="font-bold">{{ item.sy_hash }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('sysuserid') }}</div>
                                                        <div class="font-bold">{{ item.sysuserid }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('timestamp') }}</div>
                                                        <div class="font-bold">{{ item.timestamp }}</div>
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
	import { defineAsyncComponent, computed,  toRefs, onMounted } from 'vue';
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
			default: 'record_id',
		},
		pageStoreKey: {
			type: String,
			default: 'STUDYRECORDS',
		},
		pageName: {
			type: String,
			default: 'studyrecords',
		},
		routeName: {
			type: String,
			default: 'studyrecordsview',
		},
		apiPath: {
			type: String,
			default: 'studyrecords/view',
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
			command: (event) => { app.openPageDialog({ page:'studyrecords/edit', url: `/studyrecords/edit/${data.record_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canManage('studyrecords/edit', data.sysuserid)
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.record_id) },
			icon: "pi pi-trash",
			visible: auth.canManage('studyrecords/delete', data.sysuserid)
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('studyRecordDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
</script>
<style scoped>
</style>
