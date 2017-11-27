/**
 * Created by willchen on 2017/8/30.
 */

/*
 * 是否是事件委托中的元素
 * @target {HTMLElement} 当前目标元素
 * @delegateDom {string} 委托的类名或标签名
 * @return {boolean} 是否是事件委托中的元素
 * */



export let isDelegateDom = (target, delegateDom) => {
    return target.matches(delegateDom);
    // if (/^\.\w{0,}/.test( delegateDom ) ) {
    //     return target.classList.contains( delegateDom.slice(1) );
    // } else {
    //     return target.tagName.toLowerCase() === delegateDom;
    // }
}

/*
 *  是否是dom元素
 * @elem {obj} 输入的dom元素
 * @return {boolean} 是否是dom元素
 * */
export let isDom = (elem) => {
    return  /element/i.test(elem.toString());
};


/*
 *  绑定事件
 * @elem {HTMLElement} 绑定事件的元素
 * @event {string} 绑定的事件
 * @callback {function} 事件回调
 * @delegateDom {string} 事件委托字符串，不填默认不委托
 * @params {boolean} option.preventDefault  是否阻止默认事件
 * */
export let bindEvent = ({elem, event, callback, delegateDom, preventDefault }) => {
    elem.addEventListener(event, function (e) {
        if ( delegateDom ) {

            e.target.matches(delegateDom) && callback.call(this,e);

            // isDelegateDom(e.target, delegateDom) && callback.call(this,e);
        } else {
            callback.call(this,e);
        }

        preventDefault && e.preventDefault();

    })
};

/**
 * 元素选择器
 * @elem {string <selector>} - 元素对应的selector
 * @parent {string <selector>} - 查找元素的父元素，默认为document
 * @return {HTMLElement} - 符合的元素
 * */
export let $ = (elem, parent = document) => {
    typeof parent === "string" && ( parent = $(parent) );

    if (typeof elem === 'string') {
        return parent.querySelector.call(parent, elem);
    } else if (isDom(elem)) {
        return elem;
    }

};

/**
 * 选择全部元素
 * @elem {string <selector>} - 元素对应的selector
 * @parent {string <selector>} - 查找元素的父元素，默认为document
 * @return {array<HTMLElement>} - 符合的元素数组
 * */
$.all = (elem, parent = document) => {
    typeof parent === "string" && ( parent = $(parent) );

    if (typeof elem === 'string') {
        return [].slice.call( parent.querySelectorAll.call(parent, elem) );
    }
};

/**
 * 向上遍历，获取 el与selector之间（不包括el，与selector自身） 符合filter的元素
 * @el {HTMLElement} - 当前的HTML元素
 * @selector {string <selector>} - 终点元素
 * @filter {string <selector>} - 过滤筛选出符合 filter 的元素。
 * @return {array<HTMLElement>} - 符合的元素数组
 * */
$.parentsUntil = (el, selector, filter) => {
    const result = [];
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    // match start from parent
    el = el.parentElement;
    while (el && !matchesSelector.call(el, selector)) {
        if (!filter) {
            result.push(el);
        } else {
            if (matchesSelector.call(el, filter)) {
                result.push(el);
            }
        }
        el = el.parentElement;
    }
    return result;
}