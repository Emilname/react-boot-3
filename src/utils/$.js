function $(selector, root = document) {
  return root.querySelector(selector);
}

$.all = function (selector, root = document) {
  return root.querySelectorAll(selector);
};

export default $;
