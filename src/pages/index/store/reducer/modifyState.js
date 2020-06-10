// const modifyState = (state, action) => {
//   const modifyData = {}; let newState;
//   let timer = setTimeout(() => {
//     action.callback && action.callback();
//     timer = null;
//     clearTimeout(timer);
//   }, 300);
//   if (!action.data) {
//     console.error('dispatch时,  请将数据 传入 data 字段 ');
//   }
//   if (action.reset) {
//     newState = action.data;
//   } else {
//     for (const key in action.data) {
//       modifyData[key] = action.data[key];
//     }
//     newState = { ...state, ...modifyData };
//   }
//   return newState;
// };
// export default modifyState;
