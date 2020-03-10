import Vue from "nativescript-vue";

import Login from "./components/Login";

new Vue({

    render: h => h('frame', [h(Login)])
}).$start();
