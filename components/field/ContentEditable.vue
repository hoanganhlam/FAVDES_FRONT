<script>
    export default {
        name: "ContentEditable",
        render: function (createElement) {
            let eml = this.data;
            return createElement(this.elm, {
                on: {
                    input: this.handleInput,
                    paste: this.handlePaste
                },
                attrs: {
                    contentEditable: this.editable,
                }
            }, eml)
        },
        props: {
            elm: {
                type: String,
                default: 'div'
            },
            value: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            },
            allowPasteHtml: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                data: this.value
            }
        },
        methods: {
            handleInput(e) {
                if (this.allowPasteHtml) {
                    this.$emit('input', e.target.innerHTML)
                } else {
                    this.$emit('input', e.target.innerText)
                }
            },
            handlePaste(e) {
                if (!this.allowPasteHtml) {
                    let data = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
                    let regex = /<(?!(\/\s*)?(b|i|em|s|strong|u)[>,\s])([^>])*>/g;
                    data = data.replace(regex, '');
                    document.execCommand('insertHTML', false, data);
                    e.preventDefault();
                }
            },
        },
        watch: {
            value() {

            }
        }
    }
</script>
