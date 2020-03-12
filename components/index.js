import Vue from 'vue'
import Login from './form/Login'
import User from './card/User'
import UserFollow from './utils/UserFollow'
import CreatePost from "./form/CreatePost";
import MediaSlider from "./media/MediaSlider";
import Map from "./map/Map"
import Upload from "./form/Upload";
import Activity from "./activity/Item";
import Avatar from "./card/Avatar";
import Follow from "./utils/Follow";
import MediaViewer from "./media/MediaViewer";
import Comment from "./form/Comment";
import ActivityList from "./activity/List";
import ActivityDetail from "./activity/Detail";
import Thumbnail from "./card/Thumbnail";
import Step from "./modal/Step";
import TripSetting from "./modal/TripSetting";
import ContentEditable from "./field/ContentEditable";
import CardStep from "./card/Step"

//Field
import DataSelect from "./field/Data";
import Editable from "./field/Editable";
import MapSelect from "./field/MapSelect";
import Field from "./field"
import Json from "./field/Json";
import MediaField from "./field/Media";

Vue.component('field-media', MediaField)
Vue.component('field-json', Json)
Vue.component('field', Field)
Vue.component('map-select', MapSelect)
Vue.component('card-step', CardStep)
Vue.component('ce', ContentEditable)
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
