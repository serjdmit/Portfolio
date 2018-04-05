Vue.component('skills-item', {
    template: "#skills-item",
    props: ['skill']
})
  
Vue.component("skills-list", {
    template: "#skills-list",
    props: ['items'],
    data() {
        return {
            title: "Список скиллов"
        }
    }
});

const app = new Vue({
    data: {
    skills: [
            { title: "Frontend", subSkills: [
                { subTitle: "HTML5", percents: 92 },
                { subTitle: "CSS3", percents: 91 },
                { subTitle: "JS & jQuery", percents: 55 }
            ] },
            { title: "Backend", subSkills: [
                { subTitle: "PHP", percents: 55 },
                { subTitle: "NODE.JS", percents: 60 },
                { subTitle: "Laravel", percents: 45 }
            ] },
            { title: "Workflow", subSkills: [
                { subTitle: "Gulp", percents: 85 },
                { subTitle: "Webpack", percents: 50 }
            ] }
        ]
    }
});

app.$mount("#app");
  