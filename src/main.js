import { mount } from 'svelte'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/app.css'
import App from './App.svelte'
import 'aos/dist/aos.css';

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
