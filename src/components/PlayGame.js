import { useEffect, useState } from "react";


const PlayGame = ({onChangeScore})=>{
    const [defaultData]  = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio placeat quasi voluptas inventore, sunt voluptate nesciunt aperiam esse nam debitis magnam molestiae aliquam quos ipsum pariatur deserunt quis illum minima hic culpa ex quae? Excepturi suscipit perferendis, iusto provident iure praesentium incidunt, tenetur ex, explicabo id officiis adipisci natus?');
    const [dataTyping ,setDataTyping] = useState([]);
    const [textTyping , setTextTyping] = useState({
        value: '',
        position:0
    });
    useEffect(()=>{
        //  To generate random texts 
        const addWord = (quantity =20) =>{
            const arrayDefaultDB = defaultData.split(' ');
            const dataTypingTest = [];
            for(let index=0;index<quantity;index++){
                const position = Math.floor(Math.random()*arrayDefaultDB.length);
                dataTypingTest.push({
                    value : arrayDefaultDB[position],
                    status :null
                })
            }
            setDataTyping(dataTypingTest);
        }
        if(dataTyping.length === 0 || textTyping.position >=dataTyping.length){
            addWord();
            setTextTyping({...textTyping,position:0})
        }
        // To handle error after typing 20 words

    },[textTyping.position])
    // console.log(dataTyping);

    const handleChangeTyping = e =>{
        const valueInput = e.target.value;
        if(!valueInput.includes(' ')){
            setTextTyping(
                {
                    ...textTyping,
                    value :valueInput
                }
            );
        }
        else if(textTyping.value !==' '){
            checkResult();
        
        }

    }

    
const checkResult = () =>{
    // for paragraph
    const dataCheck = dataTyping;
    const wordCheck = dataCheck[textTyping.position].value;
    if(textTyping.value===wordCheck){
        dataCheck[textTyping.position].status =true;
        // To increase the score point on correct ans
        onChangeScore('right');
        
    }
    else{
        dataCheck[textTyping.position].status =false;
        onChangeScore('wrong');

    }
    setDataTyping(dataCheck);
    setTextTyping({
        value :'',
        // To check the next element
        position:textTyping.position+1
    })

}
   
    return(
    
        <div className="playing">
            <ul className="list">
                {
                    dataTyping.map((word,index)=>
                        <li key={index} className={
                            word.status=== true ? 'true':word.status ===false ? 'false':''
                        }>
                            
                            {
                                word.value
                            }

                        </li>
                        )
                }
            </ul>
            <div className="inputForm">
                <input type="text" value={textTyping.value} onChange={handleChangeTyping}/>
            </div>
        </div>
    )

}

export default PlayGame;