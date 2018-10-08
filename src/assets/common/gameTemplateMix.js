export default {
    computed: {
        gmBgBox () {
            var styleData = {
                'background-image': 'url(' + this.base.gameBigBg + ')'
            }

            return styleData
        },
        gmPlayBox () {
            var styleData = {
                'background-image': 'url(' + this.base.gameAnimateGif + ')'
            }

            return styleData
        },
        gmBody () {
            var styleData = {
                'height': '100%',
                'width': '100%',
                'display': 'flex',
                'flex-direction': 'column'
            }

            return styleData
        },
        gmTitle () {
            var styleData = {
                'display': 'block',
                'padding': '0 30px',
                'box-sizing': 'content-box',
                'overflow': 'hidden',
                'height': this.base.titleBlockHeight + 'px',
                'font-size': this.base.titleFontSize + 'px',
                'text-align': this.base.titleAlignment,
                'font-style': this.base.titleFontStyle,
                'color': this.base.titleFontColor,
                'line-height': this.base.titleLineHeight + 'px',
                'padding-top': this.base.titleTopHeight + 'px'
            }

            return styleData
        },
        gmContent () {
            var styleData = {
                'flex': '1',
                'display': 'block',
                'padding': '0 30px',
                'box-sizing': 'border-box',
                'overflow': 'auto',
                'font-size': this.base.fileFontSize + 'px',
                'color': this.base.fileTaxtFontColor,
                'line-height': this.base.fileTaxtLineHeight + 'px',
                'padding-top': this.base.fileBlcokTopHeight + 'px'
            }

            return styleData
        },
        gmStartBtnOne () {
            var styleData = {
                'display': 'block',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'color': this.base.startBtnOneFontColor,
                'background-color': this.base.startBtnOneBackColor,
                'border': '1px solid ' + this.base.startBtnOneBorderColor,
                'width': '70%',
                'margin-bottom': '20px'
            }

            return styleData
        },
        gmStartBtnTwo () {
            var styleData = {
                'display': 'block',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '18px',
                'line-height': '42px',
                'border-radius': '21px',
                'cursor': 'pointer',
                'color': this.base.startBtnTwoFontColor,
                'background-color': this.base.startBtnTwoBackColor,
                'border': '1px solid ' + this.base.startBtnTwoBorderColor,
                'width': '160px'
            }

            return styleData
        },
        questionTitle () {
            var styleData = {
                'width': '100%',
                'display': 'block',
                'font-size': this.base.playQuestionFontSize + 'px',
                'color': this.base.playQuestionColor,
                'line-height': this.base.playQuestionLineHeight + 'px',
                'margin-top': this.base.playQuestionMarginTop + 'px'
            }

            return styleData
        },
        questionImg () {
            var styleData = {
                'overflow': 'hidden',
                'margin-top': this.base.playImgMarginTop + 'px'
            }

            return styleData
        },
        questionImgStyle () {
            var styleData = {
                'float': 'left',
                'margin': '0 3px 3px 0',
                'height': this.base.playImgHeight + 'px'
            }

            return styleData
        },
        questionAttachmentStyle () {
            var styleData = {
                'margin-top': this.base.playAttachmentMarginTop + 'px',
                'height': this.base.playAttachmentHeight + 'px'
            }

            return styleData
        },
        attachmentFontStyle () {
            var styleData = {
                'font-size': this.base.playAttachmentFontSize + 'px',
                'color': this.base.playAttachmentColor,
                'line-height': this.base.playAttachmentLineHeight + 'px'
            }

            return styleData
        },
        anwserStyle () {
            var styleData = {
                'margin-top': this.base.playAnwserMarginTop + 'px'
            }

            return styleData
        },
        anwserTitle () {
            var styleData = {
                'font-size': this.base.playAnwserFontSize + 'px',
                'color': this.base.playAnwserColor,
                'line-height': this.base.playAnwserLineHeight + 'px'
            }

            return styleData
        },
        selectBtnLineHeight () {
            var styleData = {
                'padding-top': this.base.playAnwserLineHeight / 2 - 8 + 'px'
            }

            return styleData
        },
        gmStopBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.base.stopBtnFontColor,
                'background-color': this.base.stopBtnBackColor,
                'border': '1px solid ' + this.base.stopBtnBorderColor
            }

            return styleData
        },
        stopPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.base.stopPersonBg + ')'
            }

            return styleData
        },
        personStyle () {
            var styleData = {
                'text-align': 'center',
                'font-size': this.base.stopPersonFontSize + 'px',
                'color': this.base.stopPersonColor,
                'line-height': this.base.stopPersonLineHeight + 'px'
            }

            return styleData
        },
        stopFontStyle () {
            var styleData = {
                'position': 'absolute',
                'left': '0',
                'bottom': '15px',
                'width': '100%',
                'text-align': 'center',
                'font-size': this.base.stopFontSize + 'px',
                'color': this.base.stopFontColor
            }

            return styleData
        },
        shareBgBox () {
            var styleData = {
                'background-color': '#242180'
            }

            return styleData
        },
        shareNameBg () {
            var styleData = {
                'background-image': 'url(' + this.base.shareNameBg + ')',
                'line-height': this.base.shareNameLineHeight + 'px'
            }

            return styleData
        },
        shareAttarStyle () {
            var styleData = {
                'width': this.base.shareAttarHeight + 'px',
                'height': this.base.shareAttarHeight + 'px',
                'margin-top': this.base.shareAttarMarginTop + 'px'
            }

            return styleData
        },
        sharePersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.base.sharePersonBg + ')'
            }

            return styleData
        },
        sharePersonStyle () {
            var styleData = {
                'text-align': 'center',
                'font-size': this.base.sharePersonFontSize + 'px',
                'color': this.base.sharePersonColor,
                'line-height': this.base.sharePersonLineHeight + 'px'
            }

            return styleData
        },
        shareFontStyle () {
            var styleData = {
                'position': 'absolute',
                'left': '0',
                'bottom': '15px',
                'width': '100%',
                'text-align': 'center',
                'font-size': this.base.shareThanksFontSize + 'px',
                'color': this.base.shareThanksColor
            }

            return styleData
        },
        gmShareBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.base.shareBtnFontColor,
                'background-color': this.base.shareBtnBackColor,
                'border': '1px solid ' + this.base.shareBtnBorderColor
            }

            return styleData
        },
        helpPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.base.helpPersonBg + ')'
            }

            return styleData
        },
        gmHelpBtn () {
            var styleData = {
                'width': '100%',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.base.helpBtnFontColor,
                'background-color': this.base.helpBtnBackColor,
                'border': '1px solid ' + this.base.helpBtnBorderColor
            }

            return styleData
        },
        pkPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.base.pkPersonOneBg + ')'
            }

            return styleData
        },
        gmPkBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.base.pkBtnFontColor,
                'background-color': this.base.pkBtnBackColor,
                'border': '1px solid ' + this.base.pkBtnBorderColor
            }

            return styleData
        }
    }
}