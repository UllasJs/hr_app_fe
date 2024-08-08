<template>
    <div>
        <ClientOnly>
            <div class="o-input-wrapper right cursor-pointer o-dp-trig disabled" ref="select" :class="{ open: open }">
                <div @click="toggle">
                    <slot name="trigger" :displayDate="displayDate">
                        <div class="o-input right !pr-[65px]" :class="{ disabled: disabled }">
                            <div v-if="displayDate" class="text-ellipsis overflow-hidden whitespace-nowrap">{{
                                displayDate }}
                            </div>
                            <div class="placeholder" v-else>{{ placeholder }}&nbsp;</div>
                        </div>
                    </slot>
                </div>
            </div>
            <OptionsWrapper :open="open" :el="select" :width="getWidth()" @close="open = false">
                <div>
                    <DateCalender />
                </div>
            </OptionsWrapper>
        </ClientOnly>
    </div>
</template>

<script setup>

const props = defineProps({
    modelValue: [Date, String],
    label: String,
    default: Boolean,
    disabledEndDates: [String, Date],
    disabledStartDates: [String, Date],
    disabled: {
        type: Boolean,
        default: false
    },
    endOfDay: Boolean,
    showTime: {
        type: Boolean,
        default: false
    },
    disableFutureDates: {
        type: Boolean,
        default: false

    },
    placeholder: {
        type: String,
        default: ''
    },
    disablePastThreeMonth: {
        type: Boolean,
        default: false
    },
    validTwoMonthsDate: [String, Date],
    showDay: Boolean
})
const calender = ref()
const emit = defineEmits(['update:modelValue'])
const localModelValue = ref()

const getWidth = () => {
    return props.showTime ? 320 : 252
}

watchEffect(() => {
    if (props.modelValue) {
        localModelValue.value = props.modelValue
    }
})


onMounted(() => {
    if (props.modelValue == null)
        localModelValue.value = ''
    else if (props.modelValue) {
        localModelValue.value = props.modelValue
        renderedMonth.value = props.modelValue.getMonth()
        renderedYear.value = props.modelValue.getFullYear()
    }
    else {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        renderedMonth.value = today.getMonth()
        renderedYear.value = today.getFullYear()
        if (props.default) {
            localModelValue.value = today
            let emitValue = new Date(localModelValue.value)
            if (props.endOfDay) {
                emitValue.setHours(23, 59, 59)
            }
            emit('update:modelValue', emitValue)
        }
    }
})

watch(localModelValue, (newValue) => {
    if (newValue) {
        if (!props.endOfDay) {
            emit('update:modelValue', newValue)
            return
        }
        let emitValue = new Date(newValue)
        emitValue.setHours(23, 59, 59)
        if (emitValue.getTime() != newValue.getTime()) {
            emit('update:modelValue', emitValue)
        }
    }
    else {
        emit('update:modelValue', '')
    }
})

const clearValue = () => {
    localModelValue.value = ''
}

const page = ref('date')
const yearOptions = ref()
const toPage = (targetPage) => {
    page.value = targetPage
    if (targetPage == 'year') {
        nextTick(() => {
            const targetYear = yearOptions.value.querySelector('.o-dp-year-cell.selected')
            targetYear.scrollIntoView()
        })
    }
}

const renderedMonth = ref(0)
const renderedYear = ref(2023)

const navigateMonth = (monthChange) => {
    let newMonth = renderedMonth.value + monthChange
    let newCalendarDate = new Date(renderedYear.value, newMonth)
    renderedMonth.value = newCalendarDate.getMonth()
    renderedYear.value = newCalendarDate.getFullYear()
}

const selectMonth = (targetMonth) => {
    renderedMonth.value = targetMonth
    toPage('date')
}

const selectYear = (targetYear) => {
    renderedYear.value = targetYear
    toPage('month')
}

const yearSelectionRange = computed(() => {

    let minYear = renderedYear.value - 100
    let maxYear = new Date().getFullYear() + 20

    let yearRange = []
    for (let i = minYear; i <= maxYear; i++) {
        yearRange.push(i)
    }
    return yearRange
})

const { t } = useI18n()
const displayDate = computed(() => {
    let dateObject = props.modelValue
    try {
        if (typeof date == 'string' || typeof date == 'number') {
            dateObject = new Date(date)
        }
        if (!dateObject || isNaN(dateObject.getTime())) {
            return ''
        }

        let month = dateObject.getMonth() + 1;
        if (month < 10) month = `0${month}`;

        let dayDate = dateObject.getDate();
        if (dayDate < 10) dayDate = `0${dayDate}`;

        if (props.showTime) {
            const hr = dateObject.getHours().toString().padStart(2, '0');
            const min = dateObject.getMinutes().toString().padStart(2, '0');
            const sec = dateObject.getSeconds().toString().padStart(2, '0');
            return `${dateObject.getFullYear()}-${month}-${dayDate}  ${hr}:${min}:${sec}`;
        }
        if (!props.showDay) {
            return `${dateObject.getFullYear()}-${month}-${dayDate}`;
        }
        else {
            let day = t(`weekday_${dateObject.getDay()}`)

            return `${dateObject.getFullYear()}-${month}-${dayDate} ${day}`;
        }
    }
    catch (err) {
        return ''
    }
})

const select = ref()
const open = ref(false)
const isMobile = ref(false)
const toggle = (e) => {
    if (props.disabled) {
        open.value = false
        return
    }
    open.value = !open.value
    if (open.value) {
        isMobile.value = window.innerWidth < 768
    }
}
watch(open, (v) => {
    if (v) { // when dropdown is closed
        toPage('date')
        if (props.modelValue) {
            renderedMonth.value = props.modelValue.getMonth()
            renderedYear.value = props.modelValue.getFullYear()
        }
    }
})

