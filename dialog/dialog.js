/**
 * Created by willchen on 2017/9/5.
 */

import {$, isDom, bindEvent} from './public';


/**
 * 打开对话窗，需要和w-dialog 样式配套使用。
 * @params {object} options - 对话框配置
 *      - {string<selector>} container - 对应模态框的选择器，container 内的元素，如果存在data-dismiss，则绑定关闭窗口事件。
 *      - {function} handleClose - 模态框关闭后的回调函数
 *      - {function} handleOpen - 模态框打开后的回调函数
 *
 * 暴露外部的接口：
 * Dialog.prototype.close - 手动关闭窗口
 * Dialog.prototype.open - 手动打开窗口
 * */
export default class Dialog {
    constructor({ container, handleClose, handleOpen  }) {
        let defaultOpt = {
            closeSelector: '[data-dismiss]',
        }

        Object.assign(this, defaultOpt);

        this.container = isDom(container) ? container : document.querySelector(container);
        this.handleClose = handleClose;
        this.handleOpen = handleOpen;

        this.transitionDuration = parseFloat( getComputedStyle(this.container).transitionDuration ) * 1000;

        this.init();


    }

    bind() {
        let This = this;
        let allDismissElem = $.all(this.closeSelector, this.container);
        allDismissElem.forEach(item => {
            bindEvent({
                elem: item,
                event: 'click',
                callback() {
                    This.close();
                }
            })
        })
    }

    open() {
        this.container.style.display = `block`;
        setTimeout(()=>{
            // this.container.style.opacity = `1`;
            this.container.classList.add('open');
        }, 0);
        this.handleOpen && this.handleOpen();
    }

    close() {
        // this.container.style.opacity = `0`;
        this.container.classList.remove('open');

        setTimeout(()=> this.container.style.display = `none`, this.transitionDuration);
        this.handleClose && this.handleClose();
    }

    init() {
        this.bind();
    }
}


/*

function Dialog({ container, handleClose, handleOpen  }) {
    let defaultOpt = {
        closeSelector: '[data-dismiss]'
    }

    Object.assign(this, defaultOpt);

    this.container = isDom(container) ? container : document.querySelector(container);
    this.handleClose = handleClose;
    this.handleOpen = handleOpen;

    this.transitionDuration = parseFloat( getComputedStyle(this.container).transitionDuration ) * 1000;
    console.log(this.transitionDuration)
    this.init();
}

Dialog.prototype.bind = function() {
    let This = this;
    let allDismissElem = $.all(this.closeSelector, this.container);
    allDismissElem.forEach(item => {
        bindEvent({
            elem: item,
            event: 'click',
            callback() {
                This.close();
            }
        })
    })
}

Dialog.prototype.open = function() {
    this.container.style.display = `block`;
    setTimeout(()=>{
        // this.container.style.opacity = `1`;
        this.container.classList.add('open');
    }, 0);
    this.handleOpen && this.handleOpen();
}

Dialog.prototype.close = function() {
    // this.container.style.opacity = `0`;
    this.container.classList.remove('open');

    setTimeout(()=> this.container.style.display = `none`, this.transitionDuration);
    this.handleClose && this.handleClose();
}

Dialog.prototype.init = function() {
    this.bind();
}
*/
