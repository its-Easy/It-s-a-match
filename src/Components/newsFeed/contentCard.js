import React from 'react'

class contentCard extends React.Component {
    render() {
    return (
        <>
        <div class="card" style={{marginBottom: "2rem"}}>
        <div class="card-body" style={{backgroundColor: "black", color: "white"}}>
            <h5 class="card-title" style={{fontSize: "1rem"}} >{this.props.username}</h5> <hr />
            <h6 class="card-subtitle mb-2 text-muted" style={{fontSize: "1.5rem"}} >
            <img src={this.props.url} style={{width: "100%"}}></img>    
            </h6> <hr />
        </div>
        </div>
        </>
    )
    }
}

export default contentCard