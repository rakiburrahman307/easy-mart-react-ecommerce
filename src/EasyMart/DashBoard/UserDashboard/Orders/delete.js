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
      return newArray.push(item.title.split(search))
 }) 
 return newArray.map((item, index) => ( 
       <> 
            {item.map((second, i) => ( 
                  <div onClick={alert(`"hey MR.", ${index}`)}>{second && {second}}{(i !== item.length - 1) ? search : null}</div>
            ))}

            <br />
      </>
 ))