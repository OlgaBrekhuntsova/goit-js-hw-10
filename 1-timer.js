import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as m,i as r}from"./assets/vendor-BQjxcmpC.js";const s={dateInput:document.querySelector("input#datetime-picker"),startCountButton:document.querySelector("button[data-start]"),timer:document.querySelector(".timer-wrapper")},o={button:s.startCountButton,disable(){this.button.disabled||(this.button.disabled=!0)},enable(){this.button.disabled&&(this.button.disabled=!1)}},v="Please choose a date in the future";let e="";const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,locale:{firstDayOfWeek:1,weekdays:{shorthand:["Su","Mo","Tu","We","Th","Fr","Sa"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},onClose(t){if(n=t[0],i(),n-new Date<=0){l.show(v);return}o.enable(),e=setInterval(i,5e3)}};m("#datetime-picker",b);let n=new Date(s.dateInput.value);i();const d={isActive:!1,time:{days:"00",hours:"00",minutes:"00",seconds:"00"},updateTime(t){Object.keys(this.time).forEach(a=>{this.time[a]=y(t[a])})},start(){this.isActive=!0,c();const t=setInterval(()=>{const a=n-new Date;this.updateTime(I(a)),s.timer.innerHTML=this.createMarkup(),a<1e3&&(clearInterval(t),this.isActive=!1,c())},1e3)},createMarkup(){return`<div class="field">
  <span class="value" data-days >${this.time.days}</span>
            <span class="label">Days</span>
          </div>
          <div class="field">
            <span class="value" data-hours>${this.time.hours}</span>
            <span class="label">Hours</span>
          </div>
          <div class="field">
            <span class="value" data-minutes>${this.time.minutes}</span>
            <span class="label">Minutes</span>
          </div>
          <div class="field">
            <span class="value" data-seconds>${this.time.seconds}</span>
            <span class="label">Seconds</span>`}};function y(t){return t.toString().padStart(2,0)}function c(){s.dateInput.disabled=d.isActive}s.dateInput.addEventListener("focus",()=>{l.close()});s.startCountButton.addEventListener("click",()=>{o.disable(),e&&(clearInterval(e),e=""),d.start()});function i(){n-new Date<=0&&(o.disable(),e&&(clearInterval(e),e=""))}function I(t){const u=Math.floor(t/864e5),f=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),p=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:f,minutes:h,seconds:p}}const l={show(t){r.show({message:t,position:"topRight",backgroundColor:"#EF4040",messageColor:"#ffffff",icon:"fa-regular fa-circle-xmark",iconColor:"#B51B1B",timeout:1e4,class:"alert-izi-icon",close:!1,closeOnClick:!0})},close(){try{r.hide({},document.querySelector(".iziToast"))}catch{}}};
//# sourceMappingURL=1-timer.js.map
