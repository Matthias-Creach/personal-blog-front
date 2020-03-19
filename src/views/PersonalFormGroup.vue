<template>
    <b-form-group
        label-cols-sm="4"
        label-cols-lg="3"
        :label="label"
        v-bind:label-for="this.id"
    >

        <b-form-input
            :name="this.id"
            :type="this.type"
            v-model="myValue"
            v-validate="this.rules"
            :state="validateState(this.id)"
            v-bind="attrPerso"
            :ref="this.short"
            v-on:refresh="refreshArchitecture($event)"
        ></b-form-input>

        <b-form-invalid-feedback :id="this.feedback">{{veeErrors.first(this.feedback) }}
            {{invalid}}
        </b-form-invalid-feedback>

    </b-form-group>
</template>

<script>
    
export default{
    name: 'PersonalFormGroup',
    props: [
        'label'
       ,'id'
       ,'title'
       ,'name'
       ,'feedback'
       ,'short'
       ,'type'
       ,'rules'
       ,'disabled'
       ,'datavvas'
       ,'invalid'
    ],
    data(){
        
        return {
            myValue:'',
            attrPerso: []
        }

    },
    mounted(){
        this.myValue = this.title
        this.attrPerso = [
            {id:   this.id},
            {name: this.id},
            {'aria-describedby': this.feedback},
            {'data-vv-as': this.short},
            {'autocomplete' : 'on'},
            {'disabled': this.disabled ? true : false},
        ]
    },
    methods:{
        validateState(ref){
            if(this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)){
                return !this.veeErrors.has(ref);
            }
            return null;
        },
    },
    watch:{
        myValue: function(val){
            this.$emit('update:title', val)
        }
    }
}
</script>

<style>
.no_check{
    
}

</style>