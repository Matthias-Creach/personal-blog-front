<template>
	<!-- Upload new file -->
    <div style="margin-bottom: 20px;">
        <b-form-file
            v-model="upload"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @change="addFile"
        >    
        </b-form-file>
    </div>
</template>

<script>

import FileService from '../../services/folder/file.service';
export default{
	name: 'PersonalUpload',
	props: ['path', 'fileName'],
	data(){
		return{
			upload: null,
		}
	},
	methods:{
		addFile(event){
            if(event){
                // Retrieve file and put it into FormData Object
                let file = event.target.files[0]
                let formData = new FormData();
                formData.append('upload', file);

                //Call FileService to upload the file and refresh the architecture
                FileService.addFile(formData, this.path, this.fileName).then(response => {
                    this.$emit('upload', response)
                });
            }
        },
	}
}

</script>