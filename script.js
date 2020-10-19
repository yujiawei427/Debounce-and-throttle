(function() {
  const url ='https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=72BerEM8BoUaqtEXO3xBZwZVNdyQU9OKtlufO1LfP2M&maxresults=5&country=AUS&query=';
  document.getElementById('autocomplete-input').addEventListener('keyup', (ele) => {
    //get input value
    let inputValue = ele.target.value;
    //call map api to search
    throttle(remoteCall, 5000)(inputValue);
    
  });

  function renderDropdown(suggestions) {
    document.getElementById('dropdownMenu').innerHTML = '';
    suggestions.forEach(element => {
      const dropdownMenu = document.getElementById('dropdownMenu')
      dropdownMenu.insertAdjacentHTML('beforebegin', 
      `<a href="#" class="dropdown-item">
      ${element.label}
      </a>`)
    });
  };

  var inDebounce = false;
  const debounce = (func, wait) => {
    
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), wait);
    }
  };
//   debounce

// search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次


  var inThrottle = false;
  const throttle = (func, limit) => {
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

//   throttle

// 鼠标不断点击触发，mousedown(单位时间内只触发一次)
// 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

  async function remoteCall(input) {
    
    const response = await fetch(url + input);
    const result = await response.json();
    renderDropdown(result.suggestions);  
  };
})();