export const searchMixin = {
  data() {
    return {
      // 主查询条件
      mainItems: [
        {
          name: 'name', // 参数字段
          queryType: 'eq',
          title: '关键词',
          placeholder: '请输入关键词',
          value: '',
          disabled: false,
          type: 'kd-input',
        },
        {
          name: 'mainVal',
          value: '',
          queryType: 'eq',
          title: '下拉框-单选',
          disabled: false,
          slot: 'main-select',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      ],
      // 次查询条件
      minorItems: [
        {
          name: 'minor-select',
          value: '',
          queryType: 'eq',
          title: '下拉框-单选',
          slot: 'val',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'minor-select-multiple',
          value: [],
          title: '下拉框-多选',
          queryType: 'eq',
          slot: 'multipleVal',
          multiple: true,
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'label',
          title: '输入框',
          placeholder: '请输入',
          value: '',
          queryType: 'eq',
          type: 'kd-input',
        },
        {
          name: 'timerange',
          title: '时间范围',
          placeholder: '请输入',
          value: [],
          queryType: 'eq',
          type: 'kd-date-range',
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  methods: {
    formatterHandle() {
      let mergeItems = [...this.mainItems, ...this.minorItems];
      let queries = mergeItems
        .map((item) => {
          return {
            queryType: item.queryType,
            field: item.name,
            queryData: item.value,
          };
        })
        .filter((item) => {
          return item.queryData.length;
        });
      return queries;
    },
    foldHandle(isFold) {
      // 主查询设置disabled
      this.mainItems = this.mainItems.map((item) => {
        return {
          ...item,
          value: !isFold ? (Array.isArray(item.value) ? [] : '') : item.value,
          disabled: !isFold,
        };
      });

      this.minorItems = this.minorItems.map((item) => {
        return {
          ...item,
          value: isFold ? (Array.isArray(item.value) ? [] : '') : item.value,
        };
      });
    },
  },
};
