import { defineStore } from 'pinia'
export default defineStore('select', () => {
    const axios = useAxios()
    const state = reactive({
        company: null,
        selectByQueryRes: null,
        industryCategoryRes: null,
        locationRes: null,
        questionsRes: null
    })
    // getters
    const industryItems = computed(() => {
        if (!state.industryCategoryRes || !state.selectByQueryRes || !state.selectByQueryRes.industry) {
            return {}
        }
        const industryMatrix = Object.values(state.industryCategoryRes)
        const industryItems = industryMatrix.reduce((sum, items) => {
            return [...sum, ...items]
        }, [])
        const itemZ = {
            text: '電子零組件、電腦、電子產品及光學製品製造業',
            value: '0' // 純前端分類顯示用
        }
        return [itemZ, ...state.selectByQueryRes.industry, ...industryItems]
    })
    const industryCategoryMap = computed(() => {
        if (!state.industryCategoryRes || !state.selectByQueryRes) {
            return {}
        }
        const industryCategoryMap = {}
        state.selectByQueryRes.industry.forEach(level1Item => {
            const level1Value = level1Item.value
            const items = state.industryCategoryRes[level1Value]
            let level2items = []
            if (level1Value === 'C') {
                // 半導體與光電獨立出來
                level2items = items.filter(item => {
                    const subcategory = item.value.slice(0, 2)
                    const notC2627 = !['26', '27'].includes(subcategory)
                    return item.value.length === 2 && notC2627
                })
            } if (level1Value === 'N') {
                // 支援服務業一律取到小類
                level2items = items.filter(item => {
                    return item.value.length === 4
                })
            } else {
                level2items = items.filter(item => {
                    return item.value.length === 3
                })
            }
            industryCategoryMap[level1Value] = level2items
        })
        // 半導體與光電獨立出來
        const cItems = state.industryCategoryRes['C']
        const level3items = cItems.filter(item => {
            const subcategory = item.value.slice(0, 2)
            const isC2627 = ['26', '27'].includes(subcategory)
            return item.value.length === 3 && isC2627
        })
        industryCategoryMap['0'] = level3items
        return industryCategoryMap
    })
    const educationCategoryMap = computed(() => {
        if (!state.selectByQueryRes || !state.selectByQueryRes.educationCategory) {
            return {}
        }
        const educationCategory = state.selectByQueryRes.educationCategory
        educationCategory.sort((a, b) => {
            return Number(a.value) - Number(b.value)
        })
        const educatoinCategory1Items = educationCategory.filter(item => {
            return item.value.length === 2
        })
        const educationCategoryMap = {}
        educatoinCategory1Items.forEach(level2Item => {
            educationCategoryMap[level2Item.value] = educationCategory.filter(item => {
                const isLevel3 = item.value.length === 4
                const isSubCategory = item.value.slice(0, 2) == level2Item.value
                return isLevel3 && isSubCategory
            })
        })
        return educationCategoryMap
    })
    const jobCategoryMap = computed(() => {
        if (!state.selectByQueryRes || !state.selectByQueryRes.jobCategory) {
            return {}
        }
        const jobCategory = state.selectByQueryRes.jobCategory
        const jobCategoryItems = jobCategory.filter(item => {
            return item.value.length >= 3
        })
        const jobCategoryMap = {}
        const visibleMapping = {
            'science': ['211', '212', '213'],
            'engineer': ['214', '215'],
            'construction': ['216', '711', '712', '713', '741', '742'],
            'engineerSupport': ['311', '312', '313'],
            'marketing': ['217', '243'],
            'healthcare': ['221', '222', '223', '224', '225', '226', '229', '321', '322', '323', '324', '329',],
            'education': ['231', '232', '233', '234', '239',],
            'office': ['242', '261', '334', '341', '412', '422',],
            'commerce': ['241', '331', '332', '333', '421', '431'],
            'software': ['251', '252'],
            'social': ['262', '263', '264', '265', '342', '343'],
            'transportation': ['315', '432', '511', '831', '832', '833', '834', '835'],
            'sales': ['512', '513', '521', '522', '523', '529',],
            'service': ['514', '515', '519'],
            'farming': ['601', '602', '603', '604', '605'],
            'machine': ['721', '722', '723'],
            'handcraft': ['731', '732',],
            'product': ['791', '792', '793', '799'],
            'assemble': ['811', '812', '813', '814', '815', '816', '817', '819', '820']
        }
        jobCategoryItems.forEach(level2Item => {
            let filterResults = []
            for (let key in visibleMapping) {
                let midCategoryList = visibleMapping[key]
                if (visibleMapping[key].includes(level2Item.value)) {
                    filterResults = jobCategory.filter(item => {
                        const isVisible = item.value.length >= 4
                        const midCategory = item.value.slice(0, 3)
                        const isSubCategory = midCategoryList.includes(midCategory)
                        return isVisible && isSubCategory
                    })
                    jobCategoryMap[key] = filterResults
                }
            }
        })
        return jobCategoryMap
    })
    const jobCategory = computed(() => {
        if (!state.selectByQueryRes || !state.selectByQueryRes.jobCategory) {
            return {}
        }
        const expension = [
            {
                value: 'science',
                text: '科學研究專業人員',
            },
            {
                value: 'engineer',
                text: '工程研發專業人員',
            },
            {
                value: 'construction',
                text: '營建/製圖類',
            },
            {
                value: 'engineerSupport',
                text: '科研/工程/製程控制技術員',
            },
            {
                value: 'marketing',
                text: '行銷/設計類',
            },
            {
                value: 'healthcare',
                text: '醫療/保健/環安衛',
            },
            {
                value: 'education',
                text: '學術/教育/輔導類',
            },
            {
                value: 'office',
                text: '管理/行政/總務/法務',
            },
            {
                value: 'commerce',
                text: '商業/金融類',
            },
            {
                value: 'software',
                text: '資訊軟體系統類',
            },
            {
                value: 'social',
                text: '社會/文化/傳播藝術類',
            },
            {
                value: 'transportation',
                text: '資材/運輸/旅遊類',
            },
            {
                value: 'sales',
                text: '餐飲/銷售/展示類',
            },
            {
                value: 'service',
                text: '個人服務/其他服務類',
            },
            {
                value: 'farming',
                text: '農、林、漁、牧業生產人員',
            },
            {
                value: 'machine',
                text: '金屬、機具製造及有關工作人員',
            },
            {
                value: 'handcraft',
                text: '手工藝/印刷類',
            },
            {
                value: 'product',
                text: '食品/木材/成衣/其他專業',
            },
            {
                value: 'assemble',
                text: '機械操作/組裝類',
            },
        ]
        return [...expension, ...state.selectByQueryRes.jobCategory]
    })
    // actions
    async function getQuestions(store, params) {
        const response = await axios.request({
            method: 'get',
            url: `/select/question`,
            params,
        })
        state.questionsRes = response.data
        return response
    }
    async function getSelectByQuery(params) {
        const response = await axios.request({
            method: 'get',
            url: `/select`,
            params,
        })
        state.selectByQueryRes = response.data
        return response
    }
    async function getLocation() {
        const response = await axios.request({
            method: 'get',
            url: `/select/location`,
        })
        state.locationRes = response.data
        return response
    }
    async function getIndustryCategory() {
        const response = await axios.request({
            method: 'get',
            url: `/select/industryCategory`,
        })
        state.industryCategoryRes = response.data
        return response
    }
    return {
        state,
        // getters
        industryItems,
        industryCategoryMap,
        educationCategoryMap,
        jobCategoryMap,
        jobCategory,
        // actions
        getQuestions,
        getSelectByQuery,
        getLocation,
        getIndustryCategory,
    }
})