const Home = ({onGame})=>{
    return(
       <div className="home">
        <div className="title">
            TYPING TEST
        </div>
        <button className="btnPlay" onClick={()=>onGame('playGame')}>
            Play Game
        </button>
       </div>
    )

}

export default Home;