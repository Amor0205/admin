import service from './index'

export default {
    //  login(params) {
    //    return service.post('login', params)
    //  },
    //  // 根据id查询用户
    //  getUser(id) {
    //    return service.get(`users/${id}`)
    //  },
    //  // 获取菜单
    //  getMenus() {
    //    return service.get('menus')
    //  }

    // 验证码
    getCaptcha() {
        return service.get('/users/captcha')
    },
    //注册
    postRegister(params) {
        return service.post('/users/register', params)
    },
    // 获取短信验证码
    SendMsg(params) {
        return service.post('/users/sendMsg', { phone: params })
    },
    // 账号登录
    login(params) {
        return service.post('users/login', params)
    },
    //手机号登录
    phoneLogin(params) {
        return service.post('users/phoneLogin', params)
    },
    //获取菜单
    getMenus() {
        return service.get('users/menus')
    },
    //修改密码
    postupdatePwd(params) {
        return service.post('users/updatePwd', params)
    },
    //退出登录
    getlogout() {
        return service.get('users/logout')
    },
    //首页进度条数据
    getprogress() {
        return service.get('/progress')
    },
    //首页利润
    getCityValue() {
        return service.get('/cityValue')
    },
    //获取动态
    getDynamic() {
        return service.get('/getDynamic')
    },
    //动态汇报人
    getReport() {
        return service.get('/report')
    },
    //发布动态
    addDynamic(params) {
        return service.post('/addDynamic', params)
    },
    //网站调查
    getQuestion() {
        return service.get('/question')
    },
    //通讯录
    getMailList() {
        return service.get('/getMailList')
    },
    //通讯部门
    getTreeData() {
        return service.get('/getTreeData')
    },
    //offer状态
    getOffer() {
        return service.get('/getOffer')
    },
    //获取员工信息
    getUser() {
        return service.get('/userInfo')
    },
    //薪酬信息
    getPay() {
        return service.get('/pay')
    }
}