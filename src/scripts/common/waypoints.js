var waypoint = new Waypoint({
    element: document.getElementById('waypoint'),
    handler: function () {
        $('.skills-list .circle__second').toggleClass('circle__second-hidden');
    },
    offset: '20%'
})