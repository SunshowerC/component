/**
 * Created by willchen on 2017/8/30.
 */

/*
* @description 是否是事件委托中的元素
* @target {HTMLElement} 当前目标元素
* @delegateDom {string} 委托的类名或标签名
* @return {boolean} 是否是事件委托中的元素
* */



let isDelegateDom = (target, delegateDom) => {
    if (/^\.\w{0,}/.test( delegateDom ) ) {
        return target.classList.contains( delegateDom.slice(1) );
    } else {
        return target.tagName.toLowerCase() === delegateDom;
    }
}

/*
* @description 是否是dom元素
* @elem {obj} 输入的dom元素
* @return {boolean} 是否是dom元素
* */
export let isDom = (elem) => {
    return  /element/i.test(elem.toString());
};


/*
* @description 绑定事件
* @elem {HTMLElement} 绑定事件的元素
* @event {string} 绑定的事件
* @callback {function} 事件回调
* @delegateDom {string} 事件委托字符串，不填默认不委托
* */
export let bindEvent = ({elem, event, callback, delegateDom}) => {
    elem.addEventListener(event, function (e) {

        if ( delegateDom ) {

            isDelegateDom(e.target, delegateDom) && callback.call(this,e);
        } else {
            callback.call(this,e);
        }

    })
};


export let $ = (elem) => {
    if (typeof elem === 'string') {
        return document.querySelector.call(document, elem);
    } else if (isDom(elem)) {
        return elem;
    }

};