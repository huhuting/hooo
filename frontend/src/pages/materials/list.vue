<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('materials') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <template v-if="auth.canView('materials/add')">
                                <router-link :to="`/materials/add`">
                                    <Button :label="$t('addNewMaterial')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
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
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-2 sm:col-3 lg:col-3 md:col-3 comp-grid" >
                        <div class="">
                            <div>
                                <button v-on:click="getAccount">getaccount</button>
                                {{account}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-sm-4 col-md-4 col-3 comp-grid" >
                        <div :class="{ 'card ': !isSubPage }" class="p-3 mb-3">
                            <div class="p-3 flex gap-2 align-items-center " >
                                <Avatar size="large" class="" icon="pi pi-clock" />
                                    <div class="font-bold text-primary flex-1">
                                        {{ $t('filterByCreatedAt') }}
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <Calendar :showIcon="true" :manualInput="false" :showButtonBar="true" dateFormat="yy-mm-dd" hourFormat="24" class="w-full" selectionMode="single" v-model="filters.created_at.value" :placeholder="$t('selectDate')"    />
                                </div>
                            </div>
                            <div :class="{ 'card ': !isSubPage }" class="p-3 mb-3">
                                <api-data-source :enable-cache="true" @loaded="(response)=> filters.user_id.options=response"  api-path="components_data/user_id_option_list_2" >
                                    <template v-slot="req">
                                        <div class="p-3 font-bold text-primary" >
                                            {{ $t('filterByUserId') }}
                                        </div>
                                        <div class="mt-2">
                                            <MultiSelect class="w-full" optionLabel="label" optionValue="value" v-model="filters.user_id.value" :options="filters.user_id.options" label="" >
                                            </MultiSelect>  
                                        </div>
                                    </template>
                                </api-data-source>
                            </div>
                            <div :class="{ 'card ': !isSubPage }" class="p-3 mb-3">
                                <api-data-source :enable-cache="true" @loaded="(response)=> filters.tag_id.options=response"  api-path="components_data/tag_id_option_list" >
                                    <template v-slot="req">
                                        <div class="p-3 font-bold text-primary" >
                                            {{ $t('filterByTagId') }}
                                        </div>
                                        <div class="mt-2">
                                            <MultiSelect class="w-full" optionLabel="label" optionValue="value" v-model="filters.tag_id.value" :options="filters.tag_id.options" label="" >
                                            </MultiSelect>  
                                        </div>
                                    </template>
                                </api-data-source>
                            </div>
                        </div>
                        <div  class="col-9 comp-grid" >
                            <section class="page-section mb-3" >
                                <div class="container-fluid">
                                    <div class="grid ">
                                        <div  class="sm:col-4 comp-grid" >
                                            <record-count api-path="components_data/getcount_materialsreply" max="" v-slot="record">
                                            <router-link  :to="`/materialsreply`">
                                                <div class="card bg-blue-100 text-blue-800 " >
                                                    <div class="flex align-items-center justify-content-between">
                                                        <div>
                                                            <div class="font-medium text-lg">Materials Reply</div>
                                                            <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                            <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                            <div class="text-500 text-sm">Total Materials Reply</div>
                                                        </div>
                                                        <div style="width:auto;">
                                                            <Avatar icon="pi pi-th-large" size="large" class="bg-blue-600 text-blue-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </router-link>
                                                </record-count>
                                            </div>
                                            <div  class="sm:col-4 comp-grid" >
                                                <record-count api-path="components_data/getcount_tags" max="" v-slot="record">
                                                <router-link  :to="`/tags`">
                                                    <div class="card bg-blue-100 text-blue-800 " >
                                                        <div class="flex align-items-center justify-content-between">
                                                            <div>
                                                                <div class="font-medium text-lg">Tags</div>
                                                                <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                                <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                                <div class="text-500 text-sm">Total Tags</div>
                                                            </div>
                                                            <div style="width:auto;">
                                                                <Avatar icon="pi pi-th-large" size="large" class="bg-blue-600 text-blue-100" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                    </record-count>
                                                </div>
                                                <div  class="sm:col-4 comp-grid" >
                                                    <record-count api-path="components_data/getcount_likes" max="" v-slot="record">
                                                    <router-link  :to="`/likes`">
                                                        <div class="card bg-blue-100 text-blue-800 " >
                                                            <div class="flex align-items-center justify-content-between">
                                                                <div>
                                                                    <div class="font-medium text-lg">Likes</div>
                                                                    <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                                    <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                                    <div class="text-500 text-sm">Total Likes</div>
                                                                </div>
                                                                <div style="width:auto;">
                                                                    <Avatar icon="pi pi-th-large" size="large" class="bg-blue-600 text-blue-100" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </router-link>
                                                        </record-count>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section class="page-section mb-3" >
                                            <div class="container-fluid">
                                                <div class="grid ">
                                                    <div  class="sm:col-12 comp-grid" >
                                                        <div >
                                                            <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/materials'}" :model="pageBreadCrumb" />
                                                            </template>
                                                            <div class="grid ">
                                                                <div class="col">
                                                                    <!-- page records template -->
                                                                    <div class="page-records"  >
                                                                        <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                                                             :value="records" dataKey="material_id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                                                            <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                                                                <Column  field="" header="" >
                                                                                    <template #body="{ data, index }">
                                                                                        <Button @click="setCurrentRecord(data)" class="p-button-text" icon="pi pi-caret-down" label="" />
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="material_id" :header="$t('materialId')" :sortable="true">
                                                                                    <template #body="{ data, index }">
                                                                                        <router-link :to="`/materials/view/${data.material_id}`">
                                                                                            {{ data.material_id }}
                                                                                        </router-link>
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="title" :header="$t('title')" >
                                                                                    <template #body="{ data, index }">
                                                                                        {{ data.title }}
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="category" :header="$t('category')" :sortable="true">
                                                                                    <template #body="{ data, index }">
                                                                                        <router-link :to="`/materials/category/${data.category}?tag=Category`">
                                                                                            {{ data.category }}
                                                                                        </router-link>
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="video" :header="$t('video')" >
                                                                                    <template #body="{ data, index }">
                                                                                        <video controls width="150"  high="150"> 
                                                                                        <source :src="$utils.getFileFullPath(data.video)" type="video/mp4" />
                                                                                        </video> 
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="tag_id" :header="$t('tagId')" >
                                                                                    <template #body="{ data, index }">
                                                                                        {{ data.tag_id }}
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  field="description" :header="$t('description')" >
                                                                                    <template #body="{ data, index }">
                                                                                        {{$utils.truncate( data.description , 5, '...')}}
                                                                                    </template>
                                                                                </Column>
                                                                                <Column  headerStyle="width: 2rem" headerClass="text-center">
                                                                                    <template #body="{ data, index }">
                                                                                        <div class="flex justify-content-end">
                                                                                            <SplitButton dropdownIcon="pi pi-bars" class="p-button dropdown-only p-button-text p-button-plain" :model="getActionMenuModel(data)">
                                                                                                <i></i>
                                                                                            </SplitButton>
                                                                                        </div>
                                                                                    </template>
                                                                                </Column>
                                                                            </DataTable>
                                                                        </div>
                                                                        <!-- Empty record -->
                                                                        <template v-if="pageReady && !records.length">
                                                                            <div class="p-3 my-3 text-500 text-lg font-medium text-center">
                                                                                {{ $t('noRecordFound') }}
                                                                            </div>
                                                                        </template>
                                                                        <!-- end of empty record-->
                                                                        <!-- pagination component-->
                                                                        <template v-if="showFooter && pageReady">
                                                                            <div class="grid justify-content-between align-items-center">
                                                                                <div class="flex gap-2 flex-grow-0">
                                                                                    <template v-if="auth.canView('materials')">
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
                                                                        </template>
                                                                        <!-- end of pagination component-->
                                                                    </div>
                                                                    <!-- Detal Page Column -->
                                                                    <template v-if="currentRecord && !isSubPage">
                                                                        <div class="col-12">
                                                                            <div class="card  p-0">
                                                                                <component :is="masterDetailPage" :scroll-into-view="true"></component>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
</template>
<script setup>
	import { defineAsyncComponent, computed, ref, toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	import { Web3 } from 'web3';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'material_id',
		},
		pageStoreKey: {
			type: String,
			default: 'MATERIALS',
		},
		pageName: {
			type: String,
			default : 'materials',
		},
		routeName: {
			type: String,
			default: 'materialslist',
		},
		apiPath: {
			type: String,
			default: 'materials/index',
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
			default: 5,
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
			},created_at: {
				tag: "Created At",
				value: '',
				valueType: 'single-date',
				options: [],
			},user_id: {
				tag: "User Id",
				value: [],
				valueType: 'multiple',
				options: [],
			},tag_id: {
				tag: "Tag Id",
				value: [],
				valueType: 'multiple',
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
	
	const {records, filters, currentRecord, totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem, setCurrentRecord,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/materials/view/${data.material_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('materials/view')
		},
		{
			label: () => $t('edit'),
			to: `/materials/edit/${data.material_id}`,
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
		const pageTitle = $t('materials');
		app.setPageTitle(props.routeName, pageTitle);
	});
	 const web3 = ref(null);
 const account = ref('');
 const error = ref('');
   const checkMetaMaskInstalled = () => {
      if (!window.ethereum) {
        error.value = '请先安装 MetaMask 钱包';
        return false;
      }
      return true;
    };
    const initWeb3 = () => {
      try {
        web3.value = new Web3(window.ethereum);
      } catch (err) {
        error.value = '初始化 Web3 失败';
        console.error('Web3初始化错误:', err);
      }
    };
async function getAccount(){
    const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
      console.log(accounts);
        account.value = accounts[0];
        //alert(account.value);
}
onMounted(()=>{
    if (checkMetaMaskInstalled()) {
        initWeb3();
    }
});
</script>
