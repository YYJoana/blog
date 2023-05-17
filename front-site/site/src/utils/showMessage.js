import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 *
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久消失
 * @param {HTMLElement} container 容器，弹窗显示在容器正中间
 */

export default function(options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const div = document.createElement("div");
  const iconDom = getComponentRootDom(Icon, {
    type,
  });
  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span>
  <div>${content}</div>`;
  const typeClassName = styles[`message-${type}`];
  div.className = `${styles.message} ${typeClassName}`;
  if (!container) {
    container = document.body;
  } else {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }
  container.appendChild(div);
  div.clientHeight;

  div.style.opacity = 1;
  div.style.transform = `translate(-50%, -50%)`;

  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener(
      "transitionend",
      function() {
        div.remove();
        options.callback && options.callback();
      },
      { once: true }
    );
  }, duration);
}
