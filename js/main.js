const calendar = new Vue({
    el: '.calendar',
    data() {
        return {
            isLoading: false,
            scrollbarWidth: null,
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }
    },
    computed: {
        today() {
            return {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                day: new Date().getDay(),
                hour: new Date().getHours()
            };
        },
        calendarWeekFirstDay() {
            let today = new Date(
                this.today.year,
                this.today.month - 1,
                this.today.date
            );

            let computeSunday =
                today.getDate() -
                today.getDay();

            let sunday = new Date(
                this.today.year,
                this.today.month - 1,
                computeSunday
            );

            return {
                year: sunday.getFullYear(),
                month: sunday.getMonth() + 1,
                date: sunday.getDate(),
                day: sunday.getDay(),
            };
        },
        calendarWeek() {
            const data = [];
            let date;
            for (let i = 0; i < 7; i++) {
                date = new Date(
                    this.calendarWeekFirstDay.year,
                    this.calendarWeekFirstDay.month - 1,
                    this.calendarWeekFirstDay.date + i
                );
                data.push({
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    date: date.getDate(),
                    day: date.getDay(),
                });
            }
            return data;
        },
    },
    methods: {
        checkScrollbarWidth() {
            const wrap = document.querySelector('.calendar__timeline');
            const result = wrap.offsetWidth - wrap.clientWidth + 'px';
            return this.scrollbarWidth = result;
        },
        checkToday(data) {
            return (
                data.year === this.today.year &&
                data.month === this.today.month &&
                data.date === this.today.date
            );
        },
        computeHourDiff() {
            const endTime = new Date(
                this.today.year,
                this.today.month - 1,
                this.today.date,
                23,
                59
            );
            const startTime = new Date(
                this.today.year,
                this.today.month - 1,
                this.today.date,
                0,
                0
            );
            const currentTime = new Date();
            let diff = endTime.getTime() - currentTime.getTime();
            let BaseRatio = endTime.getTime() - startTime.getTime();
            let result = Math.round(((BaseRatio - diff) / BaseRatio) * 100);

            return result;
        },
    },
    mounted() {
        const vm = this;
        setInterval(() => {
            vm.computeHourDiff();
        }, 1000 * 60);

        vm.checkScrollbarWidth();
        window.addEventListener("load", () => {
            vm.checkScrollbarWidth();
        });
        window.addEventListener("resize", () => {
            vm.checkScrollbarWidth();
        });
    },
});