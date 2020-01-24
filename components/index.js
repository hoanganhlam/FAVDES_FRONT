import Vue from 'vue'
import Login from '../components/Login'
import User from '../components/User'
import UserFollow from '../components/UserFollow'
import CreatePost from "./CreatePost";
import SingleSelect from "./SingleSelect";
import MultipleSelect from "./MutipleSelect";
import MediaSlider from "./MediaSlider";
import Map from "./Map"
import Editable from "./Editable";
import Upload from "./Upload";
import Activity from "./Activity";
import Avatar from "./Avatar";
import Follow from "./Follow";
import MediaViewer from "./MediaViewer";

Vue.component('media-viewer', MediaViewer)
Vue.component('follow', Follow)
Vue.component('Avatar', Avatar)
Vue.component('Upload', Upload)
Vue.component('editable', Editable)
Vue.component('world-map', Map)
Vue.component('Login', Login)
Vue.component('user-card', User)
Vue.component('user-follow', UserFollow)
Vue.component('create-post', CreatePost)
Vue.component('single-select', SingleSelect)
Vue.component('multiple-select', MultipleSelect)
Vue.component('media-slider', MediaSlider)
Vue.component('activity', Activity)
