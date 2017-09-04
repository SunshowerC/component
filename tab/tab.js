/**
 * Created by willchen on 2017/8/30.
 */
/*
* @description:
* @option {object} 配置项
* @option.container {string} 容器的dom或容器的ID
* @option.handleTabClick {function} 点击tab nav 时的回调
*
* */
import {isDom, bindEvent} from './public';

export default class Tab {
    constructor({ container, handleTabClick  }) {
        this.container = isDom(container) ? container : document.querySelector(container);
        this.handleTabClick = handleTabClick;

        let defaultOpt = {
            tabNavClass: '.w-tab-nav',
            triggerEvent: 'click',
            triggerProp: 'href'
        };

        Object.assign(this, defaultOpt);

        // this.tabNavClass = '.w-tab-nav';
        // this.triggerEvent = 'click';
        // this.triggerProp = 'href';


        this.tabNavAll = Array.from( this.container.querySelectorAll(this.tabNavClass) );



        this.tabBodyAll = []; // tab-pane 主体内容

        this.init();
    }

    getAllTabPane() {
        this.tabNavAll.forEach(item => {

            this.tabBodyAll.push( document.querySelector( item.getAttribute(this.triggerProp) ) );
        });
    }

    bind() {
        let This = this;
        bindEvent({
            elem: this.container,
            event: this.triggerEvent,
            delegateDom: this.tabNavClass,
            callback(e) {

                This.toggleActiveTabMenu( e.target );
                This.toggleActiveTab( e.target );

                typeof This.handleTabClick === 'function' && This.handleTabClick(e);
            }
        })
    }

    /*切换tab导航*/
    toggleActiveTabMenu(elem) {
        this.tabNavAll.forEach(item => {
            item.classList.remove('active');
        });
        elem.classList.add(`active`);
    }

    /*切换主体内容*/
    toggleActiveTab(elem) {
        this.tabBodyAll.forEach( item => {
            item.classList.remove('active');
        });

        let currentTab = document.querySelector(elem.getAttribute(this.triggerProp) );
        currentTab.classList.add('active');

    }

    /*初始化选中状态*/
    initTabStatus() {
        this.container.querySelector(this.tabNavClass + '.active').click();
    }

    init() {
        this.getAllTabPane();
        this.bind();
        this.initTabStatus();
    }

}
