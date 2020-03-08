import Vue from 'vue'
import Login from '../components/Login'
import User from '../components/User'
import UserFollow from '../components/UserFollow'
import CreatePost from "./CreatePost";
import DataSelect from "./field/Data";
import MediaSlider from "./MediaSlider";
import Map from "./Map"
import Editable from "./field/Editable";
import Upload from "./Upload";
import Activity from "./activity/Item";
import Avatar from "./Avatar";
import Follow from "./Follow";
import MediaViewer from "./MediaViewer";
import Comment from "./Comment";
import ActivityList from "./activity/List";
import ActivityDetail from "./activity/Detail";
import Thumbnail from "./Thumbnail";
import Step from "./modal/Step";
import TripSetting from "./modal/TripSetting";

Vue.component('step', Step)
Vue.component('trip-setting', TripSetting)
Vue.component('thumbnail', Thumbnail)
Vue.component('comment', Comment)
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
Vue.component('media-slider', MediaSlider)
Vue.component('activity', Activity)
Vue.component('ActivityDetail', ActivityDetail)
Vue.component('ActivityList', ActivityList)
Vue.component('data-select', DataSelect)
