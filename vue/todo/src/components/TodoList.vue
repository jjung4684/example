<template>
  <section>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in propsdata" class="shadow" :key="todoItem">
          <i class="checkBtn fas fa-check" aria-hidden="true"></i>
          {{todoItem}}
          <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
          </span>
        </li>
      </transition-group>
  </section>
</template>

<script src="../../src/js/list.js"/>
<style scoped src="../../src/css/list.css"/>

