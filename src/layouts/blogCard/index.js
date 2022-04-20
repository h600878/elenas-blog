import * as React from "react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const card = {
    position: "relative",
    left: "7.5%",
    width: "85%", height: "fit-content",
    paddingBottom: "10px",
    border: "solid grey",
    marginBottom: "50px",
    overflow: "auto", //Makes sure the pic is within the <div>
}
const cardText = {
    paddingLeft: "20px",
    paddingRight: "20px",
}
const cardPic = {
    position: "relative",
    float: "right",
    width: "400px",
    paddingTop: "20px",
    paddingLeft: "25px",
    right: "10px",
}
const dateStyle = {
    paddingTop: 0,
    position: "relative",
    float: "right",
    paddingRight: "20px",
}

const CardLayout = ({date, pic, picAlt, children}) => {
    return(//TODO pictures
        <article style={card}>
            <div style={cardPic}>
                <p style={dateStyle}>{date}</p>
                <GatsbyImage  alt={picAlt} image={getImage(pic)}/>
            </div>
            <div style={cardText}>
                {children}
            </div>
        </article>
    );
}

export default CardLayout