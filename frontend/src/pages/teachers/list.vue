<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('teachers') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <template v-if="auth.canView('teachers/add')">
                                <router-link :to="`/teachers/add`">
                                    <Button :label="$t('addNewTeacher')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                                </router-link>
                            </template>
                        </div>
                        <div  class="col-12 md:col-3 " >
                            <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText  :placeholder="$t('search')" class="w-full" :value="filters.search.value" @input="debounce(() => { filters.search.value = $event.target.value })"  />
                            </span>
                        </div>
                        
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section  card " >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="flex align-items-center">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/teachers'}" :model="pageBreadCrumb" />
                            </template>
                            <!-- Master Page Start -->
                            <!-- page records template -->
                            <div class="page-records" >
                                <div class="grid ">
                                    <template  v-for="(data, index) of records" :key="`pagerecord-${index}`">
                                        <div class="col-12 md:col-4">
                                            <div class="card card shadow-none p-3 surface-100 ">
                                                <div class="grid align-items-center">
                                                    <div  class="col">
                                                        <div class="font-bold">{{ $t('instructorInformation') }}</div>
                                                        <div class="font-bold  text-400">
                                                            <image-viewer image-size="large" image-preview-size="" :src="data.photo" width="100px" height="100px" class="img-fluid" :num-display="1">
                                                            </image-viewer>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr class="my-1" />
                                                <div class="grid align-items-center">
                                                    <div  class="col">
                                                        <div class="font-bold">{{ $t('teacherId') }}</div>
                                                        <div class="font-bold  text-400">
                                                            <router-link :to="`/teachers/view/${data.teacher_id}`">
                                                                {{ data.teacher_id }}
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr class="my-1" />
                                                <div class="grid align-items-center">
                                                    <div  class="col">
                                                        <div class="font-bold">{{ $t('experience') }}</div>
                                                        <div class="font-bold  text-400">{{ data.experience }}</div>
                                                    </div>
                                                </div>
                                                <hr class="my-1" />
                                                <!-- action buttons -->
                                                <div  class=" flex gap-3 justify-content-end">
                                                    <SplitButton dropdownIcon="pi pi-bars" class="p-button dropdown-only p-button-text p-button-plain" :model="getActionMenuModel(data)">
                                                        <i></i>
                                                    </SplitButton>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <!-- Empty record -->
                            <template v-if="pageReady && !records.length">
                                <div class="p-3 my-3 text-500 text-lg font-medium text-center">
                                    {{ $t('noRecordFound') }}
                                </div>
                            </template>
                            <!-- end of empty record-->
                            <!-- pagination component-->
                            <template v-if="showFooter">
                                <div class="">
                                    <div class="grid justify-content-between align-items-center">
                                        <div class="flex gap-2 flex-grow-0">
                                            <template v-if="auth.canView('teachers')">
                                                <div v-if="selectedItems.length" class="m-2">
                                                    <Button @click="deleteItem(selectedItems)" icon="pi pi-trash" class="p-button-danger" :title="$t('deleteSelected')" />
                                                </div>
                                            </template>
                                        </div>
                                        <div v-if="paginate && totalPages > 1" class="flex-grow-1">
                                            <Paginator class="paginator-flat my-3" :first="recordsPosition - 1" @page="(event)=>{pagination.page = event.page + 1}" :rows="pagination.limit" :totalRecords="totalRecords">
                                                <template #start>
                                                    <span class="px-2">
                                                    {{ $t('records') }} <b>{{ recordsPosition }} {{ $t('of') }} {{ totalRecords }}</b>
                                                    </span>
                                                </template>
                                                <template #end>
                                                </template>
                                            </Paginator>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- end of pagination component-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
	import {   toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'teacher_id',
		},
		pageStoreKey: {
			type: String,
			default: 'TEACHERS',
		},
		pageName: {
			type: String,
			default : 'teachers',
		},
		routeName: {
			type: String,
			default: 'teacherslist',
		},
		apiPath: {
			type: String,
			default: 'teachers/index',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		enableCache: {
			type: Boolean,
			default: false,
		},
		paginate: {
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
		showBreadcrumbs: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		importButton: {
			type: Boolean,
			default: false,
		},
		multiCheckbox: {
			type: Boolean,
			default: true,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		mergeRecords: { // for infinite loading
			type: Boolean,
			default: false,
		},
		search: {
			type: String,
			default: '',
		},
		fieldName: null,
		fieldValue: null,
		queryParams: { 
			type: Object,
			default: () => ({})
		},
		sortBy: {
			type: String,
			default: '',
		},
		sortType: {
			type: String,
			default: 'desc', //desc or asc
		},
		isSubPage: {
			type: Boolean,
			default: false,
		},
		emptyRecordMsg: {
			type: String,
			default: () => $t('noRecordFound'),
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
		filterTagClass: {
			type: String,
			default: 'surface-card p-2 text-500 flex-grow-1 text-center m-1 mb-3 flex-grow-1 text-center',
		}
	});
	
	const app = useApp();
	const auth = useAuth();
	
	const defaultStoreState = {
		filters: {
			search: {
				tag: "Search",
				value: '',
				valueType: 'single',
				options: [],
			}
		},
		pagination: {
			page: props.page,
			limit: props.limit,
			sortBy: props.sortBy,
			sortType: props.sortType
		},
		primaryKey: props.primaryKey,
		enableCache: props.enableCache
	}
	const store = usePageStore(props.pageStoreKey,  defaultStoreState);
	
	// page hooks where logics resides
	const page = useListPage({ store, props });
	
	const {records, filters,  totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem,    } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/teachers/view/${data.teacher_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('teachers/view')
		},
		{
			label: () => $t('edit'),
			to: `/teachers/edit/${data.teacher_id}`,
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
		const pageTitle = $t('teachers');
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
.teacher-card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px;
}
.teacher-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
  background: #f9f9f9;
}
.teacher-photo {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
