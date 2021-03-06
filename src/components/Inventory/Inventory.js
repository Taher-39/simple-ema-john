import React from 'react';

const Inventory = (props) => {
    const style = { textAlign: 'center' }
    const mark = props.mark;
    let greetings;
    if(mark >= 45){
        greetings = <p>WelCome Friend..I am also SCIC Member.</p>
    }
    else{
        greetings = <p>We Don't know..Tells About YourSelf.</p>
    }
    return (
        <div>
            <div style={style}>
                <h2>SCIC GROUP(Assignment >= 45)</h2>
                {
                    //ternary
                    mark >= 45 ? 
                    <div>
                        <h3>Welcome SCIC Group</h3>
                        <img src="https://i.imgur.com/MDXRJfC.gif" width="300px" />
                    </div>
                    
                     : <div>
                         <h3>Not Selected For SCIC</h3>
                            <img src="https://3.bp.blogspot.com/-Wyk2nmyLmW4/XPhT6wzxN1I/AAAAAAA1c7w/LANjPiUlvRgSTQ-NFuCndmh82CTbXdZ2ACLcBGAs/s1600/AW3893844_14.gif"  width='300px' />
                       </div>  
                }
                
            </div>
            <div style={style}>
                <h2>Introduce</h2>
                {greetings}
            </div>
        </div>
    )
}

export default Inventory;