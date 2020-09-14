import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import tema_personalizado_dark from "./themeDark";
import tema_personalizado_light from "./themeLight";

Vue.use(Vuetify);

import es from "vuetify/es5/locale/es";

export default new Vuetify({
  lang: {
    locales: {
      es,
    },
    current: "es",
  },
  icons: {
    iconfont: "md",
  },
  theme: {
    themes: {
      light: tema_personalizado_light,
      dark: tema_personalizado_dark,
    },
    options: {
      customProperties: true,
    },
    dark: false,
  },
  options: {
    minifyTheme: function(css) {
      return process.env.NODE_ENV === "production"
        ? css.replace(/[\s|\r\n|\r|\n]/g, "")
        : css;
    },
  },
});
