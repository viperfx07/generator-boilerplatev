import Vue from "vue";
// import store from "@/store/";

export default async (el, $el, opts) => {
  const { default: Container } = await import(
    /* webpackChunkName: "[request]" */ `@/containers/${opts.name}.vue`
  );

  const passedProps = {};

  if (opts.dataSelectors) {
    opts.dataSelectors.forEach(dataSelector => {
      const el = document.querySelector(dataSelector);
      if (el) {
        passedProps[el.dataset.propkey] = JSON.parse(el.innerHTML);
      }
    });
  }

  new Vue({
    // store,
    render(h) {
      return h(Container, {
        props: {
          ...opts.props,
          ...passedProps
        }
      });
    },
    el
  });
};
