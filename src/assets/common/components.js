export default {
    install (Vue) {
        Vue.prototype._resetInput = (target, config) => {
            let value = target.value + ''
            if (config.type === 'integer') {
                value = Number(value) + ''
                if (/[^0-9]*/.test(value)) {
                    value = value.replace(/[^0-9]*/g, '')
                }

                // 最大数值
                if (value !== '') {
                    let maxNumber = config.max ? config.max : 999999999999
                    value = Number(value) > maxNumber ? maxNumber + '' : value
                }

                // 最小数值
                if (value !== '') {
                    let minNumber = config.min || config === 0 ? config.max : 0
                    value = Number(value) < minNumber ? minNumber + '' : value
                }
            } else if (config.type === 'float') { 
                if (/[^0-9 | .]*/.test(value)) {
                    value = value.replace(/[^0-9 | .]*/g, '')
                }

                let index = value.indexOf('.')
                // 不合法置空
                if (index === 0) {
                    value = ''
                }
                // 没有小数点，去前置0
                if (index < 0) {
                    value = Number(value) + ''
                }
                // 多余一个小数点保留整数
                if (value.split('.').length > 2) {
                    value = value.split('.')[0]
                }
                // 保留两位小数
                if (index > 0) {
                    value = value.substring(0, index + 3)
                }
                // 最大数值
                if (value !== '') {
                    let maxNumber = config.max ? config.max : 999999999999.99
                    value = Number(value) > maxNumber ? maxNumber + '' : value
                }
                // 最小数值
                if (value !== '') {
                    let minNumber = config.min || config === 0 ? config.max : 0
                    value = Number(value) < minNumber ? minNumber + '' : value
                }
                
            } else {
                let maxLength = config.maxLength ? config.maxLength : value.length
                value = value.substring(0, maxLength)
            }

            target.value = value

            return value
        }

        Vue.component('my-el-input', {
          props: ['value', 'max', 'min', 'maxLength', 'type', 'placeholder', 'disabled'],
          template: `
            <div class="el-input el-input--small" v-bind:class="disabled ? 'is-disabled' : ''">
                <input
                    autocomplete="off"
                    size="small"
                    class="el-input__inner"
                    v-bind:value="value"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-on:input="$emit('input', _resetInput($event.target, {
                        max:max,
                        maxLength: maxLength,
                        type:type
                    }));$emit('change',_resetInput($event.target, {
                        max:max,
                        maxLength: maxLength,
                        type:type
                    }))">
            </div>
          `
        })
    }
}