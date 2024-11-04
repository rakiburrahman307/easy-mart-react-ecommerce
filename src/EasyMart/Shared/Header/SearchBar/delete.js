import React from 'react';

const Delete = () => {

      let termData = [ 
            { "title": "apple orange banana" },
            { "title": "upload app koro na kn???" },
            { "title": "range ban apple ana" },
            { "title": "Hello world" },
            { "title": "Hello no world" }
      ]; 
      let search = 'app';
      const matchData = termData?.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
      let newArray = []; matchData.map(item => { 
            return newArray.push(item.title.split(search)) })
      return newArray.map((item, index) => ( 
                  <> 
                        {
                              item.map((second, i) => (
                                    // alert(`"hey MR.", ${index}`)}>{second && {second}}{(i !== item.length - 1) ? search : null}
                                    <p onClick={alert(`"hey MR.", ${index}`)}>{second && {second}}{(i !== item.length - 1) ? search : null}</p>
                              ))
                        }
                  </>
                  ))
      return (
            <div>
                  
            </div>
      );
};

export default Delete;




import React from 'react';

const App = () => {
  
  let termData = [ 
    { "title": "apple orange banana" },
    { "title": "upload app koro na kn???" },
    { "title": "range ban apple ana" },
    { "title": "Hello world" },
    { "title": "Hello no world" }
]; 
let search = 'app';
const matchData = termData?.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

let newArray = []; 
matchData.map(item => { 
    return newArray.push(item.title.split(search)) })

    // console.log("matchData", newArray)
return newArray.map((item, index) => ( 
          <> 
                {
                      item.map((second, i) => (
                            // alert(`"hey MR.", ${index}`)}>{second && {second}}{(i !== item.length - 1) ? search : null}
                            <p><strong>{(i !== item.length - 1) ? search : null}</strong>{second && second}</p>
                      ))
                    }
                    <br />
          </>
          ))
  return (
    <div>
      
    </div>
  );
};

export default App;