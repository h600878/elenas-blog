import * as React from "react";
import classNames from "classnames";
import {GatsbyImage} from "gatsby-plugin-image";
import {dateStyleFloat, cardPicPos} from "../../stylesheets/screen.module.css";
import {dateStyle, cardImageStyle} from "../../stylesheets/page.module.css";
import BlogData from "../blogData";

const card = {
    position: "relative",
    margin: "auto",
    width: "95%",
    height: "fit-content",
    paddingBottom: "10px",
    border: "solid grey",
    borderRadius: "10px",
    marginBottom: "25px",
    overflow: "auto",
}
const cardText = {
    paddingLeft: "20px",
    paddingRight: "20px",
}

const CardLayout = ({date, timeToRead, title, children, pic, picAlt}) => {
    return(
        <article style={card}>
            {title}
            <div className={dateStyleFloat}>
                <div className={classNames(dateStyle, dateStyleFloat)}>
                    {(timeToRead === undefined && date === undefined) ? null :
                        (<BlogData createdAt={date} timeToRead={timeToRead}/>)
                    }
                </div>
                <div style={{clear: "both"}}></div>
                <div className={classNames(dateStyle, dateStyleFloat, cardPicPos)}>
                    {(pic === undefined && picAlt === undefined) ? null :
                        (<GatsbyImage className={classNames(cardImageStyle, cardPicPos)} image={pic} alt={picAlt}/>)
                    }
                </div>
            </div>
            <div style={cardText}>
                {children}
            </div>
        </article>
    );
}

export default CardLayout
