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
                                    {{ $t('editStudyRecord') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer"  tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <!--[form-content-start]-->
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('userId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrluser_id" v-model.trim="formData.user_id"  :label="$t('userId')" type="number" :placeholder="$t('enterUserId')"   step="any" list="user_id_list"    
                                                    class=" w-full" :class="getErrorClass('user_id')">
                                                    </InputText>
                                                    <api-data-source :enable-cache="true"   api-path="components_data/user_id_option_list" >
                                                        <template v-slot="req">
                                                            <datalist id="user_id_list">
                                                            <option v-for="(menu, index) in req.response" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                            </datalist>
                                                        </template>
                                                    </api-data-source>
                                                    <small v-if="isFieldValid('user_id')" class="p-error">{{ getFieldError('user_id') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('materialId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/material_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('material_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlmaterial_id"  v-model="formData.material_id" :options="req.response" :label="$t('materialId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('material_id')" class="p-error">{{ getFieldError('material_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('studyDuration') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlstudy_duration" v-model.trim="formData.study_duration"  :label="$t('studyDuration')" type="number" :placeholder="$t('enterStudyDuration')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('study_duration')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('study_duration')" class="p-error">{{ getFieldError('study_duration') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('studyDate') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('study_date')" dateFormat="yy-mm-dd" v-model="formData.study_date" :showIcon="true"     mask="YYYY-MM-DD"      />
                                                    <small v-if="isFieldValid('study_date')" class="p-error">{{ getFieldError('study_date') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('blocknum') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlblocknum" v-model.trim="formData.blocknum"  :label="$t('blocknum')" type="number" :placeholder="$t('enterBlocknum')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('blocknum')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('blocknum')" class="p-error">{{ getFieldError('blocknum') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('syHash') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlsy_hash" v-model.trim="formData.sy_hash"  :label="$t('syHash')" type="text" :placeholder="$t('enterSyHash')"      
                                                    class=" w-full" :class="getErrorClass('sy_hash')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('sy_hash')" class="p-error">{{ getFieldError('sy_hash') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--[form-content-end]-->
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button type="submit" :label="$t('update')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
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
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
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
			default: 'studyrecordsedit',
		},
		pagePath: {
			type : String,
			default : 'studyrecords/edit',
		},
		apiPath: {
			type: String,
			default: 'studyrecords/edit',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('update'),
		},
		formValidationError: {
			type: String,
			default: $t('formIsInvalid'),
		},
		formValidationMsg: {
			type: String,
			default: $t('pleaseCompleteTheForm'),
		},
		msgTitle: {
			type: String,
			default: $t('updateRecord'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordUpdatedSuccessfully'),
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formDefaultValues = Object.assign({
		user_id: "", material_id: "", study_duration: "", study_date: new Date(), blocknum: "", sy_hash: "", 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/studyrecords`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			user_id: { required, numeric },
			material_id: { required },
			study_duration: { required, numeric },
			study_date: { required },
			blocknum: { numeric },
			sy_hash: {  }
		}
	});
	
	const page = useEditPage({store, props, formData, rules, afterSubmit });
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	const {  pageReady, saving, loading, } = toRefs(page.state);
	
	const { apiUrl } = page.computedProps;
	
	const { load, submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('editStudyRecord');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
</script>
<style scoped>
</style>