/* sliding calendars on mobile */
// total only 3 slides, each containing a calendar
// the current calendar will be in the middle slide
// when sliding, move to the corresponding calendar via css transform: translate
// after finish sliding, move back to middle slide with no transition and change the its rendered month based on sliding direction
// this creates an endless slides illusion
const slides = ref([
    {
        monthChange: -1,
    }, {
        monthChange: 0
    }, {
        monthChange: 1
    }
])

let currentSlideIndex = ref(1)
let originalSlideIndex = 1
let sliding = false
let startX = 0
let slideDistance = 175
const slidePosition = (index) => {
    const diff = index - currentSlideIndex.value;
    // skewY
    /*   let skew = Math.abs(diff) * this.settings.maxDegree;
      if (skew > this.settings.maxDegree) skew = this.settings.maxDegree;
      // else if (skew < -this.settings.maxDegree) skew = -this.settings.maxDegree */
    // translateX
    let tX = -50 + diff * (100);
    // scale
    /* let scale = (1 - Math.abs(diff)) * this.settings.maxScale;
    if (scale > this.settings.maxScale) scale = this.settings.maxScale;
    else if (scale < 1) scale = 1; */
    let nextI = Math.round(currentSlideIndex.value);
    return {
        left: `50%`,
        top: "50%",
        transform: `translate(${tX}%, -50%)`,
        transition: sliding ? "none" : disableSlide ? "all 0.3s" : "none",
        zIndex: nextI >= index ? 2 : 1,
        opacity: nextI == index ? 1 : 0.2,
    };
}

let disableSlide = false
const handleTouchStart = (e) => {
    if (sliding || disableSlide) return
    // slideDistance = window.innerWidth / 2
    sliding = true
    disableSlide = true
    startX = e.touches[0].clientX
    originalSlideIndex = currentSlideIndex.value
}

const handleTouchMove = (e) => {
    if (!sliding) return;
    window.getSelection().removeAllRanges();
    let xPos = e.touches[0].clientX;
    let dist = startX - xPos;
    if (dist > slideDistance) dist = slideDistance
    else if (dist < -slideDistance) dist = -slideDistance
    let newSlide = originalSlideIndex + dist / slideDistance
    if (newSlide < 0) newSlide = 0
    else if (newSlide > slides.value.length - 1) newSlide = slides.value.length - 1
    currentSlideIndex.value = newSlide
}

const handleTouchEnd = (e) => {
    sliding = false;
    currentSlideIndex.value = Math.round(currentSlideIndex.value);
    const change = currentSlideIndex.value - originalSlideIndex
    setTimeout(() => {
        disableSlide = false
        currentSlideIndex.value = 1
        if (change != 0) {
            navigateMonth(change)
        }
    }, 310)
}

watchEffect(() => {
    if (props.modelValue) {
        const modelValueDate = new Date(props.modelValue);
        const disabledEndDate = new Date(props.disabledEndDates);
        const today = new Date()

        if (disabledEndDate > modelValueDate) {
            if (props.validTwoMonthsDate) {
                const toDate = new Date(props.modelValue);
                toDate.setDate(props.modelValue.getDate() + 59)
                if (toDate > today) {
                    emit('update:modelValue', toDate);
                } else {
                    emit('update:modelValue', today);
                }
            } else {
                const nextDay = new Date(disabledEndDate.getTime());
                emit('update:modelValue', nextDay);
            }

        }
    }
    // updateDisabledEndDate()
})
</script>

<style scoped>
.o-dp-label-container {
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    padding: 0.625rem 1rem;
}

.o-dp-trig .o-dp-clear {
    visibility: hidden;
}

.o-dp-trig:hover .o-dp-clear {
    visibility: visible;
}


/* .o-dp-close {
    line-height: 1;
    font-size: 1.5rem;
    padding-left: 0.75rem;
    border: none;
    background-color: transparent;
    font-size: 30px;
    line-height: 0.65;
    padding-right: 0;
} */

.o-dp-body {
    border-radius: var(--o-border-radius);
}

.o-dp-page {
    animation: grow 0.15s;
}

.o-dp-date-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.op-dp-date-btn,
.o-dp-clear-btn {
    background-color: transparent;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    padding: 0.375em 0.75em;
    font-size: 0.875em;
    /* font-size: 20px; */
    min-width: 70px;
    /* font-weight: 800; */
    color: var(--o-primary);
    /* color: black */
}

.op-dp-nav-group {
    display: none;
}

.o-dp-clear-btn {
    display: block;
}

@media screen and (min-width:768px) {
    .op-dp-nav-group {
        display: flex;
    }

    .o-dp-clear-btn {
        display: none;
    }

}

.op-dp-nav-btn {
    background-color: transparent;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    padding: 0.375em 0.75em;
}

.op-dp-date-btn:hover,
.op-dp-nav-btn:hover {
    color: var(--o-primary)
}

.o-dp-month,
.o-dp-year {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    height: 250px;
}

.o-dp-year {
    overflow: auto;
}

.o-dp-month-cell,
.o-dp-year-cell {
    background-color: transparent;
    border: none;
    width: calc(100% / 3);
    font-size: 0.875em;
    padding: 0.375em;
    height: calc(100% / 4);
}

.o-dp-month-cell:hover,
.o-dp-year-cell:hover {
    color: var(--o-primary);
}

.o-dp-month-cell.selected,
.o-dp-year-cell.selected {
    color: var(--o-date-selected-text);
    background-color: var(--o-date-selected-bg);
}

@keyframes grow {
    0% {
        opacity: 0;
        transform: scale(0.8);

    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.o-dp-slide-container {
    overflow: hidden;
    position: relative;
}

.o-dp-slide {
    position: absolute;
    width: 100%;
}
</style>