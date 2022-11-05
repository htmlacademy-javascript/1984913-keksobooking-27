const getData = (onSuccess, onError) =>( )=>{
  fetch('https://27.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials:'same-origin',
    }
  )
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data)=>onSuccess(data))
    .catch((err)=>{
      onError(err);
    });
};

export {getData};

