import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        captcha: '',
        //获取菜单
        menus: [],
        progress: [],
        //首頁利潤
        cityValue: [],
        //获取动态
        dynamic: [],
        //动态汇报人
        report: [],
        //网站调查
        question: [],
        //生成二维码
        url: '',
        //通讯录
        mailList: [],
        //通讯部门
        treeData: [],
        //Offer管理
        Offer: [],
        //获取员工信息
        showUser: [],
        user: [],
        pay: []

    },
    mutations: {
        setCaptcha(state, data) {
            state.captcha = data
        },
        //获取菜单
        setMenus(state, data) {
            state.menus = data
        },
        //首页进度条数据
        setProgress(state, data) {
            state.progress = data
        },
        //首頁利潤
        setCityValue(state, data) {
            state.cityValue = data
        },
        //获取动态
        setDynamic(state, data) {
            state.dynamic = data
        },
        //动态汇报人
        setReport(state, data) {
            state.report = data
        },
        //网站调查
        setQuestion(state, data) {
            state.question = data
        },
        //生成二维码
        setUrl(state, data) {
            state.url = data
        },
        //通讯录
        setMailList(state, data) {
            state.mailList = data
        },
        //通讯部门
        setTreeData(state, data) {
            state.treeData = data
        },
        //Offer管理
        setOffer(state, data) {
            state.Offer = data
        },
        //获取员工信息
        setUser(state, data) {
            state.user = state.showUser = data
        },
        changeUser(state, data) {
            state.showUser = state.user
            if (data == 0) {
                state.showUser = state.user
            } else if (data == 2) {
                state.showUser = state.showUser.filter(item => {
                    return item.state == data
                })
            } else if (data == 1) {
                state.showUser = state.showUser.filter(item => {
                    return item.state != 2
                })
            }
        },
        changeshowUser(state, data) {
            console.log(data);
            data.map(item => {
                state.showUser.map(item1 => {
                    if (item == item1) {
                        item1.state = 2
                    }
                })
            })
        },
        setPay(state, data) {
            state.pay = data
        },
        addPay(state, data) {
            state.pay.push(data)
        },
    },
    actions: {
        //验证码
        async getCaptcha({ commit }) {
            let res = await api.getCaptcha()
                // console.log(res);
            commit('setCaptcha', res)
        },
        // 注册
        async postRegister({ commit }, params) {
            let res = await api.postRegister(params)
            console.log(res);
            if (res.code === 200) {
                Message.success('注册成功')
                router.push('/login')
            }

        },
        //短信验证码
        async SendMsg({ commit }, params) {
            let res = await api.SendMsg(params)
            console.log(res);
            if (res.code === 200) {
                Message.success('短信发送成功')
            }
        },
        //账号登录
        async login({ commit }, params) {
            let res = await api.login(params)
            console.log(res);
            if (res.code === 200) {
                //存用户
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                    //存用户名
                    // localStorage.setItem('username', res.data.username)
                    //存token
                localStorage.setItem('adminToken', 'Bearer ' + res.token)
                    //跳转页面
                router.push('/')
                    //提示用户
                Message.success('登录成功')
            }

        },
        //手机号登录
        async phoneLogin({ commit }, params) {
            let res = await api.phoneLogin(params)
            console.log(res);
            if (res.code === 200) {
                Message.success('登录成功')
            }
        },
        //获取菜单
        async getMenus({ commit }) {
            let res = await api.getMenus()
            console.log(res);
            if (res.code === 200) {
                commit('setMenus', res.data)
            }
        },
        //修改密码
        async postupdatePwd({ commit }, params) {
            let res = await api.postupdatePwd(params)
            console.log(res);
            if (res.code === 200) {
                Message.success('修改成功')
            } else {
                Message.error(res.msg)
            }
        },
        //退出登录
        async getlogout({ commit }) {
            let res = await api.getlogout()
            console.log(res);
            if (res.code === 200) {
                router.push("/login");
                window.localStorage.clear()
                Message.success('退出成功')


            }
        },
        //首页进度条数据
        async getprogress({ commit }) {
            let res = await api.getprogress()
            console.log(res);
            if (res.code === 200) {
                commit('setProgress', res.data)
            }
        },
        //首页利润
        async getCityValue({ commit }) {
            let res = await api.getCityValue()
            console.log(res);
            if (res.code === 200) {
                commit('setCityValue', res.data)
            }
        },
        //获取动态
        async getDynamic({ commit }) {
            let res = await api.getDynamic()
            console.log(res);
            if (res.code === 200) {
                commit('setDynamic', res.data)
            }
        },
        //动态汇报人
        async getReport({ commit }) {
            let res = await api.getReport()
            console.log(res);
            if (res.code === 200) {
                commit('setReport', res.data)
            }
        },
        //发布动态
        async addDynamic({ commit }, params) {
            let res = await api.addDynamic(params)
            console.log(res);
            if (res.code === 200) {
                Message.success('发布成功')
            } else {
                Message.error(res.msg)
            }
        },
        //网站调查
        async getQuestion({ commit }) {
            let res = await api.getQuestion()
            console.log(res);
            if (res.code === 200) {
                commit('setQuestion', res.data)
            }
        },
        //二维码生成
        async getUrl({ commit }, params) {
            commit('setUrl', params)
        },
        //通讯录
        async getMailList({ commit }, params) {
            let res = await api.getMailList()
                // console.log(params);
                // console.log(res.data);
            if (res.code === 200) {
                //左边点击filter过滤页面显示
                if (params) {
                    res.data = res.data.filter((item) => {
                        return item.department === params
                    })
                }
                commit('setMailList', res.data)
            }
        },
        //通讯部门
        async getTreeData({ commit }) {
            let res = await api.getTreeData()
            console.log(res.data);
            if (res.code === 200) {
                commit('setTreeData', res.data)
            }
        },
        //获取offer
        async getOffer({ commit }) {
            let res = await api.getOffer()
            console.log(res);
            res.data.map(item => {
                if (item.gender == 1) {
                    item.gender = '男'
                } else if (item.gender == 0) {
                    item.gender = '女'
                }

            })
            if (res.code === 200) {
                commit('setOffer', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //获取员工信息
        async getUser({ commit, dispatch }, params) {
            let res = await api.getUser()
            console.log(res);
            if (res.code === 200) {
                commit('setUser', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //薪酬信息
        async getPay({ commit }) {
            let res = await api.getPay()
            console.log(res);
            if (res.code === 200) {
                commit('setPay', res.data)
            } else {
                Message.info(res.msg)
            }
        },
    },
}