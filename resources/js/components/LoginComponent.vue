<template>
	<v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="error">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
               
              
              </v-toolbar>
              <v-card-text>
              	<v-progress-linear value="15" :active="loading" :indeterminate="loading" absolute bottom color="deep-purple accent-4"></v-progress-linear>
                <v-form>
                  <v-text-field prepend-icon="mdi-account" v-model="email" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
	export default{
		data(){
			return {
				email:'',
				password:'',
				loading:false,
				text:'',
				snackbar:false,
			}
		},
		methods:{

	 login:function(){
              
    
	// Add a request interceptor
axios.interceptors.request.use((config)=> {
    // Do something before request is sent
     this.loading = true;
    return config;
  },  (error) =>{
  	this.loading = false;
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use( (response)=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    this.loading = false;
    return response;
  }, (error)=> {
  	this.loading = false;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // this.loading = true;
    return Promise.reject(error);
  });

  		axios.post('/api/login',{'email':this.email,'password':this.password})
  		.then(res=>{


             localStorage.setItem('token',res.data.token);

             this.$router.push('/admin').then(res=>{
             	console.log('LoggedIn Successfully');
             }).catch(err=>{
             	console.log(err);
             })
  		}).catch(err=>{

  			// console.log(err.response.data.status);

  			this.text = err.response.data.status;
  			this.snackbar = true;
  		})

	   } 
	}

	}
</script>
<style scoped></style>