const platform = "/api/"

export default {
    interfaces: {
        saveUserInfo: platform + 'userInfo/save',
        selectUserByUserCode: platform + 'userInfo/selectUserByCode',
        selectByAccount: platform + 'userInfo/selectByAccount',
    }
}
