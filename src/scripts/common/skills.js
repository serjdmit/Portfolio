import Vue from 'Vue';

Vue.components('skills-item', {
    template: '#skills-item',
    props: ['skill']
});

Vue.components('skills-list', {
    template: '#skills-list',
    props: ['items'],
    data() {
        return {
            title: "Список скилов"
        }
    }
});

const app = new Vue({
    data: {
        skills: [
            {title: 'Frontend', percents: 80},
            {title: 'Backend', percents: 80},
            {title: 'Workflow', percents: 80},
        ]
    }
});

app.$mount('#app');