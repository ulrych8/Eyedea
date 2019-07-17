new Vue({
  el: ".buttons",
  data: () => ({
    activeTab: 0,
    menuItems: [{
        title: "Sales"
      },
      {
        title: "Book Details"
      },
      {
        title: "Comments"
      },
      {
        title: "Related Books"
      },
      {
        title: "Report"
      }
    ]
  }),
  mounted() {
    // set the initial stripe
    let strip = this.$el.querySelector(".buttons-strip");
    let activeBtn = this.$el.querySelector('.button.active');
    strip.style.left = this.actualPos(activeBtn, "left") + 'px'
    strip.style.width = activeBtn.getBoundingClientRect().width.toFixed(2) + 'px'

  },

  methods: {
    actualPos(k, type) {
      let parent = this.$el.getBoundingClientRect()
      let child = k.getBoundingClientRect()
      return child[type] - parent[type]
    },
    onTabSelect(index, e) {
      let payload = {
        e,
        oldIndex: this.activeTab,
        newIndex: index
      };
      this.applyStrip(payload);
      this.activeTab = index;
    },
    applyStrip(data) {
      let direction = null;
      let strip = this.$el.querySelector(".buttons-strip");
      let {
        e,
        oldIndex,
        newIndex
      } = data;
      if (newIndex > oldIndex) direction = "right"
      else if (oldIndex > newIndex) direction = "left"
      let targetUtils = {
        width: e.target.getBoundingClientRect().width,
        left: this.actualPos(e.target, "left")
      };
      let stripLeft = this.actualPos(strip, "left")
      if (direction === "right") {
        strip.style.width =
          strip.getBoundingClientRect().width +
          (targetUtils.left +
            targetUtils.width -
            (stripLeft + strip.getBoundingClientRect().width)) +
          "px";
        setTimeout(() => {
          strip.style.left = targetUtils.left + "px";
          strip.style.width = targetUtils.width + "px";
        }, 300);
      } else if (direction === "left") {
        let hole;
        hole = stripLeft - targetUtils.left;
        strip.style.width = strip.getBoundingClientRect().width + hole + "px";
        strip.style.left = targetUtils.left + "px";
        setTimeout(() => {
          strip.style.width = targetUtils.width + "px";
        }, 300);
      }
    },
  },
});
