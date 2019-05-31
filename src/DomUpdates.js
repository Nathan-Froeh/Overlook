import $ from 'jquery';
import './css/base.scss';


let DomUpdates = {

  tabClick(id, it) {
    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(it).addClass('current');
    $("#" + id).addClass('current');
  }



}

export default DomUpdates;