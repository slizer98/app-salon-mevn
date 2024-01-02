<script setup>
  import { onMounted, inject, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import AuthAPI from '../../api/AuthAPI';

  const toast = inject('toast')
  const route = useRoute()
  const router = useRouter()

  const validToken = ref(false)

  const { token } = route.params

  onMounted(async() => {
    try {
      const { data } = await AuthAPI.verifyPasswordResetToken(token)
      validToken.value = true
    } catch (error) {
      toast.open({ message: error.response.data.msg, type: 'error'})
    }
  })

  const handleSubmit = async({password}) => {
    try {
      const { data } = await AuthAPI.updatePassword(token, {password})
      toast.open({message: data.msg, type: 'success'})
      setTimeout(() => {
        router.push({name: 'login'})
      }, 3000);
    } catch (error) {
      toast.open({message: error.response.data.msg, type: 'error'})
    }
  }

</script>

<template>
  <div v-if="validToken">
    <h1 class="text-5xl font-extrabold text-white text-center mt-10">Nueva contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Coloca tu nueva contraseña</p>
    
    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
    >
    
      <FormKit 
        type="password"
        label="Contraseña"
        name="password"
        placeholder="Contraseña de usuario - Min 8 caracteres" 
        validation="required|length:8"
        :validation-messages="{
          required: 'La contraseña es obligatoria',
          length: 'La contraseña debe contener al menos 8 caracteres'
        }"
      />
      <FormKit 
        type="password"
        label="Repetir Contraseña"
        name="password_confirm"
        placeholder="Repite la Contraseña" 
        validation="required|confirm"
        :validation-messages="{
          required: 'La contraseña es obligatoria',
          confirm: 'Las contraseñas no son iguales'
        }"
      />
    
      <FormKit type="submit">Guardar contraseña</FormKit>
    
    </FormKit>
  </div>
  <div v-else>
    <p class="text-center text-4xl font-black text-white">Oops!</p>
    <p class="text-center text-2xl font-black text-white mt-5">Token No Válido</p>
  </div>
</template>

