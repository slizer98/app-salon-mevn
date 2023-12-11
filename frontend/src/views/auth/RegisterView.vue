
<script setup>
  import { inject } from 'vue';
  import { reset } from '@formkit/vue'
  import AuthAPI from '../../api/AuthAPI'

  const toast = inject('toast')

  const handleSubmit = async({password_confirm, ...formData}) => {
    try {
      const {data} = await AuthAPI.register(formData)
      toast.open({message: data.msg, type: 'success'})
      reset('registerForm')
    } catch (error) {
      toast.open({message: error.response.data.msg, type: 'error'})
    }
  } 
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalon</p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit 
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu Nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto'
      }"
    />

    <FormKit 
      type="email"
      label="Email"
      name="email"
      placeholder="Tu E-mail"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'Email no valido'
      }"
    />

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

    <FormKit type="submit">Crear Cuenta</FormKit>
    
  </FormKit>
  
</template>

