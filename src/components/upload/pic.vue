<template>
    <div id="uplaod">
        <input type="file" accept="image/*" :id="name" @change="sendFile" v-if="isDom">
        <button @click="checkFile"></button>
    </div>
</template>
<script>
    import {
        Toast,
        Indicator
    } from 'mint-ui';

    export default {
        props: {
            name: {
                type: String,
                default: 'pic'
            },
            path: {
                type: String,
                default: require('../../../src/components/upload/default.jpeg')
            },
            imgStyle: {
                type: String,
                default: '100'
            }
        },
        data() {
            return {

                sign: null,

                resPath: this.path,

                file: Object,
                isDom: true,
                progress: 0,
            }
        },
        computed: {

        },
        methods: {
            checkFile() {
                let DOM = document.querySelector(`#${this.name}`)
                DOM.click()
            },
            sendFile(e) {
                let image = e.target
                this.file = image.files[0]
                //this.resPath = URL.createObjectURL(file)
                this.getsign()
            },
            async getsign() {
                const _this = this
                this.$http({
                    method: 'jsonp',
                    url: "https://t.socap1.com/api/qcloud/sign/more",
                }).then((res) => { // promise对象
                    this.sign = res.body.data.sign
                    this.upload()
                })
            },
            upload() { // 需求加进度条


                Indicator.open({
                    text: '上传中...',
                    spinnerType: 'fading-circle'
                });


                const url = `http://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=${this.sign}`
                let xhr = new XMLHttpRequest()
                let formdata = new FormData()

                const _this = this

                formdata.append("FileContent", this.file)

                xhr.onload = function () {

                    Indicator.close();

                    if (xhr.status === 200 && xhr.status < 300 || xhr.status === 304) {
                        try {
                            const data = JSON.parse(xhr.responseText)

                            if (data.code === 0) {
                                Toast('上传成功');
                                _this.resPath = data.data.download_url
                                _this.$emit("imgDone", {
                                    data: data,
                                    name: _this.name
                                })
                            } else {
                                Toast(`图片上传失败:${data.message}`);
                            }

                        } catch (e) {
                            console.log("xhr error:" + e)
                        }
                    } else {
//                        Toast(`xhr error:${xhr.status},过于频繁！请10秒后再次操作`);
                        Toast(`上传失败`);
                    }
                }
                // xhr.upload.onprogress = function (data) {
                //     _this.progress = Math.ceil((data.loaded / data.total) * 100) * (parseInt(_this.imgStyle) / 100) +
                //         'px'
                // }
                xhr.open("post", url, true)
                xhr.send(formdata)
                this.reSetDom()
            },
            reSetDom() { // 同一张图片 不触发@change 重置节点
                let _this = this
                this.isDom = false
                let times = setTimeout(function () {
                    _this.isDom = true
                }, 300)

            },
        },
        mounted() {

        }
    }

</script>
<style scoped>
    input {
        display: none;
    }

</style>
